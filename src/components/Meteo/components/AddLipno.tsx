import { useState, useRef, useContext } from 'react';
import FormularStyle from './../css/Formular.module.css';
import ModifyLipnoStyle from './../css/ModifyLipno.module.css';
import { useAddLipno, useGetLipno } from 'src/features/meteo';
import { useLoginStatus } from 'src/features/login';
import { EditMeteoType } from './ModifyLipno';
import { Input } from 'src/components/Atoms/Input/Input';
import { Button } from 'src/components/Atoms/Button/Button';
import { AddLipnoRequest } from 'src/features/meteo';
import { DateContext } from './DateContext';
import { SetEditMeteoType } from './TypeDefinition';

type AddLipnoType = {
  setEditMeteo: SetEditMeteoType;
};

export const AddLipno = ({ setEditMeteo }: AddLipnoType) => {
  const { reduceDate } = useContext(DateContext);
  const formRef = useRef<HTMLFormElement>(null);

  const { mutate } = useAddLipno();
  const { data: loginData } = useLoginStatus();
  const { data: pocasiData } = useGetLipno({
    start: 0,
    limit: 1,
    requestType: 'amount',
    orderBy: 'datum',
    sort: 'DESC',
  });

  const [loginResp, setLoginResp] = useState('empty');

  if (!pocasiData) {
    return null;
  }

  const { hladina, pritok, odtok, voda, vzduch, pocasi } = pocasiData[0];

  const formatDate = (date: Date) => {
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const addLipno = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const payload: AddLipnoRequest = {
      datum: formData.get('datum') as string,
      hladina: parseFloat(formData.get('hladina') as string),
      pritok: parseFloat(formData.get('pritok') as string),
      odtok: parseFloat(formData.get('odtok') as string),
      voda: parseFloat(formData.get('voda') as string),
      vzduch: parseFloat(formData.get('vzduch') as string),
      pocasi: formData.get('pocasi') as string,
      webToken: loginData.webToken,
      webUser: loginData.webUser,
      fotoGalleryOwner: loginData.webAccess,
    };

    mutate(payload, {
      onSuccess: () => {
        console.log('AddLipno - ', new Date());
        reduceDate('yearSum', new Date());
        setEditMeteo((editMeteo: EditMeteoType) => ({
          ...editMeteo,
          dispAdd: false,
        }));
      },
      onError: () => {
        setLoginResp('error');
      },
    });
  };

  return (
    <>
      <div className={ModifyLipnoStyle.container}>
        <div
          className={ModifyLipnoStyle.closeBtn}
          onClick={() =>
            setEditMeteo((editMeteo: EditMeteoType) => ({
              ...editMeteo,
              dispAdd: false,
            }))
          }
        >
          <span>x</span>
        </div>
        {loginResp === 'error' ? <div> Někde nastala chyba :-(</div> : null}
        <h4>Nový záznam</h4>
        <form ref={formRef} onSubmit={addLipno} autoComplete='off'>
          <div className={FormularStyle.form_booking}>
            <Input
              label='datum:'
              type='date'
              name='datum'
              defaultValue={formatDate(new Date())}
            />
            <Input
              label='voda:'
              type='number'
              step='any'
              name='voda'
              defaultValue={voda}
            />
            <Input
              label='vzduch:'
              type='number'
              step='any'
              name='vzduch'
              defaultValue={vzduch}
            />
            <Input
              label='hladina:'
              type='number'
              step='any'
              name='hladina'
              defaultValue={hladina}
            />
            <Input
              label='přítok:'
              type='number'
              step='any'
              name='pritok'
              defaultValue={pritok}
            />
            <Input
              label='odtok:'
              type='number'
              step='any'
              name='odtok'
              defaultValue={odtok}
            />
            <Input
              label='komentář:'
              type='text'
              name='pocasi'
              defaultValue={pocasi}
            />
            <Button type='submit' label='Odeslat' />
          </div>
        </form>
      </div>
    </>
  );
};
