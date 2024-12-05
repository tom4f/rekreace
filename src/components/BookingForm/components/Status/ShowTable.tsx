import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetBooking } from "../../../../features/booking/hooks";
import { useLoginStatus } from "../../../../features/login";
import { Modal } from "../../../Modal/Modal";
import { Edit } from "../Edit/Edit";
import "./css/showTable.css";

export const skeletonBookingData = Array.from({ length: 53 }, (_, index) => ({
  week: index + 1,
  g1_status: 0,
  g1_text: "",
  g2_status: 0,
  g2_text: "",
  g3_status: 0,
  g3_text: "",
  lastUpdate: "",
}));

export const firstWeekStart = (week = 0) => {
  const year = new Date().getFullYear();
  const today = new Date().getTime();
  const firstDay = new Date(year, 0).getDay(); // 1 = Monday
  // Get the firt day of year + get day of week : 0 (Sunday) to 6 (Saturday)
  const plusDays = firstDay >= 0 && firstDay < 5 ? 0 : 7;
  const firstSat = new Date(year, 0, 7 * week + firstDay + plusDays - 2);
  const actualWeek = Math.ceil(
    (today - firstSat.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );

  return {
    date: `0${firstSat.getDate()}`.slice(-2),
    month: `0${firstSat.getMonth() + 1}`.slice(-2),
    year: firstSat.getFullYear(),
    actualWeek,
  };
};

export const ShowTable = () => {
  const { isSuccess, data: bookingData } = useGetBooking();
  const { pathname } = useLocation();
  const [apartmentNr, setApartmentNr] = useState<1 | 2 | 3>();
  const [dbWeek, setDbWeek] = useState<number>();
  const [isEdit, setIsEdit] = useState(false);

  const {
    loginData: { isLogged },
  } = useLoginStatus();

  const data = isSuccess ? bookingData : skeletonBookingData;

  const editTermin = (event: React.MouseEvent<HTMLTableCellElement>) => {
    if (!isLogged) return null;
    if (!event) return null;
    const clickedTd = event.target as HTMLTableCellElement;
    const childsTd = clickedTd.parentNode?.children;
    if (!childsTd) return null;
    if (!clickedTd) return null;
    const apartmentNr = clickedTd.cellIndex;
    const clickedWeek = childsTd[0].textContent?.match(/\((.*?)\)/);

    if (apartmentNr && clickedWeek?.length && pathname === "/objednavka/edit") {
      setApartmentNr(apartmentNr as 1 | 2 | 3);
      setDbWeek(+clickedWeek[1]);
      setIsEdit(true);
    }
  };

  const bgColor = [
    {},
    { backgroundColor: "rgba(255, 208,   0, 0.9)" },
    { backgroundColor: "rgba(255,   0,   0, 0.9)" },
    { backgroundColor: "rgba(202, 202, 202, 0.9)" },
    { backgroundColor: "rgba(  0, 255,   0, 0.9)" },
  ];

  const createTr = (week: number) => {
    const weekModified = week < data.length ? week : week - data.length + 1;
    const { date: dateStart, month: monthStart } = firstWeekStart(week - 1);
    const {
      date: dateEnd,
      month: monthEnd,
      year: yearEnd,
    } = firstWeekStart(week);
    const termin = `(${weekModified}) ${dateStart}.${monthStart}-${dateEnd}.${monthEnd}.${yearEnd}`;
    const weekArrIndex = weekModified - 1;
    return (
      <tr key={week}>
        <td>{termin}</td>
        <td
          onClick={(e) => editTermin(e)}
          style={bgColor[+data[weekArrIndex]["g1_status"]]}
        >
          {data[weekArrIndex]["g1_text"]}
        </td>
        <td
          onClick={editTermin}
          style={bgColor[+data[weekArrIndex]["g2_status"]]}
        >
          {data[weekArrIndex]["g2_text"]}
        </td>
        <td
          onClick={editTermin}
          style={bgColor[+data[weekArrIndex]["g3_status"]]}
        >
          {data[weekArrIndex]["g3_text"]}
        </td>
      </tr>
    );
  };

  const allTr: JSX.Element[] = [];
  for (
    let week = firstWeekStart(0).actualWeek;
    week < firstWeekStart(0).actualWeek + data.length;
    week++
  ) {
    allTr.push(createTr(week));
  }

  return (
    <>
      {isEdit && dbWeek && apartmentNr && (
        <Modal
          customStyle={{ width: "500px", height: "300px" }}
          setIsVisible={setIsEdit}
          children={
            <>
              <Edit
                week={dbWeek}
                apartmentNr={apartmentNr}
                setIsEdit={setIsEdit}
              />
            </>
          }
        />
      )}
      <table className="booking_table">
        <thead>
          <tr>
            <th>Datum (týden so-so)</th>
            <th>Apartmán č.1</th>
            <th>Apartmán č.2</th>
            <th>Apartmán č.3</th>
          </tr>
        </thead>
        <tbody>{allTr}</tbody>
      </table>
    </>
  );
};
