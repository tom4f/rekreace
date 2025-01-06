import { useRef } from 'react';
import styled from 'styled-components';
import { AlertBox } from '../../../components/AlertBox/AlertBox';
import { useAlert } from '../../alert/utils/useAlert';
import { usePostLogin } from '../hooks';
import { fotoGalleryOwner } from '../../../api/paths';
import { LoginRequest } from '../hooks';
import { NavLink } from 'react-router-dom';
import { Input } from '../../../components/Atoms/Input/Input';
import { Button } from '../../../components/Atoms/Button/Button';
import { Header } from '../../../components/Atoms';

export type LoginType = {
  setLoginData: React.Dispatch<
    React.SetStateAction<{
      isLogged: boolean;
      webToken: string;
      webAccess: string;
      webUser: string;
    }>
  >;
};

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
      onSuccess: () => {
        //setLoginData(respObj);
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
            label='E-mail'
            placeholder='Zadejte heslo'
            required
            name='password'
            type='password'
            autoComplete='off'
          />
          <AlertBox alert={alert} />
          <Button label='Odeslat' />
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
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  border: 1px solid #555;
  padding: 1rem 0;
`;
