import { Button } from 'components/Atoms';
import { useAlert } from 'features/alert';
import { useDeleteLipno } from 'features/meteo';
import { useRef } from 'react';
import { AlertBox } from 'src/components/AlertBox/AlertBox';
import { MeteoDates, useDateStore, useModalStore } from 'store';

export const DeleteLipno = ({ editDate }: { editDate: string }) => {
  const { updateDate } = useDateStore();
  const { mutate } = useDeleteLipno();
  const { alert, setAlert } = useAlert();
  const closeModal = useModalStore((state) => state.closeModal);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const deleteLipno = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    mutate(
      { datum: editDate },
      {
        onSuccess: (successResponse) => {
          updateDate(MeteoDates.LIPNO_DAILY, new Date());
          setAlert({
            header: 'v pořádku',
            text: successResponse.result,
            color: 'lime',
          });
          timeoutRef.current = setTimeout(closeModal, 2000);
        },
        onError: (errorResponse) => {
          setAlert({
            header: 'změna se neprovedla',
            text: `${errorResponse.data.result} - ${errorResponse.status}`,
            color: 'red',
          });
        },
      }
    );
  };

  return (
    <div className='p-4'>
      <h4 className='flex text-white justify-center'>
        Mažete datum {editDate}{' '}
      </h4>
      <div className='flex justify-center'>
        <Button label='Opravdu smazat?' onClick={deleteLipno} />
      </div>
      <AlertBox alert={alert} />
    </div>
  );
};
