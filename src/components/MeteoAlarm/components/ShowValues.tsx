import {
  ALARM_LOGIN_SESSION_CONFIG,
  useAlarmConfig,
  useUpdateAlarm,
} from 'features/meteoalarm';
import React, { useState } from 'react';

import {
  AlertBox,
  Delay,
  ShowRainConfig,
  ShowTodayRainLimit,
  ShowWindDays,
  ShowWindSpeed,
} from './';

interface AlertTypes {
  header: string;
  text: string;
  color?: string;
}

export const ShowValues = () => {
  const { mutate: updateAlarm } = useUpdateAlarm();
  const { data } = useAlarmConfig();
  const [alert, setAlert] = useState<AlertTypes>({ header: '', text: '' });
  Delay(alert, setAlert);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [items, setItems] = useState(data);

  const [passwordAgain, setPasswordAgain] = useState(
    items?.password?.toString()
  );

  const changePassword = (textValue: string) =>
    setItems({ ...items, password: textValue });

  if (!items) {
    return null;
  }

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

  return (
    <article className='container-show-values'>
      <header className='header-label'>
        Administrace -{' '}
        <label>
          <small>uživatel :</small> {items.username}{' '}
        </label>
      </header>

      <form
        onSubmit={(event) => sendEdit(event)}
        name='formular'
        encType='multipart/form-data'
      >
        <ShowWindDays items={items} setItems={setItems} />
        <ShowWindSpeed items={items} setItems={setItems} />
        <ShowTodayRainLimit items={items} setItems={setItems} />
        <ShowRainConfig items={items} setItems={setItems} />
        <section className='input-section password'>
          <label>Heslo:</label>
          <br />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='heslo...'
            onChange={(e) => changePassword(e.target.value)}
            value={items.password}
            autoComplete='on'
          />
          <span
            onMouseOver={() => setShowPassword(true)}
            onMouseOut={() => setShowPassword(false)}
          >
            Show
          </span>
          <input
            type={showPasswordAgain ? 'text' : 'password'}
            placeholder='heslo znovu...'
            onChange={(e) => setPasswordAgain(e.target.value)}
            value={passwordAgain}
            autoComplete='on'
          />
          <span
            onMouseOver={() => setShowPasswordAgain(true)}
            onMouseOut={() => setShowPasswordAgain(false)}
          >
            Show
          </span>
        </section>

        <section className='input-section'>
          <label>Celé jméno:</label>
          <input
            placeholder='Full Name...'
            onChange={(e) => setItems({ ...items, name: e.target.value })}
            value={items.name}
          />
        </section>

        <section className='input-section'>
          <label>E-mail</label>
          <input
            placeholder='Email...'
            onChange={(e) => setItems({ ...items, email: e.target.value })}
            value={items.email}
          />
        </section>
        {alert.header ? <AlertBox alert={alert} /> : null}
        <section className='submit-section'>
          <input type='submit' />
        </section>
      </form>
    </article>
  );
};
