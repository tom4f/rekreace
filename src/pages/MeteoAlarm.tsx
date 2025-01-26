import 'components/MeteoAlarm/css/index.css';

import React, { useState } from 'react';
import About from 'components/MeteoAlarm/components/About';
import ForgetPassword from 'components/MeteoAlarm/components/ForgetPassword';
import LoginPage from 'components/MeteoAlarm/components/LoginPage';
import Menu from 'components/MeteoAlarm/components/Menu';
import NewUser from 'components/MeteoAlarm/components/NewUser';
import ShowValues from 'components/MeteoAlarm/components/ShowValues';
import windsurfImg from 'src/images/windsurf.jpg';

export const MeteoAlarm: React.FC = () => {
  const initItems = {
    date: '',
    days: 0,
    email: '',
    id: 0,
    name: '',
    password: '',
    sms: 0,
    username: '',
    todayRainLimit: 0,
    todayRainSent: 0,
  };

  const initShow = {
    login: false,
    forget: false,
    new: false,
    about: false,
    values: false,
  };

  const [items, setItems] = useState(initItems);
  const [origSettings, setOrigSettings] = useState(initItems);
  const [isLogged, setIsLogged] = useState(false);
  const [showStatus, setShowStatus] = useState({ ...initShow, login: true });

  const loginStatus = (status: boolean): void => {
    setIsLogged(status);
    setShowStatus({ ...initShow, values: status, login: !status });
  };

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
      <Menu
        isLogged={isLogged}
        showStatus={showStatus}
        setShowStatus={setShowStatus}
        loginStatus={loginStatus}
        initShow={initShow}
      />
      <header className='header-main'>Lipno Meteo Alarm</header>
      <div>
        {showStatus.values ? (
          <ShowValues
            items={items}
            setItems={setItems}
            origSettings={origSettings}
            setOrigSettings={setOrigSettings}
          />
        ) : null}

        {showStatus.login ? (
          <LoginPage
            setOrigSettings={setOrigSettings}
            setItems={setItems}
            loginStatus={loginStatus}
          />
        ) : null}
        {showStatus.forget ? <ForgetPassword /> : null}
        {showStatus.new ? <NewUser /> : null}
        {showStatus.about ? <About /> : null}
      </div>
    </div>
  );
};
