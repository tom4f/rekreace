import { useEffect, useState } from 'react';
import FormularStyle from './../css/Formular.module.css';
import ModifyLipnoStyle from './../css/ModifyLipno.module.css';
import { AddLipno } from './AddLipno';
import { addLipnoTableQuerySelector } from 'src/components/Meteo/components/addLipnoTableQuerySelector';
import { DeleteLipno } from './DeleteLipno';
import { EditLipno } from './EditLipno';
import { ShowYearTable } from './ShowYearTable';
import { ShowYearGraph } from './ShowYearGraph';
import { useLoginStatus } from '../../../features/login/hooks/useGetLoginStatus';
import { Login } from '../../../features/login';
import { useGetLipno } from 'src/features/meteo';
import { Button } from 'src/components/Atoms/Button/Button';

export type EditMeteoType = {
  editDate: string;
  editKey: 'hladina' | 'pritok' | 'odtok' | 'voda' | 'vzduch' | 'pocasi';
  editValue: string | number;
  dispEdit: boolean;
  dispDelete: boolean;
  dispAdd: boolean;
  refresh: number;
};
export const ModifyLipno = () => {
  const { data: loginData } = useLoginStatus();

  const { data: pocasi } = useGetLipno({
    start: 0,
    limit: 30,
    requestType: 'amount',
    orderBy: 'datum',
    sort: 'DESC',
  });

  // edit params
  const [editMeteo, setEditMeteo] = useState<EditMeteoType>({
    editDate: '',
    editKey: 'hladina',
    editValue: '',
    dispEdit: false,
    dispDelete: false,
    dispAdd: false,
    refresh: 0,
  });

  useEffect(() => {
    if (!pocasi) return;
    addLipnoTableQuerySelector(pocasi, setEditMeteo);
  }, [pocasi]);

  return (
    <>
      <div className={ModifyLipnoStyle.editPocasi}>
        {!loginData.isLogged && <Login />}

        {editMeteo.dispAdd && pocasi && (
          <AddLipno setEditMeteo={setEditMeteo} />
        )}

        {editMeteo.dispEdit && pocasi && (
          <EditLipno editMeteo={editMeteo} setEditMeteo={setEditMeteo} />
        )}

        {editMeteo.dispDelete && (
          <DeleteLipno editMeteo={editMeteo} setEditMeteo={setEditMeteo} />
        )}

        {loginData.isLogged ? (
          <div className={FormularStyle.form_booking}>
            <Button
              label='Nový záznam'
              onClick={() =>
                setEditMeteo((orig: EditMeteoType) => ({
                  ...orig,
                  dispAdd: true,
                }))
              }
            />
          </div>
        ) : null}
      </div>

      <ShowYearTable />
      <ShowYearGraph />
    </>
  );
};
