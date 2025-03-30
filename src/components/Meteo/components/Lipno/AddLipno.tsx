import { Button, Input } from 'components/Atoms';
import { useAlert } from 'features/alert';
import { AddLipnoRequest, useAddLipno, useGetLipno } from 'features/meteo';
import { useRef } from 'react';
import { AlertBox } from 'src/components/AlertBox/AlertBox';
import { MeteoDates, useDateStore, useModalStore } from 'store';

export const AddLipno = () => {
  const { updateDate } = useDateStore();
  const { alert, setAlert } = useAlert();
  const closeModal = useModalStore((state) => state.closeModal);

  const formRef = useRef<HTMLFormElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { mutate } = useAddLipno();
  const { data: pocasiData } = useGetLipno({
    start: 0,
    limit: 1,
    requestType: 'amount',
    orderBy: 'datum',
    sort: 'DESC',
  });

  if (!pocasiData) {
    return null;
  }

  const { hladina, pritok, odtok, voda, vzduch, pocasi } = pocasiData[0];

  const formatDate = (date: Date) => {
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const addLipno = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const payload: AddLipnoRequest = {
      datum: formData.get('datum') as string,
      hladina: parseFloat(formData.get('hladina') as string),
      pritok: parseFloat(formData.get('pritok') as string),
      odtok: parseFloat(formData.get('odtok') as string),
      voda: parseFloat(formData.get('voda') as string),
      vzduch: parseFloat(formData.get('vzduch') as string),
      pocasi: formData.get('pocasi') as string,
    };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    mutate(payload, {
      onSuccess: (successResponse) => {
        updateDate(MeteoDates.LIPNO_DAILY, new Date());
        setAlert({
          header:
            successResponse.result === 'pocasi_create_ok'
              ? 'v pořádku'
              : 'změna se neprovedla',
          text: successResponse.result,
          color: successResponse.result === 'pocasi_create_ok' ? 'lime' : 'red',
        });
        timeoutRef.current = setTimeout(closeModal, 2000);
      },
      onError: (errorResponse) => {
        setAlert({
          header: 'změna se neprovedla',
          text: `${errorResponse?.data?.result} - ${errorResponse?.status}`,
          color: 'red',
        });
      },
    });
  };

  return (
    <div className='p-4'>
      <h4 className='flex text-white justify-center'>Nový záznam</h4>
      <form ref={formRef} onSubmit={addLipno} autoComplete='off'>
        <div className='flex flex-wrap [&>*]:flex-[1_1_40%] justify-center'>
          <Input
            label='datum:'
            type='date'
            name='datum'
            defaultValue={formatDate(new Date())}
          />
          <Input
            label='voda:'
            type='number'
            step='any'
            name='voda'
            defaultValue={voda}
          />
          <Input
            label='vzduch:'
            type='number'
            step='any'
            name='vzduch'
            defaultValue={vzduch}
          />
          <Input
            label='hladina:'
            type='number'
            step='any'
            name='hladina'
            defaultValue={hladina}
          />
          <Input
            label='přítok:'
            type='number'
            step='any'
            name='pritok'
            defaultValue={pritok}
          />
          <Input
            label='odtok:'
            type='number'
            step='any'
            name='odtok'
            defaultValue={odtok}
          />
          <Input
            label='komentář:'
            type='text'
            name='pocasi'
            defaultValue={pocasi}
          />
          <Button type='submit' label='Odeslat' />
        </div>
      </form>
      <AlertBox alert={alert} />
    </div>
  );
};
