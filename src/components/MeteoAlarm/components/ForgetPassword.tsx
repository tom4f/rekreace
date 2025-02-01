import { Url } from 'api/paths';
import axios from 'axios';
import React, { useState } from 'react';

import { Article, Header, Section, Submit } from '../css';
import { AlertBox, Delay } from './AlertBox';

export const ForgetPassword: React.FC = (): React.ReactElement => {
  interface alertTypes {
    header: string;
    text: string;
    color?: string;
  }
  const [alert, setAlert] = useState<alertTypes>({ header: '', text: '' });

  Delay(alert, setAlert);

  const [identification, setIdentification] = useState('');

  const getPasw = () => {
    if (!identification) {
      setAlert({
        header: 'Uživatelské jméno / email',
        text: 'vyplňte údaje',
      });
      return null;
    }

    if (!/^[a-zA-Z0-9.\-_@]{3,}$/.test(identification)) {
      setAlert({
        header: 'Špatné uživatelské jméno / email',
        text: 'vyplňte údaje',
      });
      return null;
    }

    axios
      .post(
        `${Url.API}/pdo_sms_pasw.php`,
        { identification },
        { timeout: 5000 }
      )
      .then((res) => {
        const resp = res.data[0] || res.data;

        console.log(typeof resp.sms_pasw);

        if (typeof resp.sms_pasw === 'string') {
          resp.sms_pasw === 'error' &&
            setAlert({
              header: 'Error !',
              text: 'heslo se nepodařilo odeslat...',
            });
          resp.sms_pasw === 'password_sent' &&
            setAlert({
              header: 'Heslo bylo odesláno na email:',
              text: `${resp.email}...`,
              color: 'lime',
            });
          return null;
        }
        setAlert({ header: 'unknown Error !', text: 'try later...' });
      })
      .catch((err) => {
        if (err.response) {
          setAlert({
            header: 'Failed !',
            text: 'error response (5xx, 4xx)',
          });
          console.log(err.response);
        } else if (err.request) {
          setAlert({
            header: 'Failed !',
            text: 'never received a response, or request never left',
          });
          console.log(err.request);
        } else {
          setAlert({
            header: 'Failed !',
            text: 'Error: anything else',
          });
          console.log(err);
        }
      });
  };

  return (
    <Article>
      <Header>Zapomenuté heslo</Header>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          getPasw();
        }}
      >
        <Section>
          <label>Zadeje uživatelské jméno, nebo email</label>
          <input
            placeholder='Username or Email...'
            onChange={(e) => setIdentification(e.target.value)}
            value={identification}
          />
        </Section>
        {alert.header ? <AlertBox alert={alert} /> : null}
        <Submit>
          <button>Odeslat</button>
        </Submit>
      </form>
    </Article>
  );
};
