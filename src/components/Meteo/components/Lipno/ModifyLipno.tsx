import { Button } from 'components/Atoms';
import { LipnoKeyType, useGetLipno } from 'features/meteo';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'src/store';

import { LipnoGraph, LipnoTable } from './';
import { AddLipno } from './AddLipno';
import { DeleteLipno } from './DeleteLipno';
import { EditLipno } from './EditLipno';

export type EditMeteoType = {
  editDate: string;
  editKey: LipnoKeyType;
  editValue: string | number;
  method: 'edit' | 'add' | 'delete' | null;
  methodResult: 'error' | 'ok' | null;
};
export const ModifyLipno = () => {
  const navigate = useNavigate();
  const { isLogged } = useAuthStore();

  const { data: pocasi, isSuccess } = useGetLipno({
    start: 0,
    limit: 30,
    requestType: 'amount',
    orderBy: 'datum',
    sort: 'DESC',
  });

  const [editMeteo, setEditMeteo] = useState<EditMeteoType>({
    editDate: '',
    editKey: 'hladina',
    editValue: '',
    method: null,
    methodResult: null,
  });

  useEffect(() => {
    if (!isLogged) {
      navigate('/bedrich');
    }
  }, [isLogged, navigate]);

  if (!isSuccess || !pocasi?.length || !isLogged) {
    return null;
  }

  return (
    <>
      {editMeteo.method === 'edit' && (
        <EditLipno editMeteo={editMeteo} setEditMeteo={setEditMeteo} />
      )}
      {editMeteo.method === 'add' && (
        <AddLipno editMeteo={editMeteo} setEditMeteo={setEditMeteo} />
      )}
      {editMeteo.method === 'delete' && (
        <DeleteLipno editMeteo={editMeteo} setEditMeteo={setEditMeteo} />
      )}
      <Button
        className='w-full m-0!'
        label='Nový záznam'
        onClick={() =>
          setEditMeteo((orig: EditMeteoType) => ({
            ...orig,
            method: 'add',
          }))
        }
      />

      <LipnoTable setEditMeteo={setEditMeteo} />
      <LipnoGraph />
    </>
  );
};
