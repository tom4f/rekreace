import { useContext, useEffect, useRef, useState } from 'react';
import TableStyle from './../css/Table.module.css';
import { DateContext } from './DateContext';
import { rgbCssType } from './TypeDefinition';
import { Header } from 'src/components/Atoms';
import { useGetPocasi } from 'src/features/meteo';
import { useLoginStatus } from 'src/features/login';

export const ShowYearTable = () => {
  const { reduceDate } = useContext(DateContext);

  const { data: loginData } = useLoginStatus();

  const reduceDateRef = useRef(reduceDate);

  const [orderBy, setOrderBy] = useState<{
    value: string;
    order: 'DESC' | 'ASC';
  }>({
    value: 'datum',
    order: 'DESC',
  });

  const limit = 30;

  const [start, setStart] = useState(0);

  const { data: pocasi } = useGetPocasi({
    start,
    limit,
    requestType: 'amount',
    orderBy: orderBy.value,
    sort: orderBy.order,
  });

  useEffect(() => {
    if (pocasi?.length) {
      const [year, month, day] = pocasi[0].datum.split('-');
      const clickedDate = new Date(+year, +month - 1, +day);
      reduceDateRef.current('yearSum', clickedDate);
    }
  }, [start, orderBy, pocasi]);

  const rgbCss: rgbCssType = (r, g, b, value) => {
    return { background: `rgba(${r}, ${g}, ${b}, ${value})` };
  };
  const rgbCssT = (value: number) => {
    return value > 0
      ? { background: `rgba(255, 0, 0, ${value / 35})` }
      : { background: `rgba(0, 0, 255, ${-value / 25})` };
  };

  const PrintPocasi = () => {
    const output: React.JSX.Element[] = [];
    pocasi?.forEach((one, index) =>
      output.push(
        <tr key={index}>
          <td
            className={loginData.webToken !== 'error' ? TableStyle.datum : ''}
          >
            {one.datum}
          </td>
          <td style={rgbCss(255, 0, 0, 1 - (725 - one.hladina) / 2)}>
            {one.hladina}
          </td>
          <td style={rgbCss(0, 255, 0, one.pritok / 100)}>{one.pritok}</td>
          <td style={rgbCss(0, 255, 0, one.odtok / 100)}>{one.odtok}</td>
          <td style={rgbCss(255, 0, 0, one.voda / 25)}>{one.voda}</td>
          <td style={rgbCssT(one.vzduch)}>{one.vzduch}</td>
          <td>{one.pocasi}</td>
        </tr>
      )
    );
    return output;
  };

  const sort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clickedName = (e.target as HTMLButtonElement).name;
    setOrderBy({
      value: clickedName,
      order: orderBy.order === 'DESC' ? 'ASC' : 'DESC',
    });
  };

  return (
    <>
      <Header>
        Historie : &nbsp;
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() =>
            pocasi?.length === limit ? setStart(start + limit) : null
          }
        >
          {' '}
          &nbsp; {'<'} &nbsp;{' '}
        </button>
        &nbsp; {start} &nbsp;
        <button
          className='text-zinc-500 hover:text-orange-400'
          onClick={() => (start - limit >= 0 ? setStart(start - limit) : null)}
        >
          {' '}
          &nbsp; {'>'} &nbsp;{' '}
        </button>
        &nbsp; dní
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
                <button name='hladina' onClick={(e) => sort(e)}>
                  hladina
                </button>
              </th>
              <th>
                <button name='pritok' onClick={(e) => sort(e)}>
                  přítok
                </button>
              </th>
              <th>
                <button name='odtok' onClick={(e) => sort(e)}>
                  odtok
                </button>
              </th>
              <th>
                <button name='voda' onClick={(e) => sort(e)}>
                  voda
                </button>
              </th>
              <th>
                <button name='vzduch' onClick={(e) => sort(e)}>
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
