import { Login, useLoginStatus } from 'features/login';

import { Formular } from './Formular';

export const EditImage = () => {
  const { data: loginData } = useLoginStatus();

  return (
    <>{loginData?.isLogged ? <Formular loginData={loginData} /> : <Login />}</>
  );
};
