import './css/status.css';

import { Header } from 'components/Atoms';
import { useGetBooking } from 'features/booking';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from 'src/store';

import { ShowTable } from './ShowTable';

export const Status = () => {
  const { isLogged, user } = useAuthStore();
  const { pathname } = useLocation();
  const { isSuccess, data: formResult } = useGetBooking();

  const lastUpdate = () => {
    if (!isSuccess || !formResult.length) return '?';

    const lastUpdateLong = formResult.reduce((lastUpdateAccumulator, week) => {
      return lastUpdateAccumulator.localeCompare(week.lastUpdate) > 0
        ? lastUpdateAccumulator
        : week.lastUpdate;
    }, '0000-01-01 00:00:00');

    return lastUpdateLong.slice(0, 10).split('-').reverse().join('.');
  };

  return (
    <>
      <Header>
        Aktuální obsazenost
        {pathname === '/objednavka/edit' && isLogged && ` - Uživatel: ${user}`}
      </Header>
      <div className='booking_status'>
        <ShowTable />
        <div className='booking_info'>
          Poslední změna : {lastUpdate()}
          <br />
          Pro zamluvení termínu použijte&nbsp;
          <a className='menu' href='#1'>
            závaznou objednávku
          </a>
          ] nebo [
          <a className='menu' href='mailto:ubytovani@lipnonet.cz'>
            email
          </a>
          ]
          <br />
          Popis : [
          <NavLink className='menu' to='/apartmany'>
            Apartmá č.1
          </NavLink>
          ] [
          <NavLink className='menu' to='/apartmany'>
            Apartmá č.2
          </NavLink>
          ] [
          <NavLink className='menu' to='/apartmany'>
            Apartmá č.3
          </NavLink>
          ] a [
          <NavLink className='menu' to='/ceny'>
            CENÍK
          </NavLink>
          ]
          <br />
          Žluté a zelené plochy odpovídají již obsazeným termínům (týdnům).
          <br />
          Šedé plochy odpovídají částečně obsazeným týdnům.
          <br />
          Červené termíny = mimo provoz.
          <br />
          Ostatní termíny jsou stále volné.
          <br />
          Ubytování samozřejmě poskytujeme po celý rok.
          <br />
          Průběžně aktualizováno.
        </div>
      </div>
    </>
  );
};
