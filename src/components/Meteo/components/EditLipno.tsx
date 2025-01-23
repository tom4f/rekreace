import { useState, useRef, useContext } from 'react';
import FormularStyle from './../css/Formular.module.css';
import ModifyLipnoStyle from './../css/ModifyLipno.module.css';
import { SetEditMeteoType } from './TypeDefinition';
import { useEditLipno } from 'src/features/meteo/hooks/useEditLipno';
import { useLoginStatus } from 'src/features/login';
import { EditMeteoType } from './ModifyLipno';
import { DateContext } from './DateContext';
import { Input } from 'src/components/Atoms/Input/Input';
import { EditLipnoRequest } from 'src/features/meteo/hooks/useEditLipno';

export type ModifyLipnoType = {
  editMeteo: EditMeteoType;
  setEditMeteo: SetEditMeteoType;
};

export const EditLipno = ({ editMeteo, setEditMeteo }: ModifyLipnoType) => {
  const { reduceDate } = useContext(DateContext);
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate } = useEditLipno();
  const { data: loginData } = useLoginStatus();
  const { editDate, editKey, editValue } = editMeteo;

  const [loginResp, setLoginResp] = useState('empty');

  const editLipno = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const value1 = formData.get('value');

    if (!value1) return;

    const value = editKey === 'pocasi' ? `${value1}` : +value1;

    const payload: EditLipnoRequest = {
      datum: editDate,
      key: editKey,
      value,
      webToken: loginData.webToken,
      webUser: loginData.webUser,
      fotoGalleryOwner: loginData.webAccess,
    };

    mutate(payload, {
      onSuccess: () => {
        console.log('EditLipno - ', new Date());
        reduceDate('yearSum', new Date());
        setEditMeteo((editMeteo: EditMeteoType) => ({
          ...editMeteo,
          dispEdit: false,
        }));
      },
      onError: () => {
        setLoginResp('error');
      },
    });
  };

  return (
    <div className={ModifyLipnoStyle.container}>
      <div
        className={ModifyLipnoStyle.closeBtn}
        onClick={() => setEditMeteo({ ...editMeteo, dispEdit: false })}
      >
        <span>x</span>
      </div>
      {loginResp === 'error' ? <div> Někde nastala chyba :-(</div> : null}
      <h4>Upravujete datum {editDate} </h4>
      <form ref={formRef} onSubmit={editLipno} autoComplete='off'>
        <div className={FormularStyle.form_booking}>
          <Input
            label={editKey}
            type='text'
            name='value'
            defaultValue={editValue}
          />
          <div className={FormularStyle.submit_booking}>
            <input type='submit' name='odesli' value='Odeslat' />
          </div>
        </div>
      </form>
    </div>
  );
};
