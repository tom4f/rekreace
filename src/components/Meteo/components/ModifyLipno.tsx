import { useEffect, useState } from 'react';
import { Button } from 'src/components/Atoms/Button/Button';
import { addLipnoTableQuerySelector } from 'src/components/Meteo/components/addLipnoTableQuerySelector';
import { Login } from 'src/features/login';
import { useLoginStatus } from 'src/features/login/hooks/useGetLoginStatus';
import { LipnoKeyType, useGetLipno } from 'src/features/meteo';

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
      {!loginData.isLogged ? (
        <Login />
      ) : (
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
        </>
      )}

      <ShowYearTable />
      <ShowYearGraph />
    </>
  );
};
