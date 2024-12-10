import { Login, useLoginStatus } from '../../features/login';
import { Modal } from '../Modal/Modal';

export const Bedrich = () => {
  const { loginData, setLoginData } = useLoginStatus();

  return (
    <div style={{ minHeight: 'calc(50vh - 100px)' }}>
      {loginData.isLogged ? (
        <div style={{ color: 'red', textAlign: 'center' }}>
          {loginData.webUser} je úspěšně přihlášen
        </div>
      ) : (
        <Modal>
          <Login setLoginData={setLoginData} />
        </Modal>
      )}
    </div>
  );
};
