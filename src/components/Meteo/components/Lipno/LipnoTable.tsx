import { Header } from 'components/Atoms';
import { DateButton, DateChangeBlock, RgbCssType } from 'components/Meteo';
import TableStyle from 'components/Meteo/css/Table.module.css';
import {
  changeDate,
  getDaysFromNow,
  MeteoDates,
  PeriodType,
  StepType,
  useDateStore,
} from 'components/Meteo/zustandStore';
import { useLoginStatus } from 'features/login';
import { lipnoKeys, LipnoKeyType, useGetLipno } from 'features/meteo';
import { useCallback, useState } from 'react';
import { getDateParts } from 'utils';

import { EditMeteoType } from './';

export const LipnoTable = ({
  setEditMeteo,
}: {
  setEditMeteo?: React.Dispatch<React.SetStateAction<EditMeteoType>>;
}) => {
  const { updateDate, resetDate } = useDateStore();
  const lipnoDaily = useDateStore((state) => state.dates.lipnoDaily);

  const { data: loginData } = useLoginStatus();

  const [orderBy, setOrderBy] = useState<{
    value: string;
    order: 'DESC' | 'ASC';
  }>({
    value: 'datum',
    order: 'DESC',
  });

  const limit = 30;
  const start = getDaysFromNow(lipnoDaily);

  const { data: pocasi } = useGetLipno({
    start,
    limit,
    requestType: 'amount',
    orderBy: orderBy.value,
    sort: orderBy.order,
  });

  const editTermin = useCallback(
    (event: React.MouseEvent) => {
      if (!setEditMeteo || !pocasi?.length) {
        return null;
      }
      const clickedTd = event.target as Element;
      const childsTd = clickedTd.parentNode?.children;
      if (!childsTd) return null;

      let prevTd = clickedTd;
      let clicedEditColumnNr = 0;

      for (let i = childsTd.length - 1; i > 0; i--) {
        if (prevTd.previousElementSibling) {
          prevTd = prevTd.previousElementSibling;
          clicedEditColumnNr++;
        }
      }

      let clickedDeleteDateText = '';
      if (childsTd[0] instanceof HTMLElement) {
        clickedDeleteDateText = childsTd[0].innerText;
      }

      const clickedRowNr = pocasi.reduce(
        (total, value, index) =>
          value.datum === clickedDeleteDateText ? total + index : total,
        0
      );

      const editKey = lipnoKeys[clicedEditColumnNr - 1] as LipnoKeyType;

      const { datum: editDate, [editKey]: editValue } = pocasi[clickedRowNr];

      setEditMeteo((orig: EditMeteoType) => ({
        ...orig,
        editDate,
        editKey,
        editValue,
        dispEdit: !!clicedEditColumnNr,
        dispDelete: !clicedEditColumnNr,
        method: clicedEditColumnNr ? 'edit' : 'delete',
      }));
    },
    [setEditMeteo, pocasi]
  );

  const setDate = (period: PeriodType, step: StepType) => {
    updateDate(
      MeteoDates.LIPNO_DAILY,
      changeDate(MeteoDates.LIPNO_DAILY, lipnoDaily, period, step)
    );
  };

  const rgbCss: RgbCssType = (r, g, b, value) => {
    return { background: `rgba(${r}, ${g}, ${b}, ${value})` };
  };
  const rgbCssT = (value: number) => {
    return value > 0
      ? { background: `rgba(255, 0, 0, ${value / 35})` }
      : { background: `rgba(0, 0, 255, ${-value / 25})` };
  };

  const PrintPocasi = () => {
    if (!pocasi?.length) {
      return null;
    }
    const output: React.JSX.Element[] = [];
    pocasi?.forEach((one, index) =>
      output.push(
        <tr key={index}>
          <td
            onClick={(e) => editTermin(e)}
            className={loginData.webToken !== 'error' ? TableStyle.datum : ''}
          >
            {one.datum}
          </td>
          <td
            onClick={(e) => editTermin(e)}
            style={rgbCss(255, 0, 0, 1 - (725 - one.hladina) / 2)}
          >
            {one.hladina}
          </td>
          <td
            onClick={(e) => editTermin(e)}
            style={rgbCss(0, 255, 0, one.pritok / 100)}
          >
            {one.pritok}
          </td>
          <td
            onClick={(e) => editTermin(e)}
            style={rgbCss(0, 255, 0, one.odtok / 100)}
          >
            {one.odtok}
          </td>
          <td
            onClick={(e) => editTermin(e)}
            style={rgbCss(255, 0, 0, one.voda / 25)}
          >
            {one.voda}
          </td>
          <td onClick={(e) => editTermin(e)} style={rgbCssT(one.vzduch)}>
            {one.vzduch}
          </td>
          <td onClick={(e) => editTermin(e)}>{one.pocasi}</td>
        </tr>
      )
    );
    return output;
  };

  const sort = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedName = (e.target as HTMLButtonElement).name;
    setOrderBy({
      value: clickedName,
      order: orderBy.order === 'DESC' ? 'ASC' : 'DESC',
    });
  };
  const { year, month, day } = getDateParts(lipnoDaily);

  return (
    <>
      <Header>
        <DateChangeBlock setDate={setDate} period='day' text={day} />.
        <DateChangeBlock setDate={setDate} period='month' text={month} />.
        <DateChangeBlock setDate={setDate} period='year' text={year} />.
        <DateButton onClick={() => resetDate(MeteoDates.LIPNO_DAILY)}>
          Reset
        </DateButton>
      </Header>
      <section className={TableStyle.davisTable}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th colSpan={3}>vodní nádrž Lipno [00:00 hod]</th>
              <th colSpan={3}>[7:00 hod]</th>
            </tr>
            <tr>
              <th>
                <button name='datum' onClick={(e) => sort(e)}>
                  datum
                </button>
              </th>
              <th>
                <button name='hladina' onClick={sort}>
                  hladina
                </button>
              </th>
              <th>
                <button name='pritok' onClick={sort}>
                  přítok
                </button>
              </th>
              <th>
                <button name='odtok' onClick={sort}>
                  odtok
                </button>
              </th>
              <th>
                <button name='voda' onClick={sort}>
                  voda
                </button>
              </th>
              <th>
                <button name='vzduch' onClick={sort}>
                  vzduch
                </button>
              </th>
              <th>komentář</th>
            </tr>
            <tr>
              <th></th>
              <th>m n.m.</th>
              <th>
                m<sup>3</sup>/s
              </th>
              <th>
                m<sup>3</sup>/s
              </th>
              <th>&deg;C</th>
              <th>&deg;C</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{PrintPocasi()}</tbody>
        </table>
      </section>
    </>
  );
};
