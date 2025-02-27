import { Button } from 'components/Atoms';
import {
  MeteoDates,
  useDateStore,
} from 'components/Meteo/zustandStore/useMeteoStore';
import { useLoginStatus } from 'features/login';
import { useDeleteLipno } from 'features/meteo';

import { ModifyLipnoType } from './EditLipno';
import { EditMeteoType } from './ModifyLipno';
import { ModifyLipnoModal } from './ModifyLipnoModal';

export const DeleteLipno = ({ editMeteo, setEditMeteo }: ModifyLipnoType) => {
  const { updateDate } = useDateStore();
  const { mutate } = useDeleteLipno();
  const { data: loginData } = useLoginStatus();
  const { webToken, webUser } = loginData;
  const { editDate } = editMeteo;

  const fotoGalleryOwner = '_ubytovani';

  const deleteLipno = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    mutate(
      { datum: editDate, webToken, webUser, fotoGalleryOwner },
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
