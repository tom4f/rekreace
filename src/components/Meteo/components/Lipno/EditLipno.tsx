import { Button, Input } from 'components/Atoms';
import {
  MeteoDates,
  useDateStore,
} from 'components/Meteo/zustandStore/useMeteoStore';
import { useLoginStatus } from 'features/login';
import { EditLipnoRequest, useEditLipno } from 'features/meteo';
import { useRef } from 'react';

import { SetEditMeteoType } from '../TypeDefinition';
import { EditMeteoType } from './ModifyLipno';
import { ModifyLipnoModal } from './ModifyLipnoModal';

export type ModifyLipnoType = {
  editMeteo: EditMeteoType;
  setEditMeteo: SetEditMeteoType;
};

export const EditLipno = ({ editMeteo, setEditMeteo }: ModifyLipnoType) => {
  const { updateDate } = useDateStore();

  const formRef = useRef<HTMLFormElement>(null);
  const { mutate } = useEditLipno();
  const { data: loginData } = useLoginStatus();
  const { editDate, editKey, editValue } = editMeteo;

  const editLipno = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const value = formData.get('value');

    if (!value) return;

    const payload: EditLipnoRequest = {
      datum: editDate,
      key: editKey,
      value: editKey === 'pocasi' ? `${value}` : +value,
      webToken: loginData.webToken,
      webUser: loginData.webUser,
      fotoGalleryOwner: loginData.webAccess,
    };

    mutate(payload, {
      onSuccess: () => {
        updateDate(MeteoDates.LIPNO_DAILY, new Date());

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
    });
  };

  return (
    <ModifyLipnoModal editMeteo={editMeteo} setEditMeteo={setEditMeteo}>
      <h4>Upravujete datum {editDate} </h4>
      <form ref={formRef} onSubmit={editLipno} autoComplete='off'>
        <Input
          label={editKey}
          type='text'
          name='value'
          defaultValue={editValue}
        />
        <Button label='Odeslat' />
      </form>
    </ModifyLipnoModal>
  );
};
