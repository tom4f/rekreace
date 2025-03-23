import { fotoGalleryOwner } from 'api/paths';
import { AlertBox } from 'components/AlertBox/AlertBox';
import { Button, Header, Input } from 'components/Atoms';
import { useAlert } from 'features/alert';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { LoginRequest, usePostLogin } from '../hooks';

export const Login = () => {
  const { mutate } = usePostLogin();
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
      onSuccess: (data) => {
        if (!data.isLogged) {
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
  max-width: 500px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

export const StyledForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid #555;
  padding: 1rem 0;
`;
