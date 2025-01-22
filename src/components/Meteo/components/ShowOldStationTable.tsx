import { useContext, useEffect, useState, useRef } from 'react';
import TableStyle from './../css/Table.module.css';
import { DateContext } from './DateContext';
import { rgbCssType } from './TypeDefinition';
import React from 'react';
import { useGetOldStation } from 'src/features/meteo';

export const ShowOldStationTable = () => {
  const { reduceDate } = useContext(DateContext);
  const reduceDateRef = useRef(reduceDate);

  const [orderBy, setOrderBy] = useState<{
    value: string;
    order: 'DESC' | 'ASC';
  }>({
    value: 'date',
    order: 'DESC',
  });

  const limit = 30;

  const [start, setStart] = useState(0);

  const { data: oldStation } = useGetOldStation({
    start,
    limit,
    orderBy: orderBy.value,
    sort: orderBy.order,
    requestType: 'amount',
  });

  useEffect(() => {
    if (oldStation?.length) {
      const [year, month, day] = oldStation[0].date.split('-');
      const clickedDate = new Date(+year, +month - 1, +day);
      reduceDateRef.current('daily', clickedDate);
    }
  }, [start, orderBy, oldStation]);

  const rgbCss: rgbCssType = (r, g, b, value) => {
    return { background: `rgba(${r}, ${g}, ${b}, ${value})` };
  };
  const rgbCssT = (value: number) => {
    return value > 0
      ? { background: `rgba(255, 0, 0, ${value / 35})` }
      : { background: `rgba(0, 0, 255, ${-value / 25})` };
  };

  const printoldStation = () => {
    const output: React.JSX.Element[] = [];
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
    return output;
  };
  const sort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clickedName = (e.target as HTMLButtonElement).id;
    console.log(e.target);
    setOrderBy({
      value: clickedName,
      order: orderBy.order === 'DESC' ? 'ASC' : 'DESC',
    });
  };

  return (
    <>
      <header className='header'>
        Historie : &nbsp;
        <button
          onClick={() => setStart(start <= 4045 - 365 ? start + 365 : start)}
        >
          {' '}
          &nbsp; {'<<'} &nbsp;{' '}
        </button>
        <button
          onClick={() => setStart(start <= 4045 - 30 ? start + 30 : start)}
        >
          {' '}
          &nbsp; {'<'} &nbsp;{' '}
        </button>
        &nbsp; {start} &nbsp;
        <button onClick={() => setStart(start >= 30 ? start - 30 : start)}>
          {' '}
          &nbsp; {'>'} &nbsp;{' '}
        </button>
        <button onClick={() => setStart(start >= 365 ? start - 365 : start)}>
          {' '}
          &nbsp; {'>>'} &nbsp;{' '}
        </button>
        &nbsp; dní
      </header>
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
