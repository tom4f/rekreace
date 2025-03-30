import { Button, Input } from 'components/Atoms';
import { useAlert } from 'features/alert';
import { EditLipnoRequest, useEditLipno } from 'features/meteo';
import { useRef } from 'react';
import { AlertBox } from 'src/components/AlertBox/AlertBox';
import { MeteoDates, useDateStore, useModalStore } from 'store';

import { EditMeteoType } from './ModifyLipno';

export type ModifyLipnoType = {
  editMeteo: EditMeteoType;
};

export const EditLipno = ({ editMeteo }: ModifyLipnoType) => {
  const { updateDate } = useDateStore();
  const { alert, setAlert } = useAlert();
  const closeModal = useModalStore((state) => state.closeModal);
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate } = useEditLipno();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    mutate(payload, {
      onSuccess: (successResponse) => {
        updateDate(MeteoDates.LIPNO_DAILY, new Date());
        setAlert({
          header: 'v pořádku',
          text: successResponse.result,
          color: 'lime',
        });
        timeoutRef.current = setTimeout(closeModal, 2000);
      },
      onError: (errorResponse) => {
        setAlert({
          header: 'změna se neprovedla',
          text: `${errorResponse.data.result} - ${errorResponse.status}`,
          color: 'red',
        });
      },
    });
  };

  return (
    <div className='p-4'>
      <h4 className='flex text-white justify-center'>
        Upravujete datum {editDate}{' '}
      </h4>
      <form ref={formRef} onSubmit={editLipno} autoComplete='off'>
        <div className='flex flex-wrap justify-center'>
          <Input
            label={editKey}
            type='text'
            name='value'
            defaultValue={editValue}
          />
          <Button label='Odeslat' />
        </div>
      </form>
      <AlertBox alert={alert} />
    </div>
  );
};
