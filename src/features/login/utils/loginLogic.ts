import { Url, fotoGalleryOwner } from '../../../api/paths';
import { loginLogicType } from '../../../components/PhotoGallery/TypeDefinition';

export const loginLogic: loginLogicType = async (
  event,
  formCurrent,
  setAlert,
  setLoginData
) => {
  event.preventDefault();

  if (null === formCurrent) return;

  const FD = new FormData(formCurrent);
  const object: { [key: string]: string | File } = {};
  FD.forEach((value, key) => (object[key] = value));
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

  try {
    const startLogin = await fetch(`${Url.API}/foto_login.php`, {
      method: 'POST',
      body: JSON.stringify(object),
    });
    const respLogin = JSON.parse(await startLogin.text());

    const [webToken, webAccess, webUser] = respLogin;

    if (webToken.webToken === 'error') {
      setAlert({
        header: 'Přihlášení se nepovedlo !',
        text: 'zkuste později...',
      });
      return;
    } else {
      const respObj = {
        ...webToken,
        ...webAccess,
        ...webUser,
        isLogged: true,
      };
      setLoginData(respObj);
      sessionStorage.setItem('client', JSON.stringify(respObj));
    }
  } catch {
    setAlert({
      header: 'Přihlášení se nepovedlo !',
      text: 'zkuste později...',
    });
  }
};
