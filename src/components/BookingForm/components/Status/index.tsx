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

/* 
UPDATE `obsazenost` SET `week` = '53' WHERE `obsazenost`.`week` = 52;
UPDATE `obsazenost` SET `week` = '52' WHERE `obsazenost`.`week` = 51;
UPDATE `obsazenost` SET `week` = '51' WHERE `obsazenost`.`week` = 50;

UPDATE `obsazenost` SET `week` = '50' WHERE `obsazenost`.`week` = 49;
UPDATE `obsazenost` SET `week` = '49' WHERE `obsazenost`.`week` = 48;
UPDATE `obsazenost` SET `week` = '48' WHERE `obsazenost`.`week` = 47;
UPDATE `obsazenost` SET `week` = '47' WHERE `obsazenost`.`week` = 46;
UPDATE `obsazenost` SET `week` = '46' WHERE `obsazenost`.`week` = 45;
UPDATE `obsazenost` SET `week` = '45' WHERE `obsazenost`.`week` = 44;
UPDATE `obsazenost` SET `week` = '44' WHERE `obsazenost`.`week` = 43;
UPDATE `obsazenost` SET `week` = '43' WHERE `obsazenost`.`week` = 42;
UPDATE `obsazenost` SET `week` = '42' WHERE `obsazenost`.`week` = 41;
UPDATE `obsazenost` SET `week` = '41' WHERE `obsazenost`.`week` = 40;

UPDATE `obsazenost` SET `week` = '40' WHERE `obsazenost`.`week` = 39;
UPDATE `obsazenost` SET `week` = '39' WHERE `obsazenost`.`week` = 38;
UPDATE `obsazenost` SET `week` = '38' WHERE `obsazenost`.`week` = 37;
UPDATE `obsazenost` SET `week` = '37' WHERE `obsazenost`.`week` = 36;
UPDATE `obsazenost` SET `week` = '36' WHERE `obsazenost`.`week` = 35;
UPDATE `obsazenost` SET `week` = '35' WHERE `obsazenost`.`week` = 34;
UPDATE `obsazenost` SET `week` = '34' WHERE `obsazenost`.`week` = 33;
UPDATE `obsazenost` SET `week` = '33' WHERE `obsazenost`.`week` = 32;
UPDATE `obsazenost` SET `week` = '32' WHERE `obsazenost`.`week` = 31;
UPDATE `obsazenost` SET `week` = '31' WHERE `obsazenost`.`week` = 30;

UPDATE `obsazenost` SET `week` = '30' WHERE `obsazenost`.`week` = 29;
UPDATE `obsazenost` SET `week` = '29' WHERE `obsazenost`.`week` = 28;
UPDATE `obsazenost` SET `week` = '28' WHERE `obsazenost`.`week` = 27;
UPDATE `obsazenost` SET `week` = '27' WHERE `obsazenost`.`week` = 26;
UPDATE `obsazenost` SET `week` = '26' WHERE `obsazenost`.`week` = 25;
UPDATE `obsazenost` SET `week` = '25' WHERE `obsazenost`.`week` = 24;
UPDATE `obsazenost` SET `week` = '24' WHERE `obsazenost`.`week` = 23;
UPDATE `obsazenost` SET `week` = '23' WHERE `obsazenost`.`week` = 22;
UPDATE `obsazenost` SET `week` = '22' WHERE `obsazenost`.`week` = 21;
UPDATE `obsazenost` SET `week` = '21' WHERE `obsazenost`.`week` = 20;

UPDATE `obsazenost` SET `week` = '20' WHERE `obsazenost`.`week` = 19;
UPDATE `obsazenost` SET `week` = '19' WHERE `obsazenost`.`week` = 18;
UPDATE `obsazenost` SET `week` = '18' WHERE `obsazenost`.`week` = 17;
UPDATE `obsazenost` SET `week` = '17' WHERE `obsazenost`.`week` = 16;
UPDATE `obsazenost` SET `week` = '16' WHERE `obsazenost`.`week` = 15;
UPDATE `obsazenost` SET `week` = '15' WHERE `obsazenost`.`week` = 14;
UPDATE `obsazenost` SET `week` = '14' WHERE `obsazenost`.`week` = 13;
UPDATE `obsazenost` SET `week` = '13' WHERE `obsazenost`.`week` = 12;
UPDATE `obsazenost` SET `week` = '12' WHERE `obsazenost`.`week` = 11;
UPDATE `obsazenost` SET `week` = '11' WHERE `obsazenost`.`week` = 10;

UPDATE `obsazenost` SET `week` = '10' WHERE `obsazenost`.`week` = 9;
UPDATE `obsazenost` SET `week` = '9' WHERE `obsazenost`.`week` = 8;
UPDATE `obsazenost` SET `week` = '8' WHERE `obsazenost`.`week` = 7;
UPDATE `obsazenost` SET `week` = '7' WHERE `obsazenost`.`week` = 6;
UPDATE `obsazenost` SET `week` = '6' WHERE `obsazenost`.`week` = 5;
UPDATE `obsazenost` SET `week` = '5' WHERE `obsazenost`.`week` = 4;
UPDATE `obsazenost` SET `week` = '4' WHERE `obsazenost`.`week` = 3;
UPDATE `obsazenost` SET `week` = '3' WHERE `obsazenost`.`week` = 2;
UPDATE `obsazenost` SET `week` = '2' WHERE `obsazenost`.`week` = 1;
UPDATE `obsazenost` SET `week` = '1' WHERE `obsazenost`.`week` = 0; */
