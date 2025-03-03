import { Header } from 'components/Atoms';
import { DateButton, DateChangeBlock } from 'components/Meteo';
import { RgbCssType } from 'components/Meteo/components/TypeDefinition';
import TableStyle from 'components/Meteo/css/Table.module.css';
import { useGetOldStation } from 'features/meteo';
import React, { useState } from 'react';
import {
  changeDate,
  getDaysFromNow,
  MeteoDates,
  PeriodType,
  StepType,
  useDateStore,
} from 'store';
import { getDateParts } from 'utils';

export const OldStationTable = () => {
  const { updateDate, resetDate } = useDateStore();
  const oldStationDaily = useDateStore((state) => state.dates.oldStationDaily);

  const { year, month, day } = getDateParts(oldStationDaily);

  const [orderBy, setOrderBy] = useState({
    value: 'date',
    order: 'DESC',
  });

  const limit = 30;

  const lastDate = new Date(2012, 7, 22);

  const { data: oldStation } = useGetOldStation({
    start: getDaysFromNow(oldStationDaily, lastDate),
    limit,
    orderBy: orderBy.value,
    sort: orderBy.order,
    requestType: 'amount',
  });

  const setDate = (period: PeriodType, step: StepType) => {
    updateDate(
      MeteoDates.OLD_STATION_DAILY,
      changeDate(MeteoDates.OLD_STATION_DAILY, oldStationDaily, period, step)
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

  const printoldStation = () => {
    const output: React.JSX.Element[] = [];
    if (oldStation?.length) {
      oldStation?.forEach((one, index) => {
        output.push(
          <tr key={index}>
            <td className={TableStyle.link}>{one.date}</td>
            {/*<td className="link" >{one.date}</td>*/}

            <td style={rgbCss(0, 255, 0, one.wind3 / 1285)}>{one.wind3}</td>
            <td style={rgbCss(0, 255, 0, one.wind6 / 500)}>{one.wind6}</td>
            <td style={rgbCss(0, 255, 0, one.wind9 / 100)}>{one.wind9}</td>
            <td style={rgbCss(0, 255, 0, one.wind12 / 100)}>{one.wind12}</td>
            <td style={rgbCss(0, 255, 0, one.windmax / 30)}>{one.windmax}</td>
            <td>{one.direct}</td>

            <td style={rgbCssT(one.tempmin)}>{one.tempmin}</td>
            <td style={rgbCssT(one.tempavg)}>{one.tempavg}</td>
            <td style={rgbCssT(one.tempmax)}>{one.tempmax}</td>

            <td style={rgbCss(255, 0, 255, one.rain / 30)}>{one.rain}</td>
          </tr>
        );
      });
    }
    return output;
  };
  const sort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clickedName = (e.target as HTMLButtonElement).id;
    setOrderBy({
      value: clickedName,
      order: orderBy.order === 'DESC' ? 'ASC' : 'DESC',
    });
  };

  return (
    <>
      <Header id='detail_graphs'>
        <DateChangeBlock setDate={setDate} period='day' text={day} />.
        <DateChangeBlock setDate={setDate} period='month' text={month} />.
        <DateChangeBlock setDate={setDate} period='year' text={year} />.
        <DateButton onClick={() => resetDate(MeteoDates.OLD_STATION_DAILY)}>
          Reset
        </DateButton>
      </Header>
      <section className={TableStyle.davisTable}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th colSpan={6}>vítr</th>
              <th colSpan={3}>teplota vzduchu</th>
              <th colSpan={1}>srážky</th>
            </tr>
            <tr>
              <th>
                <button id='date' onClick={sort}>
                  datum
                </button>
              </th>
              <th>
                <button id='wind3' onClick={sort}>
                  &gt;3<sub id='wind3'>m/s</sub>
                </button>
              </th>
              <th>
                <button id='wind6' onClick={sort}>
                  &gt;6<sub id='wind6'>m/s</sub>
                </button>
              </th>
              <th>
                <button id='wind9' onClick={sort}>
                  &gt;9<sub id='wind9'>m/s</sub>
                </button>
              </th>
              <th>
                <button id='wind12' onClick={sort}>
                  &gt;12<sub id='wind12'>m/s</sub>
                </button>
              </th>
              <th>
                <button id='windmax' onClick={sort}>
                  max
                </button>
              </th>
              <th>
                <button id='direct' onClick={sort}>
                  směr
                </button>
              </th>

              <th>
                <button id='tempmin' onClick={sort}>
                  min
                </button>
              </th>
              <th>
                <button id='tempavg' onClick={sort}>
                  prů
                </button>
              </th>
              <th>
                <button id='tempmax' onClick={sort}>
                  max
                </button>
              </th>

              <th>
                <button id='rain' onClick={sort}>
                  celk
                </button>
              </th>
            </tr>
            <tr>
              <th>graf</th>
              <th>min</th>
              <th>min</th>
              <th>min</th>
              <th>min</th>
              <th>m/s</th>
              <th>-</th>

              <th>&deg;C</th>
              <th>&deg;C</th>
              <th>&deg;C</th>

              <th>mm</th>
            </tr>
          </thead>
          <tbody>{printoldStation()}</tbody>
        </table>
      </section>
    </>
  );
};
