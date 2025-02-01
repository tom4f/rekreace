import {
  ALARM_LOGIN_SESSION_CONFIG,
  AlarmResponse,
  useAlarmConfig,
  useUpdateAlarm,
} from 'features/meteoalarm';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import { Article, Header, Section, Submit } from '../css';
import { AlertBox, Delay } from './';
interface AlertTypes {
  header: string;
  text: string;
  color?: string;
}
type ChangeType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type HandleItemType = {
  items: AlarmResponse;
  setItems: Dispatch<SetStateAction<AlarmResponse>>;
};

export type HandleItemType2 = {
  items: AlarmResponse;
  change: (e: ChangeType) => void;
};

export const ShowValues = () => {
  const { mutate: updateAlarm } = useUpdateAlarm();
  const { data } = useAlarmConfig();
  const [alert, setAlert] = useState<AlertTypes>({ header: '', text: '' });
  const [items, setItems] = useState(data);
  const [passwordAgain, setPasswordAgain] = useState(
    items?.password?.toString()
  );

  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordAgainRef = useRef<HTMLInputElement>(null);

  Delay(alert, setAlert);

  const handleMouse = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = (event.target as HTMLSpanElement).dataset.input;
    const inputType = event.type === 'mouseover' ? 'text' : 'password';

    if (target === 'password' && passwordRef.current) {
      passwordRef.current.type = inputType;
    }
    if (target === 'passwordAgain' && passwordAgainRef.current) {
      passwordAgainRef.current.type = inputType;
    }
  };

  if (!items) {
    return null;
  }

  const change = (e: ChangeType) =>
    setItems((orig) => {
      const { name, value: origValue } = e.target;

      let value: string | number = '';

      const numericFields = ['todayRainLimit', 'sms'];

      if (name === 'todayRainSent') {
        value = (e.target as HTMLInputElement).checked ? 1 : 0;
      } else if (numericFields.includes(name)) {
        value = +origValue;
      } else {
        value = origValue;
      }

      return { ...orig, [name]: value };
    });

  const updateData = () => {
    updateAlarm(items, {
      onSuccess: (successResponse) => {
        if (successResponse.smsResult === 'value_changed') {
          setAlert({
            header: 'Success !',
            text: 'data updated...',
            color: 'lime',
          });
          sessionStorage.setItem(
            ALARM_LOGIN_SESSION_CONFIG,
            JSON.stringify(items)
          );
        }
      },
      onError: () => {
        setAlert({
          header: 'Error...other...',
          text: 'Please try later...',
        });
      },
    });
  };

  const sendEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordAgain !== items.password) {
      setAlert({
        header: 'Špatné heslo!',
        text: 'zadejte 2x stejné heslo',
      });
      return null;
    }
    if (!/^[a-zA-Z0-9.\-_]{3,10}$/.test(items.password)) {
      setAlert({
        header: 'Špatné heslo!',
        text: 'zadejte 3 až 10 znaků (0-9 a..z A..Z - . _ )',
      });
      return null;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(items.email)) {
      setAlert({ header: 'Špatný email', text: 'zadejte platný email' });
      return null;
    }

    updateData();
  };

  const conditions = [
    'neděle',
    'pondělí',
    'úterý',
    'středa',
    'čtvrtek',
    'pátek',
    'sobota',
    '[1] jedna zpráva za den',
    '[2] dnešní zpráva již poslána',
    'jen při sílící tendenci, vypíná [1] a [2]',
  ];

  return (
    <Article>
      <Header>
        Administrace - <small>uživatel :</small> {items.username}{' '}
      </Header>
      <form onSubmit={sendEdit}>
        <Section>
          <label>Nastavení větru</label>
          <ul>
            {conditions.map((conditionText, conditionBit) => {
              const conditionNumber = 1 << conditionBit;
              const isChecked = !!(items.days & conditionNumber);
              return (
                <li key={conditionBit}>
                  <input
                    type='checkbox'
                    name={conditionBit.toString()}
                    onChange={() =>
                      setItems((config) => ({
                        ...config,
                        days: config.days ^ conditionNumber,
                      }))
                    }
                    checked={isChecked}
                  />
                  {conditionText}
                </li>
              );
            })}
          </ul>
        </Section>
        <Section>
          <label htmlFor='wind-speed-select'>Limit větru</label>
          <select
            name='sms'
            id='wind-speed-select'
            value={items.sms}
            onChange={change}
          >
            {Array.from({ length: 14 }, (_, index) => {
              const value = index + 4;
              return (
                <option key={value} value={value}>
                  {value < 17 ? `> ${value} m/s` : '- vypnuto -'}
                </option>
              );
            })}
          </select>
        </Section>
        <Section>
          <label htmlFor='rain-limit-select'>Limit deště (dnes)</label>
          <select
            name='todayRainLimit'
            id='rain-limit-select'
            value={items.todayRainLimit}
            onChange={change}
          >
            {Array.from({ length: 14 }, (_, index) => (
              <option key={index} value={index}>
                {index > 0 ? `> ${index} mm` : '- vypnuto -  '}
              </option>
            ))}
          </select>
        </Section>
        <Section>
          <label>Nastavení deště</label>
          <ul>
            <li>
              <input
                name='todayRainSent'
                type='checkbox'
                onChange={change}
                checked={!!items.todayRainSent}
              />
              dnešní zpráva již poslána
            </li>
          </ul>
        </Section>
        <Section>
          <label>Heslo:</label>
          <input
            style={{ width: '70%' }}
            name='password'
            ref={passwordRef}
            type='password'
            placeholder='heslo...'
            onChange={change}
            value={items.password}
            autoComplete='on'
          />
          <span
            data-input='password'
            onMouseOver={handleMouse}
            onMouseOut={handleMouse}
          >
            Show
          </span>
          <input
            style={{ width: '70%' }}
            ref={passwordAgainRef}
            type='password'
            placeholder='heslo znovu...'
            onChange={(e) => setPasswordAgain(e.target.value)}
            value={passwordAgain}
            autoComplete='on'
          />
          <span
            data-input='passwordAgain'
            onMouseOver={handleMouse}
            onMouseOut={handleMouse}
          >
            Show
          </span>
        </Section>
        <Section>
          <label>Celé jméno:</label>
          <input
            name='name'
            placeholder='Full Name...'
            onChange={change}
            value={items.name}
          />
        </Section>
        <Section>
          <label>E-mail</label>
          <input
            name='email'
            placeholder='Email...'
            onChange={change}
            value={items.email}
          />
        </Section>
        {alert.header && <AlertBox alert={alert} />}
        <Submit>
          <button>Odeslat</button>
        </Submit>
      </form>
    </Article>
  );
};
