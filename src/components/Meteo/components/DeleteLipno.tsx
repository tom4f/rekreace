import { useContext } from 'react';
import { Button } from 'src/components/Atoms/Button/Button';
import { useLoginStatus } from 'src/features/login';
import { useDeleteLipno } from 'src/features/meteo';

import { DateContext } from './DateContext';
import { ModifyLipnoType } from './EditLipno';
import { EditMeteoType } from './ModifyLipno';
import { ModifyLipnoModal } from './ModifyLipnoModal';

export const DeleteLipno = ({ editMeteo, setEditMeteo }: ModifyLipnoType) => {
  const { reduceDate } = useContext(DateContext);
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
          reduceDate('yearSum', new Date());
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
