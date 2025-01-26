import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/Atoms';
import { useLoginStatus } from 'src/features/login';
import { LipnoKeyType, useGetLipno } from 'src/features/meteo';

import { addLipnoTableQuerySelector } from '../utils/addLipnoTableQuerySelector';
import { AddLipno } from './AddLipno';
import { DeleteLipno } from './DeleteLipno';
import { EditLipno } from './EditLipno';
import { ShowYearGraph } from './ShowYearGraph';
import { ShowYearTable } from './ShowYearTable';

export type EditMeteoType = {
  editDate: string;
  editKey: LipnoKeyType;
  editValue: string | number;
  method: 'edit' | 'add' | 'delete' | null;
  methodResult: 'error' | 'ok' | null;
};
export const ModifyLipno = () => {
  const navigate = useNavigate();
  const { data: loginData } = useLoginStatus();

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
    if (isSuccess && pocasi.length) {
      addLipnoTableQuerySelector(pocasi, setEditMeteo);
    }
  }, [pocasi, isSuccess]);

  useEffect(() => {
    if (!loginData.isLogged) {
      navigate('/bedrich');
    }
  }, [loginData.isLogged, navigate]);

  if (!isSuccess && !pocasi?.length) {
    return null;
  }

  const LipnoModal = () => {
    switch (editMeteo.method) {
      case 'edit':
        return <EditLipno editMeteo={editMeteo} setEditMeteo={setEditMeteo} />;
      case 'add':
        return <AddLipno editMeteo={editMeteo} setEditMeteo={setEditMeteo} />;
      case 'delete':
        return (
          <DeleteLipno editMeteo={editMeteo} setEditMeteo={setEditMeteo} />
        );
      default:
        <></>;
    }
  };

  return (
    <>
      <LipnoModal />
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

      <ShowYearTable />
      <ShowYearGraph />
    </>
  );
};
