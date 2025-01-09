import { useLocation } from 'react-router-dom';
import { useGetBooking } from '../../../../features/booking';
import { useLoginStatus } from '../../../../features/login/hooks/useGetLoginStatus';
import './css/status.css';
import { ShowTable } from './ShowTable';
import { NavLink } from 'react-router-dom';

export const Status = () => {
  const { data: loginData } = useLoginStatus();
  const { pathname } = useLocation();
  const { isSuccess, isError, data: formResult } = useGetBooking();

  const lastUpdate = () => {
    if (!isSuccess) return '?';

    const lastUpdateLong = formResult.reduce((lastUpdateAccumulator, week) => {
      return lastUpdateAccumulator.localeCompare(week.lastUpdate) > 0
        ? lastUpdateAccumulator
        : week.lastUpdate;
    }, '0000-01-01 00:00:00');

    return lastUpdateLong.slice(0, 10).split('-').reverse().join('.');
  };

  return (
    <>
      <div className='header' id='user-logged-in'>
        Aktuální obsazenost
        {pathname === '/objednavka/edit' &&
          loginData?.isLogged &&
          ` - Uživatel: ${loginData?.webUser}`}
      </div>
      <div className='booking_status'>
        <div
          className='form_result_alert edit_alert'
          id='form_edit_alert'
        ></div>
        {isError && <>Něco se pokazilo, zkuste to prosím později.</>}
        <ShowTable />
        <div className='booking_info'>
          Poslední změna : {lastUpdate()}
          <span id='last_booking_update'></span>
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
