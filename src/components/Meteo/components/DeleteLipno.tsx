import { useState, useContext } from 'react';
import ModifyLipnoStyle from './../css/ModifyLipno.module.css';
import { ModifyLipnoType } from './EditLipno';
import { useDeleteLipno } from 'src/features/meteo';
import { Button } from 'src/components/Atoms/Button/Button';
import { useLoginStatus } from 'src/features/login';
import { DateContext } from './DateContext';
import { EditMeteoType } from './ModifyLipno';

export const DeleteLipno = ({ editMeteo, setEditMeteo }: ModifyLipnoType) => {
  const { reduceDate } = useContext(DateContext);
  const { mutate } = useDeleteLipno();
  const { data: loginData } = useLoginStatus();
  const { webToken, webUser } = loginData;
  const { editDate, refresh } = editMeteo;

  const fotoGalleryOwner = '_ubytovani';
  const [loginResp, setLoginResp] = useState('empty');

  const deleteLipno = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    mutate(
      { datum: editDate, webToken, webUser, fotoGalleryOwner },
      {
        onSuccess: () => {
          reduceDate('yearSum', new Date());
          setEditMeteo((orig: EditMeteoType) => ({
            ...orig,
            dispDelete: false,
            refresh: refresh + 1,
          }));
        },
        onError: () => {
          setLoginResp('error');
        },
      }
    );
  };

  return (
    <div className={ModifyLipnoStyle.container}>
      <div
        className={ModifyLipnoStyle.closeBtn}
        onClick={() =>
          setEditMeteo((orig: EditMeteoType) => ({
            ...orig,
            dispDelete: false,
          }))
        }
      >
        <span>x</span>
      </div>
      {loginResp === 'error' ? (
        <div> Někde nastala chyba - {loginResp} :-(</div>
      ) : null}
      <h4>Mažete datum {editDate} </h4>

      <Button label='Opravdu smazat?' onClick={deleteLipno} />
    </div>
  );
};
