import 'components/MeteoAlarm/css/index.css';

import {
  About,
  ForgetPassword,
  LoginPage,
  Menu,
  NewUser,
  ShowValues,
} from 'components/MeteoAlarm';
import { useAlarmConfig } from 'features/meteoalarm';
import windsurfImg from 'images/windsurf.jpg';
import { useEffect, useState } from 'react';

export type ActiveMenu = 'login' | 'forget' | 'new' | 'about' | 'values';

export const MeteoAlarm = () => {
  const { data: config } = useAlarmConfig();
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('login');

  useEffect(() => {
    if (config.isLogged) {
      setActiveMenu('values');
    }
  }, [config]);

  return (
    <div
      style={{
        background: `url(${windsurfImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <Menu setActiveMenu={setActiveMenu} />
      <header className='header-main'>Lipno Meteo Alarm</header>
      <div>
        {activeMenu === 'values' && <ShowValues />}
        {activeMenu === 'login' && <LoginPage />}
        {activeMenu === 'forget' && <ForgetPassword />}
        {activeMenu === 'new' && <NewUser />}
        {activeMenu === 'about' && <About />}
      </div>
    </div>
  );
};
