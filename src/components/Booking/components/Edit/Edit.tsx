import { AlertBox } from 'components/AlertBox/AlertBox';
import { Button, Input, Select } from 'components/Atoms';
import { useAlert } from 'features/alert';
import {
  skeletonBookingData,
  useEditBooking,
  useGetBooking,
} from 'features/booking';
import { StyledForm, StyledLogin } from 'features/login';
import { useRef, useState } from 'react';
import { useModalStore } from 'src/store';
import { weekStartAt } from 'utils/weekStartAt';

export type AppartmentNr = 1 | 2 | 3;

type EditType = {
  week: number;
  apartmentNr: AppartmentNr;
};

const statusOptions = [
  { value: '0', label: 'volno' },
  { value: '1', label: 'obsazeno' },
  { value: '2', label: 'mimo provoz' },
  { value: '3', label: 'částečně obsazeno' },
  { value: '4', label: 'zaplaceno' },
];

export const Edit = ({ week, apartmentNr }: EditType) => {
  const { isSuccess, data: bookingData } = useGetBooking();
  const { mutate } = useEditBooking();
  const { alert, setAlert } = useAlert();
  const closeModal = useModalStore((state) => state.closeModal);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const data = isSuccess ? bookingData : skeletonBookingData;
  const weekArrIndex = week - 1;

  const [gText, setGText] = useState(
    data[weekArrIndex][`g${apartmentNr}_text`]
  );
  const [gStatus, setGStatus] = useState(
    data[weekArrIndex][`g${apartmentNr}_status`]
  );

  const actualWeek = weekStartAt().actualWeek;
  const weekModified = week < actualWeek ? week + 52 : week;
  const start = weekStartAt(weekModified);
  const end = weekStartAt(weekModified + 1);
  const showTermin = `(${week}) ${start.date}.${start.month}-${end.date}.${end.month}.${end.year}`;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === 'g_status') setGStatus(+value);
    if (name === 'g_text') setGText(value);
  };

  const handleUpdateTermin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formObject = {
      g_number: apartmentNr,
      g_status: gStatus,
      g_text: gText,
      g_week: week,
    };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    mutate(formObject, {
      onSuccess: (successResponse) => {
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

  if (data?.length && week && apartmentNr) {
    return (
      <StyledLogin>
        <AlertBox alert={alert} />
        <form onSubmit={handleUpdateTermin} autoComplete='off'>
          <StyledForm>
            <h4 className='flex text-white justify-center'>
              Upravujete termín {showTermin}
            </h4>

            <Select
              name='g_status'
              onChange={handleChange}
              defaultValue={gStatus}
              label='Stav :'
              options={statusOptions}
            />

            <Input
              label='Text :'
              onChange={handleChange}
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
