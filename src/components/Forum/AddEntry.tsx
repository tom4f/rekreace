import { useState } from 'react';
import { Button, Input, Select, TextArea } from 'components/Atoms';
import { useAddForum } from 'features/forum/hooks';

type AddEntryType = {
  categoryFromUrl: number;
  addEntry: boolean;
  setAddEntry: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddEntry = ({
  categoryFromUrl,
  addEntry,
  setAddEntry,
}: AddEntryType) => {
  const { mutate } = useAddForum();

  const [state, setState] = useState({
    jmeno: '',
    email: '',
    typ: categoryFromUrl !== 8 ? '' : '8',
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

  const mySubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    if (state.antispam === Number(data.get('antispamForm'))) {
      mutate(state, {
        onSuccess: () => {
          setAddEntry(false);
          setAlert('ok');

          setTimeout(() => {
            setAlert('off');
          }, 5000);
        },
        onError: () => console.log('error'),
      });
    } else {
      setAlert('antispamNotOk');
      setTimeout(() => setAlert('off'), 5000);
    }
  };

  const optionList =
    categoryFromUrl !== 8
      ? [
          { value: '', label: '--- vyber ---' },
          { value: '0', label: 'Fórum' },
          { value: '1', label: 'Inzerce' },
          { value: '2', label: 'Seznamka' },
          { value: '3', label: ' K obsahu stránek' },
        ]
      : [];

  return (
    <>
      <form
        onSubmit={mySubmitHandler}
        name='formular'
        encType='multipart/form-data'
      >
        {addEntry && (
          <div className=''>
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
                options={[
                  ...optionList,
                  { value: '8', label: 'Kaliště 993m n.m.' },
                ]}
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
        ) : alert === 'antispamNotOk' ? (
          <h1>Záznam se nepodařilo odeslat !!!</h1>
        ) : null}
      </form>
    </>
  );
};
