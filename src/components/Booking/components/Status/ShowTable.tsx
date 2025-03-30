import './css/showTable.css';

import { skeletonBookingData, useGetBooking } from 'features/booking';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useModalStore } from 'src/store';
import { useAuthStore } from 'store/useAuthStore';
import { weekStartAt } from 'utils/weekStartAt';

import { AppartmentNr, Edit } from '../Edit';

const bgColor = [
  {},
  { backgroundColor: 'rgba(255, 208,   0, 0.9)' },
  { backgroundColor: 'rgba(255,   0,   0, 0.9)' },
  { backgroundColor: 'rgba(202, 202, 202, 0.9)' },
  { backgroundColor: 'rgba(  0, 255,   0, 0.9)' },
];

export const ShowTable = () => {
  const [apartmentNr, setApartmentNr] = useState<AppartmentNr>();
  const [dbWeek, setDbWeek] = useState<number>();
  const openModal = useModalStore((state) => state.openModal);
  const { isLogged } = useAuthStore();

  const {
    data: apiData,
    isSuccess,
    isFetching,
    isLoading,
    isError,
  } = useGetBooking();
  const { pathname } = useLocation();

  useEffect(() => {
    if (apartmentNr && dbWeek) {
      openModal({
        content: <Edit week={dbWeek} apartmentNr={apartmentNr} />,
      });
    }
  }, [apartmentNr, dbWeek, openModal]);

  const data = isSuccess ? apiData : skeletonBookingData;

  const editTermin = (event: React.MouseEvent<HTMLTableCellElement>) => {
    if (!isLogged) return null;
    if (!event) return null;
    const clickedTd = event.target as HTMLTableCellElement;
    const childsTd = clickedTd.parentNode?.children;
    if (!childsTd) return null;
    if (!clickedTd) return null;
    const clickedApartmentNr = clickedTd.cellIndex as AppartmentNr;
    const clickedWeek = childsTd[0].textContent?.match(/\((.*?)\)/);

    if (
      clickedApartmentNr &&
      clickedWeek?.length &&
      pathname === '/objednavka/edit'
    ) {
      setApartmentNr(clickedApartmentNr);
      setDbWeek(+clickedWeek[1]);
    }
  };

  const createTr = (week: number) => {
    const weekModified = week < data.length ? week : week - data.length + 1;
    const { date: dateStart, month: monthStart } = weekStartAt(week);
    const {
      date: dateEnd,
      month: monthEnd,
      year: yearEnd,
    } = weekStartAt(week + 1);
    const termin = `(${weekModified}) ${dateStart}.${monthStart}-${dateEnd}.${monthEnd}.${yearEnd}`;
    const weekArrIndex = weekModified - 1;
    return (
      <tr key={week}>
        <td>{termin}</td>
        <td
          onClick={(e) => editTermin(e)}
          style={bgColor[+data[weekArrIndex]['g1_status']]}
        >
          {data[weekArrIndex]['g1_text']}
        </td>
        <td
          onClick={editTermin}
          style={bgColor[+data[weekArrIndex]['g2_status']]}
        >
          {data[weekArrIndex]['g2_text']}
        </td>
        <td
          onClick={editTermin}
          style={bgColor[+data[weekArrIndex]['g3_status']]}
        >
          {data[weekArrIndex]['g3_text']}
        </td>
      </tr>
    );
  };

  const AllTr: React.JSX.Element[] = [];
  for (
    let week = weekStartAt().actualWeek;
    week < weekStartAt().actualWeek + data.length;
    week++
  ) {
    AllTr.push(createTr(week));
  }

  return (
    <>
      {isError && <>Něco se pokazilo, zkuste to prosím později.</>}
      {(isLoading || isFetching) && <>Nahrávám tabulku.</>}
      <table className='booking_table'>
        <thead>
          <tr>
            <th>týden</th>
            <th>Apartmán č.1</th>
            <th>Apartmán č.2</th>
            <th>Apartmán č.3</th>
          </tr>
        </thead>
        <tbody>{AllTr}</tbody>
      </table>
    </>
  );
};
