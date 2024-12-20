import { useState } from 'react';
import { useAlert } from '../../../../features/alert/utils/useAlert';
import {
  useEditBooking,
  useGetBooking,
} from '../../../../features/booking/hooks';
import {
  StyledForm,
  StyledInput,
  StyledLogin,
  StyledSubmit,
} from '../../../../features/login';
import { AlertBox } from '../../../AlertBox/AlertBox';
import { firstWeekStart, skeletonBookingData } from '../Status/ShowTable';
import { useLoginStatus } from '../../../../features/login/hooks/useGetLoginStatus';

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

  const updateTermin = (event: React.FormEvent<HTMLFormElement>) => {
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
      onSuccess: (succesResponse) => {
        delay();
        setAlert({
          header: 'v pořádku',
          text: succesResponse.result,
          color: 'lime',
        });
      },
      onError: (errorResponse) => {
        delay();
        setAlert({
          header: 'změna se neprovedla',
          text: `${errorResponse.data.result} -  ${errorResponse.status}`,
          color: 'red',
        });
      },
    });
  };

  if (data?.length && week && apartmentNr) {
    const SelectStatus = () => {
      const statusArr = [
        'volno',
        'obsazeno',
        'mimo provoz',
        'částečně obsazeno',
        'zaplaceno',
      ];

      return (
        <select
          name='g_status'
          onChange={(event) => setGStatus(+event.target.value)}
          defaultValue={gStatus}
        >
          {statusArr.map((status, i) => (
            <option key={i} value={i}>
              {status}
            </option>
          ))}
        </select>
      );
    };

    const showTermin = () => {
      const actualWeek = firstWeekStart(0).actualWeek;
      const weekModified = week < actualWeek ? week + 52 : week;
      const { date: dateStart, month: monthStart } = firstWeekStart(
        weekModified - 1
      );
      const {
        date: dateEnd,
        month: monthEnd,
        year: yearEnd,
      } = firstWeekStart(weekModified);

      return `(${week}) ${dateStart}.${monthStart}-${dateEnd}.${monthEnd}.${yearEnd}`;
    };

    return (
      <StyledLogin>
        <AlertBox alert={alert} />
        <form onSubmit={updateTermin} autoComplete='off'>
          <StyledForm>
            <div>Upravujete termín {showTermin()}</div>
            <input type='hidden' name='g_week' value={week} />
            <input type='hidden' name='g_number' value={apartmentNr} />

            <StyledInput>
              <label>Stav :</label>
              <SelectStatus />
            </StyledInput>

            <StyledInput>
              <label>Text :</label>
              <input
                onChange={(event) => setGText(event?.target.value)}
                type='text'
                name='g_text'
                value={gText}
              />
            </StyledInput>

            <StyledSubmit>
              <input type='submit' name='odesli' value='Odeslat' />
            </StyledSubmit>
          </StyledForm>
        </form>
      </StyledLogin>
    );
  }
  return <></>;
};
