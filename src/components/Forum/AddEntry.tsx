import { Button, Input, Select, TextArea } from 'components/Atoms';
import { useRef, useState } from 'react';
// import { useAddForum } from 'features/forum';
import { useAddForumGraphQl } from 'src/features/forum/hooks/useAddForumGrahQL';

import { basicOptions } from './';

type AddEntryType = {
  addEntry: boolean;
  setAddEntry: React.Dispatch<React.SetStateAction<boolean>>;
};

const TIMEOUT_DURATION = 5000;

export const AddEntry = ({ addEntry, setAddEntry }: AddEntryType) => {
  // const { mutate } = useAddForum();
  const isKalisteType = window.location.search === '?typ=4';
  const { addForum: mutate } = useAddForumGraphQl();

  const [state, setState] = useState({
    jmeno: '',
    email: '',
    typ: isKalisteType ? '4' : '',
    text: '',
    antispam: new Date().getMilliseconds(),
    antispamForm: '',
  });

  const [alert, setAlert] = useState('off');

  const myChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setState((old) => ({ ...old, [event.target.name]: event.target.value }));
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showResult = (info: string) => {
    setAlert(info);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAlert('off');
      if (info === 'ok') {
        setAddEntry(false);
      }
    }, TIMEOUT_DURATION);
  };

  const mySubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);

    if (state.antispam === Number(data.get('antispamForm'))) {
      try {
        await mutate(state);

        showResult('ok');
      } catch (error) {
        showResult('error');
        console.error('Error adding post:', error);
      }
    } else {
      showResult('antispamNotOk');
    }
  };

  const optionList = isKalisteType
    ? [{ value: '4', label: 'Kaliště 993m n.m.' }]
    : [{ value: '', label: '--- vyber ---' }, ...basicOptions];

  return (
    <>
      <form
        onSubmit={mySubmitHandler}
        name='formular'
        encType='multipart/form-data'
      >
        {addEntry && (
          <div>
            <div className='flex flex-wrap justify-center *:w-52 pt-4 '>
              <Input
                label='Jméno'
                placeholder='Jméno'
                onChange={myChangeHandler}
                required
                type='text'
                name='jmeno'
              />
              <Input
                label='E-mail'
                placeholder='E-mail'
                onChange={myChangeHandler}
                type='email'
                name='email'
              />
              <Select
                required
                name='typ'
                label='Kategorie'
                options={optionList}
                onChange={myChangeHandler}
              />
            </div>
            <div className='flex justify-center'>
              <TextArea
                label='text'
                onChange={myChangeHandler}
                placeholder='komentář'
                required
                rows={5}
                cols={60}
                name='text'
              />
            </div>
            <div className='flex flex-wrap justify-center *:w-32 pb-4'>
              <Input
                label={`opiš kód: ${state.antispam.toString()}`}
                placeholder={state.antispam.toString()}
                onChange={myChangeHandler}
                required
                type='text'
                name='antispamForm'
              />
              <Button label='Přidej' />
              <Button
                type='button'
                variant='secondary'
                label='zavřít'
                onClick={() => setAddEntry(false)}
              />
            </div>
          </div>
        )}
        {alert === 'ok' ? (
          <h1>Záznam byl přidán !!!</h1>
        ) : alert === 'antispamNotOk' || alert === 'error' ? (
          <h1>Záznam se nepodařilo odeslat !!!</h1>
        ) : null}
      </form>
    </>
  );
};
