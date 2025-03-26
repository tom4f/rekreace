import { Button } from 'components/Atoms';
import { useDeleteLipno } from 'features/meteo';
import { MeteoDates, useDateStore } from 'store/useMeteoStore';

import { ModifyLipnoType } from './EditLipno';
import { EditMeteoType } from './ModifyLipno';
import { ModifyLipnoModal } from './ModifyLipnoModal';

export const DeleteLipno = ({ editMeteo, setEditMeteo }: ModifyLipnoType) => {
  const { updateDate } = useDateStore();
  const { mutate } = useDeleteLipno();
  const { editDate } = editMeteo;

  const deleteLipno = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    mutate(
      { datum: editDate },
      {
        onSuccess: () => {
          updateDate(MeteoDates.LIPNO_DAILY, new Date());

          setEditMeteo((orig: EditMeteoType) => ({
            ...orig,
            method: null,
            methodResult: 'ok',
          }));
        },
        onError: () => {
          setEditMeteo((orig: EditMeteoType) => ({
            ...orig,
            methodResult: 'error',
          }));
        },
      }
    );
  };

  return (
    <ModifyLipnoModal editMeteo={editMeteo} setEditMeteo={setEditMeteo}>
      <h4>Mažete datum {editDate} </h4>
      <Button label='Opravdu smazat?' onClick={deleteLipno} />
    </ModifyLipnoModal>
  );
};
