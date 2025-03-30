import { Button } from 'components/Atoms';
import { LipnoKeyType, useGetLipno } from 'features/meteo';
import { useAuthStore, useModalStore } from 'src/store';

import { LipnoGraph, LipnoTable } from './';
import { AddLipno } from './AddLipno';

export type EditMeteoType = {
  editDate: string;
  editKey: LipnoKeyType;
  editValue: string | number;
};
export const ModifyLipno = () => {
  const { isLogged } = useAuthStore();
  const openModal = useModalStore((state) => state.openModal);

  const { data: pocasi, isSuccess } = useGetLipno({
    start: 0,
    limit: 30,
    requestType: 'amount',
    orderBy: 'datum',
    sort: 'DESC',
  });

  if (!isSuccess || !pocasi?.length || !isLogged) {
    return null;
  }

  return (
    <>
      <Button
        className='w-full m-0!'
        label='Nový záznam'
        onClick={() =>
          openModal({
            content: <AddLipno />,
            customStyle: { height: 'auto' },
          })
        }
      />
      <LipnoTable />
      <LipnoGraph />
    </>
  );
};
