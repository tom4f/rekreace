import { useState } from 'react';
import FormularStyle from './../css/Formular.module.css';
import ModifyPocasiStyle from './../css/ModifyPocasi.module.css';
import { AddPocasiType } from './TypeDefinition';
import { useAddLipno, useGetPocasi } from 'src/features/meteo';
import { useLoginStatus } from 'src/features/login';
import { EditMeteoType } from './ModifyPocasi';

export const AddPocasi = ({ setEditMeteo }: AddPocasiType) => {
  const { mutate } = useAddLipno();
  const { data: loginData } = useLoginStatus();
  const { data: pocasiData } = useGetPocasi({
    start: 0,
    limit: 1,
    requestType: 'amount',
    orderBy: 'datum',
    sort: 'DESC',
    refetchInterval: 10000,
  });

  const today = (now: Date) => {
    const day = now.getDate();
    const dayString = day < 10 ? `0${day}` : day;
    const month = now.getMonth() + 1;
    const monthString = month < 10 ? `0${month}` : month;
    const year = now.getFullYear();
    return `${year}-${monthString}-${dayString}`;
  };

  const [newValues, setNewValues] = useState({
    datum: today(new Date()),
    hladina: 0,
    pritok: 0,
    odtok: 0,
    voda: 0,
    vzduch: 0,
    pocasi: '',
  });

  const [loginResp, setLoginResp] = useState('empty');

  if (!pocasiData) {
    return null;
  }

  const addLipno = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        datum: newValues.datum,
        hladina: newValues.hladina,
        pritok: newValues.pritok,
        odtok: newValues.odtok,
        voda: newValues.voda,
        vzduch: newValues.vzduch,
        pocasi: newValues.pocasi,
        webToken: loginData.webToken,
        webUser: loginData.webUser,
        fotoGalleryOwner: loginData.webAccess,
      },
      {
        onSuccess: () => {
          setEditMeteo((editMeteo: EditMeteoType) => ({
            ...editMeteo,
            dispAdd: false,
          }));
        },
        onError: () => {
          setLoginResp('error');
        },
      }
    );
  };

  const set = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = e.target.name;
    const value = e.target.value;
    setNewValues({ ...newValues, [param]: value });
  };

  return (
    <>
      <div className={ModifyPocasiStyle.container}>
        <div
          className={ModifyPocasiStyle.closeBtn}
          onClick={() =>
            setEditMeteo((editMeteo: EditMeteoType) => ({
              ...editMeteo,
              dispAdd: false,
            }))
          }
        >
          <span>x</span>
        </div>
        {loginResp === 'error' ? <div> Někde nastala chyba :-(</div> : null}
        <h4>Nový záznam</h4>
        <form
          onSubmit={addLipno}
          autoComplete='off'
          id='edit_form_pocasi'
          name='edit_form_pocasi'
        >
          <div className={FormularStyle.form_booking}>
            <div className={FormularStyle.input_booking}>
              <label>datum:</label>
              <br />
              <input
                type='text'
                name='datum'
                value={newValues.datum}
                onChange={(e) => set(e)}
              />
            </div>
            <div className={FormularStyle.input_booking}>
              <label>voda:</label>
              <br />
              <input
                type='text'
                name='voda'
                value={newValues.voda || pocasiData[0].voda}
                onChange={(e) => set(e)}
              />
            </div>
            <div className={FormularStyle.input_booking}>
              <label>vzduch:</label>
              <br />
              <input
                type='text'
                name='vzduch'
                value={newValues.vzduch || pocasiData[0].vzduch}
                onChange={(e) => set(e)}
              />
            </div>
            <div className={FormularStyle.input_booking}>
              <label>hladina:</label>
              <br />
              <input
                type='text'
                name='hladina'
                value={newValues.hladina || pocasiData[0].hladina}
                onChange={(e) => set(e)}
              />
            </div>
            <div className={FormularStyle.input_booking}>
              <label>přítok:</label>
              <br />
              <input
                type='text'
                name='pritok'
                value={newValues.pritok || pocasiData[0].pritok}
                onChange={(e) => set(e)}
              />
            </div>
            <div className={FormularStyle.input_booking}>
              <label>odtok:</label>
              <br />
              <input
                type='text'
                name='odtok'
                value={newValues.odtok || pocasiData[0].odtok}
                onChange={(e) => set(e)}
              />
            </div>
            <div className={FormularStyle.input_booking}>
              <label>komentář:</label>
              <br />
              <input
                type='text'
                name='pocasi'
                value={newValues.pocasi || pocasiData[0].pocasi}
                onChange={(e) => set(e)}
              />
            </div>

            <div className={FormularStyle.submit_booking}>
              <input type='submit' name='odesli' value='Odeslat' />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
