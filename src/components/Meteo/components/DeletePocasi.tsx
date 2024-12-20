import { useState } from 'react';
import { Url } from '../../../api/paths';
import FormularStyle from './../css/Formular.module.css';
import ModifyPocasiStyle from './../css/ModifyPocasi.module.css';
import { FDobjectType, ModifyPocasiType } from './TypeDefinition';

export const DeletePocasi = ({
  editMeteo,
  setEditMeteo,
  webToken,
  user,
}: ModifyPocasiType) => {
  const { editDate, refresh } = editMeteo;

  const fotoGalleryOwner = '_ubytovani';
  const [loginResp, setLoginResp] = useState('empty');

  const deleteMySQL = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = document.getElementById(
      'delete_form_pocasi'
    ) as HTMLFormElement;
    const FD = new FormData(form);
    FD.append('fotoGalleryOwner', fotoGalleryOwner);
    FD.append('webToken', webToken);
    FD.append('webUser', user);
    const FDobject: FDobjectType = {};
    FD.forEach((value, key) => (FDobject[key] = value));
    // AJAX
    {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${Url.API}/pdo_delete_pocasi.php`, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200) {
          const editResult = JSON.parse(this.responseText);
          if (editResult.result === 'pocasi_delete_ok') {
            setEditMeteo({
              ...editMeteo,
              dispAdd: false,
              dispEdit: false,
              dispDelete: false,
              refresh: refresh + 1,
            });
          } else {
            setLoginResp('error');
          }
        }
      };
      xhr.onerror = function () {
        setLoginResp('error');
      };
      xhr.send(JSON.stringify(FDobject));
    }
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
      <form
        onSubmit={(e) => deleteMySQL(e)}
        autoComplete='off'
        id='delete_form_pocasi'
      >
        <div className={FormularStyle.form_booking}>
          <input type='hidden' name='datum' value={editDate} />
          <div className={FormularStyle.submit_booking}>
            <input type='submit' name='odesli' value='Opravdu smazat?' />
          </div>
        </div>
      </form>
    </div>
  );
};
