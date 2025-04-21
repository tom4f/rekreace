import styled from '@emotion/styled';
import { fotoGalleryOwner } from 'api/paths';
import { AlertBox } from 'components/AlertBox/AlertBox';
import { Button, Header, Input } from 'components/Atoms';
import { useAlert } from 'features/alert';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from 'src/store';

import { LoginRequest } from '../hooks';
import { useJWTLogin } from '../hooks/useJWTLogin';

export const Login = () => {
  // const { mutate } = usePostLogin();
  const { mutate } = useJWTLogin();
  const { isLogged } = useAuthStore();
  const { alert, setAlert } = useAlert();

  const form = useRef<HTMLFormElement>(null);

  const loginLogic = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (null === form.current) return;

    const FD = new FormData(form.current);
    const object = { user: '', password: '', fotoGalleryOwner: '' };

    for (const [key, value] of FD.entries()) {
      const typedKey = key as keyof LoginRequest;
      object[typedKey] = value as string;
    }

    object['fotoGalleryOwner'] = fotoGalleryOwner;

    if (!object.user || !object.password) {
      setAlert({ header: 'Uživatelské jméno / heslo', text: 'vyplňte údaje' });
      return;
    }

    if (!/^[a-zA-Z0-9\-_]{3,15}$/.test(object.user as string)) {
      setAlert({
        header: 'Špatné jméno',
        text: 'zadejte 3 až 10 znaků (0-9 a..z A..Z - _ )',
      });
      return;
    }

    if (!/^[a-zA-Z0-9.\-_]{3,15}$/.test(object.password as string)) {
      setAlert({
        header: 'Špatné heslo!',
        text: 'zadejte 3 až 10 znaků (0-9 a..z A..Z - . _ )',
      });
      return;
    }

    mutate(object, {
      onSuccess: () => {
        if (!isLogged) {
          setAlert({
            header: 'Přihlášení se nepovedlo !',
            text: 'zkuste později...',
          });
        }
      },
      onError: () => {
        setAlert({
          header: 'Přihlášení se nepovedlo !',
          text: 'zkuste později...',
        });
      },
    });
  };

  return (
    <StyledLogin>
      <form ref={form} onSubmit={loginLogic}>
        <StyledForm>
          <Input
            label='Uživatel'
            placeholder='zadejte uživatele'
            required
            name='user'
            type='text'
          />
          <Input
            label='Heslo'
            placeholder='Zadejte heslo'
            required
            name='password'
            type='password'
            autoComplete='off'
          />
          <Button label='Odeslat' />
          <AlertBox
            style={{ width: '100%', textAlign: 'center' }}
            alert={alert}
          />
        </StyledForm>
      </form>
      <Header>
        <NavLink to='/'>zpět na hlavní stránku</NavLink>
      </Header>
    </StyledLogin>
  );
};

export const StyledLogin = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem 0;
`;
