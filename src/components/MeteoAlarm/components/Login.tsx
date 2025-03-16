import { AlertBox } from 'components/AlertBox/AlertBox';
import { useAlert } from 'features/alert';
import { MeteoFilesEnum, useGetTextFile } from 'features/meteo';
import { useAlarmLogin, useGetAlarmCounter } from 'features/meteoalarm';
import { useState } from 'react';

import { Article, Header, Section, Submit } from '../css';

export const Login = () => {
  const { data: counter } = useGetAlarmCounter();
  const { data: showOnPhone } = useGetTextFile(MeteoFilesEnum.DATA_DAVIS);
  const { data: showRainOnPhone } = useGetTextFile(
    MeteoFilesEnum.DATA_DAVIS_JSON
  );
  const { mutate: login } = useAlarmLogin();
  const { alert, setAlert } = useAlert();
  const [loginParams, setLoginParams] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const getData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loginParams.username || !loginParams.password) {
      setAlert({
        header: 'Uživatelské jméno / heslo',
        text: 'vyplňte údaje',
      });
      return null;
    }

    if (!/^[a-zA-Z0-9\-_]{3,10}$/.test(loginParams.username)) {
      setAlert({
        header: 'Špatné jméno',
        text: 'zadejte 3 až 10 znaků (0-9 a..z A..Z - _ )',
      });
      return null;
    }

    if (!/^[a-zA-Z0-9.\-_]{3,10}$/.test(loginParams.password)) {
      setAlert({
        header: 'Špatné heslo!',
        text: 'zadejte 3 až 10 znaků (0-9 a..z A..Z - . _ )',
      });
      return null;
    }

    if (loginParams.username && loginParams.password) {
      login(loginParams, {
        onError: () => {
          setAlert({
            header: 'Přihlášení se nepovedlo !',
            text: 'zkuste později...',
          });
        },
      });
    }
  };

  const getLastWindText = () =>
    showOnPhone?.split(/(?=Vitr)/)[1].split('_')[0] || 'wind loading...';

  const getLastRainText = () => {
    if (!showRainOnPhone) {
      return 'rain loading...';
    }
    const { raincelk, Rain_rate_max } = JSON.parse(showRainOnPhone);
    return `todayRain : ${raincelk}mm, todayRainMaxRate : ${Rain_rate_max}mm/h, LIPNO.net`;
  };

  return (
    <Article>
      <Header>Přihlášení uživatele</Header>
      <form onSubmit={getData}>
        <Section>
          <label>Zadejte uživatelské jméno</label>
          <input
            type='text'
            placeholder='Username or Email...'
            onChange={(e) =>
              setLoginParams((current) => ({
                ...current,
                username: e.target.value,
              }))
            }
            value={loginParams.username}
          />
        </Section>
        <Section>
          <label>Zadejte heslo</label>
          <input
            style={{ width: '70%' }}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password...'
            onChange={(e) =>
              setLoginParams((current) => ({
                ...current,
                password: e.target.value,
              }))
            }
            value={loginParams.password}
            autoComplete='on'
          />
          <span
            onMouseOver={() => setShowPassword(true)}
            onMouseOut={() => setShowPassword(false)}
          >
            Show
          </span>
        </Section>
        {alert.header ? <AlertBox alert={alert} /> : null}
        <Submit>
          <button>Přihlásit</button>
        </Submit>
      </form>
      <header style={{ textAlign: 'center' }}>
        Počet uživatelů: {counter?.count || 'loading...'}
      </header>
      <Section>
        <label>Zobrazení větru na mobilu / emailu:</label>
        <code>
          From: 4f@lipno.net
          <br />
          Text: {getLastWindText()}
        </code>
      </Section>
      <Section>
        <label>Zobrazení deště na mobilu / emailu:</label>
        <code>
          From: 4f@lipno.net
          <br />
          Text: {getLastRainText()}
        </code>
      </Section>
    </Article>
  );
};
