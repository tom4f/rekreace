import { AlertBox } from 'components/AlertBox/AlertBox';
import { useAlert } from 'features/alert';
import { useAlarmPassword } from 'features/meteoalarm';
import { useActionState } from 'react';

import { Article, Header, Section, Submit } from '../css';

export const ForgetPassword = () => {
  const { mutate: sendPassword, isPending } = useAlarmPassword();
  const { alert, setAlert } = useAlert();

  const requestPasw = async (_: void, formData: FormData) => {
    const identification = formData.get('identification') as string;

    if (!/^[a-zA-Z0-9.\-_@]{3,}$/.test(identification)) {
      return setAlert({
        header: 'Špatné uživatelské jméno / email',
        text: 'vyplňte údaje',
      });
    }

    sendPassword(
      { identification },
      {
        onSuccess: (resp) => {
          if (typeof resp.sms_pasw === 'string') {
            if (resp.sms_pasw === 'error') {
              setAlert({
                header: 'Error !',
                text: 'heslo se nepodařilo odeslat...',
              });
            }
            if (resp.sms_pasw === 'password_sent') {
              console.log(resp);
              setAlert({
                header: 'Heslo bylo odesláno na email:',
                text: `${resp.email}...`,
                color: 'lime',
              });
              return null;
            }
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
      }
    );

    return;
  };

  const [, formAction] = useActionState(requestPasw, undefined);

  return (
    <Article>
      <Header>Zapomenuté heslo</Header>
      <form action={formAction}>
        <Section>
          <label htmlFor='identification'>
            Zadeje uživatelské jméno, nebo email
          </label>
          <input
            disabled={isPending}
            name='identification'
            placeholder='Username or Email...'
          />
        </Section>
        <Submit>
          <button disabled={isPending} type='submit'>
            {isPending ? 'Odesílám...' : 'Odeslat'}
          </button>
        </Submit>
        {<AlertBox alert={alert} />}
      </form>
    </Article>
  );
};
