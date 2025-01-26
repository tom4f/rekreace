import { useMemo, useState } from 'react';
import { AlertBox } from 'components/AlertBox/AlertBox';
import { Button, Input, Select } from 'components/Atoms';
import { useAlert } from 'features/alert';
import {
  skeletonBookingData,
  useEditBooking,
  useGetBooking,
} from 'features/booking';
import { StyledForm, StyledLogin, useLoginStatus } from 'features/login';
import { weekStartAt } from 'utils/weekStartAt';

type EditType = {
  week: number;
  apartmentNr: 1 | 2 | 3;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Edit = ({ week, apartmentNr, setIsEdit }: EditType) => {
  const { isSuccess, data: bookingData } = useGetBooking();
  const weekArrIndex = week - 1;
  const { mutate } = useEditBooking();
  const { alert, setAlert } = useAlert();
  const data = isSuccess ? bookingData : skeletonBookingData;
  const [gText, setGText] = useState(
    data[weekArrIndex][`g${apartmentNr}_text`]
  );
  const [gStatus, setGStatus] = useState(
    data[weekArrIndex][`g${apartmentNr}_status`]
  );

  const { data: loginData } = useLoginStatus();

  const showTermin = useMemo(() => {
    const actualWeek = weekStartAt().actualWeek;
    const weekModified = week < actualWeek ? week + 52 : week;
    const start = weekStartAt(weekModified);
    const end = weekStartAt(weekModified + 1);

    return `(${week}) ${start.date}.${start.month}-${end.date}.${end.month}.${end.year}`;
  }, [week]);

  const handleUpdateTermin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formObject = {
      fotoGalleryOwner: loginData?.webAccess || '',
      webToken: loginData?.webToken || '',
      webUser: loginData?.webUser || '',
      g_number: apartmentNr,
      g_status: gStatus,
      g_text: gText,
      g_week: week,
    };

    const delay = () => {
      const timeout = setTimeout(() => {
        setIsEdit(false);
      }, 2000);
      return () => clearTimeout(timeout);
    };

    mutate(formObject, {
      onSuccess: (successResponse) => {
        delay();
        setAlert({
          header: 'v pořádku',
          text: successResponse.result,
          color: 'lime',
        });
      },
      onError: (errorResponse) => {
        delay();
        setAlert({
          header: 'změna se neprovedla',
          text: `${errorResponse.data.result} - ${errorResponse.status}`,
          color: 'red',
        });
      },
    });
  };

  const statusOptions = [
    { value: '0', label: 'volno' },
    { value: '1', label: 'obsazeno' },
    { value: '2', label: 'mimo provoz' },
    { value: '3', label: 'částečně obsazeno' },
    { value: '4', label: 'zaplaceno' },
  ];

  if (data?.length && week && apartmentNr) {
    return (
      <StyledLogin>
        <AlertBox alert={alert} />
        <form onSubmit={handleUpdateTermin} autoComplete='off'>
          <StyledForm>
            <div>Upravujete termín {showTermin}</div>
            <input type='hidden' name='g_week' value={week} />
            <input type='hidden' name='g_number' value={apartmentNr} />

            <Select
              name='g_status'
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setGStatus(+event.target.value)
              }
              defaultValue={gStatus}
              label='Stav :'
              options={statusOptions}
            />

            <Input
              label='Text :'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setGText(event?.target.value)
              }
              type='text'
              name='g_text'
              value={gText}
            />

            <Button name='odesli' label='Odeslat' />
          </StyledForm>
        </form>
      </StyledLogin>
    );
  }
  return null;
};
