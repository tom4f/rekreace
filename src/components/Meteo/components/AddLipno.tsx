import { useContext, useRef } from 'react';
import { Button, Input } from 'components/Atoms';
import { useLoginStatus } from 'features/login';
import { AddLipnoRequest, useAddLipno, useGetLipno } from 'features/meteo';

import { DateContext } from './DateContext';
import { EditMeteoType } from './ModifyLipno';
import { ModifyLipnoModal } from './ModifyLipnoModal';
import { SetEditMeteoType } from './TypeDefinition';

type AddLipnoType = {
  editMeteo: EditMeteoType;
  setEditMeteo: SetEditMeteoType;
};

export const AddLipno = ({ editMeteo, setEditMeteo }: AddLipnoType) => {
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
          method: null,
        }));
      },
      onError: () => {
        setEditMeteo((orig: EditMeteoType) => ({
          ...orig,
          methodResult: 'error',
        }));
      },
    });
  };

  return (
    <ModifyLipnoModal editMeteo={editMeteo} setEditMeteo={setEditMeteo}>
      <h4>Nový záznam</h4>
      <form ref={formRef} onSubmit={addLipno} autoComplete='off'>
        <div className='flex flex-wrap justify-center'>
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
    </ModifyLipnoModal>
  );
};
