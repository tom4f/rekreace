import { useAlarmConfig } from 'features/meteoalarm';
import { ActiveMenu } from 'pages';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface HeaderTypes {
  setActiveMenu: Dispatcher<ActiveMenu>;
}

export const Menu = ({ setActiveMenu }: HeaderTypes) => {
  const { data: config } = useAlarmConfig();

  return (
    <header className='menu_meteoalarm'>
      <span>
        <NavLink to='/'>Zpět</NavLink>
      </span>

      {!config?.isLogged ? (
        <span onClick={() => setActiveMenu('login')}>přihlášení</span>
      ) : (
        <span onClick={() => setActiveMenu('values')}>nastavení</span>
      )}

      <span onClick={() => console.log('odhlaseni')}>odhlášení</span>
      <span onClick={() => setActiveMenu('forget')}>zapomenuté heslo?</span>
      <span onClick={() => setActiveMenu('new')}>registrace</span>
      <span onClick={() => setActiveMenu('about')}>info</span>
    </header>
  );
};
