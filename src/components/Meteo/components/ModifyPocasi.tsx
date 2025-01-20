import { useEffect, useRef, useState } from 'react';
import FormularStyle from './../css/Formular.module.css';
import ModifyPocasiStyle from './../css/ModifyPocasi.module.css';
import { AddPocasi } from './AddPocasi';
import { addQuerySelector } from 'src/components/Meteo/components/addQuerySelector';
import { DeletePocasi } from './DeletePocasi';
import { EditPocasi } from './EditPocasi';
import { ShowYearTable } from './ShowYearTable';
import { ShowYearGraph } from './ShowYearGraph';
import { useLoginStatus } from '../../../features/login/hooks/useGetLoginStatus';
import { Login } from '../../../features/login';
import { useGetPocasi } from 'src/features/meteo';

export type EditMeteoType = {
  editDate: string;
  editKey: 'hladina' | 'pritok' | 'odtok' | 'voda' | 'vzduch' | 'pocasi';
  editValue: string | number;
  dispEdit: boolean;
  dispDelete: boolean;
  dispAdd: boolean;
  refresh: number;
};
export const ModifyPocasi = () => {
  const { data: loginData } = useLoginStatus();

  const { data: pocasi } = useGetPocasi({
    start: 0,
    limit: 30,
    requestType: 'amount',
    orderBy: 'datum',
    sort: 'DESC',
  });

  // edit params
  const [editMeteo, setEditMeteo] = useState<EditMeteoType>({
    // values to be edited
    editDate: '',
    editKey: 'hladina',
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
    addQuerySelector(pocasi, editMeteoRef.current, setEditMeteo);
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
                value='+ Vytvořit nový záznam'
              />
            </div>
          </div>
        ) : null}
      </div>

      <ShowYearTable />
      <ShowYearGraph />
    </>
  );
};
