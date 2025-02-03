import { AlertBox } from 'components/AlertBox/AlertBox';
import { useAlert } from 'features/alert';
import { PasswordRequest, useAlarmPassword } from 'features/meteoalarm';
import React, { useState } from 'react';

import { Article, Header, Section, Submit } from '../css';

export const ForgetPassword = () => {
  const { mutate: sendPassword } = useAlarmPassword();

  const { alert, setAlert } = useAlert();

  const [id, setId] = useState<PasswordRequest>({
    identification: '',
  });

  const getPasw = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id.identification) {
      setAlert({
        header: 'Uživatelské jméno / email',
        text: 'vyplňte údaje',
      });
      return null;
    }

    if (!/^[a-zA-Z0-9.\-_@]{3,}$/.test(id.identification)) {
      setAlert({
        header: 'Špatné uživatelské jméno / email',
        text: 'vyplňte údaje',
      });
      return null;
    }

    sendPassword(id, {
      onSuccess: (resp) => {
        if (typeof resp.sms_pasw === 'string') {
          if (resp.sms_pasw === 'error') {
            setAlert({
              header: 'Error !',
              text: 'heslo se nepodařilo odeslat...',
            });
          }
          if (resp.sms_pasw === 'password_sent') {
            setAlert({
              header: 'Heslo bylo odesláno na email:',
              text: `${resp.email}...`,
              color: 'lime',
            });
          }
          return null;
        }
        setAlert({ header: 'unknown Error !', text: 'try later...' });
      },
      onError: (err) => {
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
      },
    });
  };

  return (
    <Article>
      <Header>Zapomenuté heslo</Header>
      <form onSubmit={getPasw}>
        <Section>
          <label htmlFor='identification'>
            Zadeje uživatelské jméno, nebo email
          </label>
          <input
            name='identification'
            placeholder='Username or Email...'
            onChange={(e) => setId({ identification: e.target.value })}
            value={id.identification}
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
