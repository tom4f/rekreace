import { Url } from 'api/paths';
import axios from 'axios';
import { useAlarmLogin } from 'features/meteoalarm';
import { useEffect, useState } from 'react';

import { Article, Header, Section, Submit } from '../css';
import { AlertBox, Delay } from './AlertBox';

export const LoginPage = () => {
  const [loginParams, setLoginParams] = useState({
    username: '',
    password: '',
  });

  const { mutate: login } = useAlarmLogin();

  interface alertTypes {
    header: string;
    text: string;
    color?: string;
  }
  const [alert, setAlert] = useState<alertTypes>({ header: '', text: '' });

  Delay(alert, setAlert);

  const [showPassword, setShowPassword] = useState(false);
  const [showOnPhone, setShowOnPhone] = useState('');
  const [showRainOnPhone, setShowRainOnPhone] = useState('');

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
      login(loginParams);
    }
  };

  const [counter, setCounter] = useState(0);

  const getCounter = () => {
    axios
      .post(`${Url.API}/pdo_sms_counter.php`)
      .then((res) => {
        const resp = res.data[0] || res.data;
        setCounter(resp.count);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          // anything else
        }
      });
  };

  useEffect(getCounter, []);

  const getLastSmsData = () => {
    fetch(`${Url.DAVIS}/data_davis.txt`)
      .then((res) => res.text())
      .then((lastData) => {
        const limitedText = lastData.split(/(?=Vitr)/)[1].split('_')[0];
        setShowOnPhone(limitedText);
      })
      .catch((error) => console.log(error));
  };

  useEffect(getLastSmsData, []);

  const getLastRainData = () => {
    fetch(`${Url.DAVIS}/data_davis_json.txt`)
      .then((res) => res.text())
      .then((lastData) => {
        const { raincelk, Rain_rate_max } = JSON.parse(lastData);

        setShowRainOnPhone(
          `todayRain : ${raincelk}mm, todayRainMaxRate : ${Rain_rate_max}mm/h, LIPNO.net`
        );
      })
      .catch((error) => console.log(error));
  };

  useEffect(getLastRainData, []);

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
        Počet uživatelů: {counter}
      </header>
      <Section>
        <label>Zobrazení větru na mobilu / emailu:</label>
        <code className='smsText'>
          From: 4f@lipno.net
          <br />
          Text: {showOnPhone}
        </code>
      </Section>
      <Section>
        <label>Zobrazení deště na mobilu / emailu:</label>
        <code className='smsText'>
          From: 4f@lipno.net
          <br />
          Text: {showRainOnPhone}
        </code>
      </Section>
    </Article>
  );
};
