import { useState } from 'react';
import { useAddForum } from '../../features/forum/hooks';
import { Button } from '../Atoms/Button/Button';
import { Input } from '../Atoms/Input/Input';
import { Select } from '../Atoms/Input/Select';
import Textarea from '../Atoms/Input/Textarea';

type AddEntryType = {
  categoryFromUrl: number;
};

export const AddEntry = ({ categoryFromUrl }: AddEntryType) => {
  const { mutate } = useAddForum();

  const [state, setState] = useState({
    jmeno: '',
    email: '',
    typ: categoryFromUrl !== 8 ? '' : '8',
    text: '',
    antispam: new Date().getMilliseconds(),
    antispamForm: '',
  });

  const [formVisible, setFormVisible] = useState(false);
  const [alert, setAlert] = useState('off');

  const showForum = () => {
    setFormVisible(true);
  };

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
          setFormVisible(false);
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
          { value: '', label: '--- vyber kategorii ---' },
          { value: '0', label: 'Fórum' },
          { value: '1', label: 'Inzerce' },
          { value: '2', label: 'Seznamka' },
          { value: '3', label: ' K obsahu stránek' },
        ]
      : [];

  return (
    <form
      onSubmit={mySubmitHandler}
      name='formular'
      encType='multipart/form-data'
    >
      {formVisible && (
        <div>
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
            required
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
          <Textarea
            label='text'
            onChange={myChangeHandler}
            required
            rows={5}
            cols={60}
            name='text'
          />
          <Input
            label={`opiš kód: ${state.antispam.toString()}`}
            placeholder={state.antispam.toString()}
            onChange={myChangeHandler}
            required
            type='text'
            name='antispamForm'
          />
        </div>
      )}
      <Button label='Přidej záznam' onClick={showForum} />
      {alert === 'ok' ? (
        <h1>Záznam byl přidán !!!</h1>
      ) : alert === 'antispamNotOk' ? (
        <h1>Záznam se nepodařilo odeslat !!!</h1>
      ) : null}
    </form>
  );
};
