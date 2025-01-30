import {
  ALARM_LOGIN_SESSION_CONFIG,
  useAlarmConfig,
  useUpdateAlarm,
} from 'features/meteoalarm';
import React, { useRef, useState } from 'react';

import {
  AlertBox,
  Delay,
  ShowTodayRainLimit,
  ShowWindDays,
  ShowWindSpeed,
} from './';

interface AlertTypes {
  header: string;
  text: string;
  color?: string;
}
type ChangeType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export const ShowValues = () => {
  const { mutate: updateAlarm } = useUpdateAlarm();
  const { data } = useAlarmConfig();
  const [alert, setAlert] = useState<AlertTypes>({ header: '', text: '' });
  Delay(alert, setAlert);

  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordAgainRef = useRef<HTMLInputElement>(null);

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

  const [items, setItems] = useState(data);

  const [passwordAgain, setPasswordAgain] = useState(
    items?.password?.toString()
  );

  if (!items) {
    return null;
  }
  const change = (e: ChangeType) =>
    setItems((orig) => {
      if (!orig) {
        return orig;
      }

      const value =
        e.target.name === 'todayRainSent'
          ? (e.target as HTMLInputElement).checked
            ? 1
            : 0
          : e.target.value;

      return { ...orig, [e.target.name]: value };
    });

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
        {items && <ShowWindSpeed items={items} setItems={setItems} />}

        <ShowTodayRainLimit items={items} setItems={setItems} />
        <section className='input-section'>
          <label>Nastavení deště</label>
          <ul>
            <li>
              <label>
                <input
                  name='todayRainSent'
                  type='checkbox'
                  onChange={change}
                  checked={!!items.todayRainSent}
                />
                dnešní zpráva již poslána
              </label>
            </li>
          </ul>
        </section>

        <section className='input-section password'>
          <label>Heslo:</label>
          <br />
          <input
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
        </section>

        <section className='input-section'>
          <label>Celé jméno:</label>
          <input
            name='name'
            placeholder='Full Name...'
            onChange={change}
            value={items.name}
          />
        </section>

        <section className='input-section'>
          <label>E-mail</label>
          <input
            name='email'
            placeholder='Email...'
            onChange={change}
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
