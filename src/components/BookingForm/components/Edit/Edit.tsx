import { useState, useMemo } from 'react';
import { useAlert } from '../../../../features/alert/utils/useAlert';
import { useEditBooking, useGetBooking } from '../../../../features/booking';
import { StyledForm, StyledLogin } from '../../../../features/login';
import { AlertBox } from '../../../AlertBox/AlertBox';
import { firstWeekStart, skeletonBookingData } from '../Status/ShowTable';
import { useLoginStatus } from '../../../../features/login/hooks/useGetLoginStatus';
import { Input } from '../../../Atoms/Input/Input';
import { Select } from '../../../Atoms/Input/Select';
import { Button } from '../../../Atoms/Button/Button';

type EditType = {
  week: number;
  apartmentNr: 1 | 2 | 3;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const statusOptions = [
  { value: '0', label: 'volno' },
  { value: '1', label: 'obsazeno' },
  { value: '2', label: 'mimo provoz' },
  { value: '3', label: 'částečně obsazeno' },
  { value: '4', label: 'zaplaceno' },
];

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
    const actualWeek = firstWeekStart(0).actualWeek;
    const weekModified = week < actualWeek ? week + 52 : week;
    const start = firstWeekStart(weekModified - 1);
    const end = firstWeekStart(weekModified);

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
              onChange={(event) => setGStatus(+event.target.value)}
              defaultValue={gStatus}
              label='Stav :'
              options={statusOptions}
            />

            <Input
              label='Text :'
              onChange={(event) => setGText(event?.target.value)}
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
