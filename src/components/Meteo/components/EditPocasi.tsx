import { useState } from 'react';
import FormularStyle from './../css/Formular.module.css';
import ModifyPocasiStyle from './../css/ModifyPocasi.module.css';
import { ModifyPocasiType } from './TypeDefinition';
import { useEditLipno } from 'src/features/meteo/hooks/useEditLipno';
import { useLoginStatus } from 'src/features/login';
import { EditMeteoType } from './ModifyPocasi';

export const EditPocasi = ({ editMeteo, setEditMeteo }: ModifyPocasiType) => {
  const { mutate } = useEditLipno();
  const { data: loginData } = useLoginStatus();
  const { editDate, editKey, editValue } = editMeteo;

  const [loginResp, setLoginResp] = useState('empty');

  const updateMySQL = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        datum: editDate,
        key: editKey,
        value: editValue,
        webToken: loginData.webToken,
        webUser: loginData.webUser,
        fotoGalleryOwner: loginData.webAccess,
      },
      {
        onSuccess: () => {
          setEditMeteo((editMeteo: EditMeteoType) => ({
            ...editMeteo,
            dispEdit: false,
          }));
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
        onClick={() => setEditMeteo({ ...editMeteo, dispEdit: false })}
      >
        <span>x</span>
      </div>
      {loginResp === 'error' ? <div> Někde nastala chyba :-(</div> : null}
      <h4>Upravujete datum {editDate} </h4>
      <form
        onSubmit={(e) => updateMySQL(e)}
        autoComplete='off'
        id='edit_form_pocasi'
        name='edit_form_pocasi'
      >
        <div className={FormularStyle.form_booking}>
          <input type='hidden' name='datum' value={editDate} />
          <div className={FormularStyle.input_booking}>
            <label>{editKey} :</label>
            <br />
            <input type='hidden' name='key' value={editKey} />
            <input
              type='text'
              name='value'
              onChange={(e) =>
                setEditMeteo({
                  ...editMeteo,
                  editDate,
                  editKey,
                  editValue: e.target.value,
                })
              }
              value={editValue}
            />
          </div>
          <div className={FormularStyle.submit_booking}>
            <input type='submit' name='odesli' value='Odeslat' />
          </div>
        </div>
      </form>
    </div>
  );
};
