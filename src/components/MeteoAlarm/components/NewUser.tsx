import { AlertBox } from 'components/AlertBox/AlertBox';
import { useAlert } from 'features/alert';
import { RegisterRequest, useAlarmRegister } from 'features/meteoalarm';
import { useState } from 'react';

import { Article, Header, Section, Submit } from '../css';

export const NewUser = () => {
  const { mutate: register } = useAlarmRegister();
  const { alert, setAlert } = useAlert();

  const [newUser, setNewUser] = useState<RegisterRequest>({
    username: '',
    email: '',
  });

  const createUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, email } = newUser;

    if (!username || !email) {
      setAlert({
        header: 'Uživatelské jméno / email',
        text: 'vyplňte údaje',
      });
      return null;
    }

    if (!/^[a-zA-Z0-9.\-_]{3,10}$/.test(username)) {
      setAlert({
        header: 'Špatné uživatelské jméno',
        text: 'vyplňte údaje',
      });
      return null;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setAlert({ header: 'Špatný email', text: 'vyplňte údaje' });
      return null;
    }

    register(newUser, {
      onSuccess: (resp) => {
        if (typeof resp.sms_new === 'string') {
          if (resp.sms_new === 'user_exists') {
            setAlert({ header: 'Error !', text: 'user exists...' });
          }
          if (resp.sms_new === 'email_exists') {
            setAlert({ header: 'Error !', text: 'email exists...' });
          }
          if (resp.sms_new === 'error') {
            setAlert({
              header: 'Error !',
              text: 'heslo se nepodařilo odeslat...',
            });
          }
          if (resp.sms_new === 'user_added') {
            setAlert({
              header: `Heslo pro ${resp.username} odesláno na`,
              text: `${resp.email}...`,
              color: 'lime',
            });
          }
        } else {
          setAlert({
            header: 'unknown Error !',
            text: 'try later...',
          });
        }
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
      <Header>Registrace</Header>
      <form onSubmit={createUser}>
        <Section>
          <label htmlFor='username'>Zadejte uživatelské jméno:</label>
          <input
            id='username'
            placeholder='your new username...'
            onChange={(e) =>
              setNewUser((current) => ({
                ...current,
                username: e.target.value,
              }))
            }
            value={newUser.username}
          />
        </Section>
        <Section>
          <label htmlFor='email'>Zadejte emailovou adresu:</label>
          <input
            id='email'
            placeholder='your email...'
            onChange={(e) =>
              setNewUser((current) => ({
                ...current,
                email: e.target.value,
              }))
            }
            value={newUser.email}
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
