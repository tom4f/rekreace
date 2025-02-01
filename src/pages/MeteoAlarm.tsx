import {
  About,
  ForgetPassword,
  LoginPage,
  MainHeader,
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
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('values');

  useEffect(() => {
    setActiveMenu((prevMenu) =>
      config?.isLogged ? (prevMenu === 'login' ? 'values' : prevMenu) : 'login'
    );
  }, [config?.isLogged]);

  return (
    <div
      style={{
        backgroundImage: `url(${windsurfImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <Menu setActiveMenu={setActiveMenu} />
      <MainHeader>Lipno Meteo Alarm</MainHeader>
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
