import { useState } from 'react';
import ModifyPocasiStyle from './../css/ModifyPocasi.module.css';
import { ModifyPocasiType } from './TypeDefinition';
import { useDeleteLipno } from 'src/features/meteo';
import { Button } from 'src/components/Atoms/Button/Button';
import { useLoginStatus } from 'src/features/login';

export const DeletePocasi = ({ editMeteo, setEditMeteo }: ModifyPocasiType) => {
  const { mutate } = useDeleteLipno();
  const { data: loginData } = useLoginStatus();
  const { webToken, webUser } = loginData;
  const { editDate, refresh } = editMeteo;

  const fotoGalleryOwner = '_ubytovani';
  const [loginResp, setLoginResp] = useState('empty');

  const deleteMySQL = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    mutate(
      { datum: editDate, webToken, webUser, fotoGalleryOwner },
      {
        onSuccess: () => {
          setEditMeteo({
            ...editMeteo,
            dispAdd: false,
            dispEdit: false,
            dispDelete: false,
            refresh: refresh + 1,
          });
        },
        onError: () => {
          setLoginResp('error');
        },
      }
    );
  };

  return (
    <div className={ModifyPocasiStyle.container}>
      <div
        className={ModifyPocasiStyle.closeBtn}
        onClick={() => setEditMeteo({ ...editMeteo, dispDelete: false })}
      >
        <span>x</span>
      </div>
      {loginResp === 'error' ? (
        <div> Někde nastala chyba - {loginResp} :-(</div>
      ) : null}
      <h4>Mažete datum {editDate} </h4>

      <Button label='Opravdu smazat?' onClick={deleteMySQL} />
    </div>
  );
};
