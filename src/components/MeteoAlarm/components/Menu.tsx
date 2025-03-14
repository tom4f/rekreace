import { useAlarmConfig, useAlarmLogout } from 'features/meteoalarm';
import { ActiveMenu } from 'pages/MeteoAlarm';
import { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

import { TopBar } from '../css';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface HeaderTypes {
  setActiveMenu: Dispatcher<ActiveMenu>;
}

export const Menu = ({ setActiveMenu }: HeaderTypes) => {
  const { data: config } = useAlarmConfig();
  const { removeSession, invalidateQuery } = useAlarmLogout();

  const logout = () => {
    removeSession();
    invalidateQuery();
  };

  return (
    <TopBar>
      <span>
        <NavLink to='/'>Zpět</NavLink>
      </span>

      {config?.isLogged ? (
        <>
          <span onClick={() => setActiveMenu('values')}>nastavení</span>
          <span onClick={logout}>odhlášení</span>
        </>
      ) : (
        <>
          <span onClick={() => setActiveMenu('login')}>přihlášení</span>
          <span onClick={() => setActiveMenu('forget')}>zapomenuté heslo?</span>
          <span onClick={() => setActiveMenu('new')}>registrace</span>
        </>
      )}

      <span onClick={() => setActiveMenu('about')}>info</span>
    </TopBar>
  );
};
