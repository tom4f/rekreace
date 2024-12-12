import { useEffect, useRef, useState } from 'react';
import FormularStyle from './../css/Formular.module.css';
import ModifyPocasiStyle from './../css/ModifyPocasi.module.css';
import { AddPocasi } from './AddPocasi';
import { addQuerySelector } from './AddQuerySelector';
import { DeletePocasi } from './DeletePocasi';
import { EditPocasi } from './EditPocasi';
import { ShowYearTable } from './ShowYearTable';
import { editMeteoType, pocasiType } from './TypeDefinition';
import { useLoginStatus } from '../../../features/login/hooks/useGetLoginStatus';
import { Login } from '../../../features/login';

//import '../css/formular.css';

export const ModifyPocasi = () => {
  const { data: loginData } = useLoginStatus();

  // last 30 meteo lines
  const [pocasi, setPocasi] = useState<pocasiType[]>();

  // edit params
  const [editMeteo, setEditMeteo] = useState<editMeteoType>({
    // values to be edited
    editDate: '',
    editKey: '',
    editValue: '',
    // show/hide forms
    dispEdit: false,
    dispDelete: false,
    dispAdd: false,
    // trigger for table reload
    refresh: 0,
  });

  const editMeteoRef = useRef(editMeteo);

  // update table querySelector when 'pocasi' changed
  useEffect(() => {
    if (!pocasi) return;
    addQuerySelector(
      pocasi,
      editMeteoRef.current,
      setEditMeteo,
      loginData?.webToken || ''
    );
  }, [pocasi]);

  return (
    <>
      <div className={ModifyPocasiStyle.editPocasi}>
        {!loginData?.isLogged && <Login />}

        {editMeteo.dispAdd && pocasi ? (
          <AddPocasi
            pocasi={pocasi}
            editMeteo={editMeteo}
            setEditMeteo={setEditMeteo}
            webToken={loginData?.webToken || ''}
            user={loginData?.webUser || ''}
          />
        ) : null}

        {editMeteo.dispEdit && pocasi ? (
          <EditPocasi
            editMeteo={editMeteo}
            setEditMeteo={setEditMeteo}
            webToken={loginData?.webToken || ''}
            user={loginData?.webUser || ''}
          />
        ) : null}

        {editMeteo.dispDelete ? (
          <DeletePocasi
            editMeteo={editMeteo}
            setEditMeteo={setEditMeteo}
            webToken={loginData?.webToken || ''}
            user={loginData?.webUser || ''}
          />
        ) : null}

        {loginData?.isLogged ? (
          <div className={FormularStyle.form_booking}>
            <div className={FormularStyle.submit_booking}>
              <input
                type='submit'
                onClick={() =>
                  setEditMeteo({
                    ...editMeteo,
                    dispEdit: false,
                    dispDelete: false,
                    dispAdd: true,
                  })
                }
                value='+ Vytvřit nový záznam'
              />
            </div>
          </div>
        ) : null}
      </div>

      <ShowYearTable
        pocasi={pocasi}
        setPocasi={setPocasi}
        user={loginData?.webUser}
        webToken={loginData?.webToken}
        editMeteo={editMeteo}
      />
    </>
  );
};
