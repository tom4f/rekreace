import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ForumResponse, useGetForum } from '../../../features/forum';
import './css/forum.css';

export const Forum = ({
  searchCriteria = '',
  showHeader = true,
}: {
  searchCriteria?: string;
  showHeader?: boolean;
}) => {
  const [items, setItems] = useState<ForumResponse>([]);

  const { data, isSuccess } = useGetForum({
    start: 0,
    limit: 5,
    searchCriteria,
  });

  useEffect(() => {
    if (isSuccess && data.length) {
      setItems(data);
    }
  }, [isSuccess, data]);

  const showForum = () => {
    let knihaUL: any[] = [];
    items.forEach((item) => {
      const { id, datum, text, jmeno, email } = item;
      const [year, month, day] = datum?.split(' ')[0].split('-');
      const mailto = `mailto:${email}`;
      knihaUL.push(
        <li key={id}>
          {day}.{month}.{year}
          &nbsp;
          <b>
            <i>{email ? <a href={mailto}>{jmeno}</a> : <>{jmeno}</>}</i>
          </b>
          &nbsp;{text.slice(0, 80)}
        </li>
      );
    });
    return knihaUL;
  };

  return (
    <>
      {showHeader && (
        <div className='header'>
          <NavLink className='menu' to='/forum?category=8'>
            LIPNO FÓRUM
          </NavLink>
        </div>
      )}

      <section className='kniha-main-page'>
        <ul>{showForum()}</ul>
      </section>
    </>
  );
};
