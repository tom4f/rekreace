import { Login } from '../../features/login';
import { Modal } from '../Modal/Modal';
import {
  useLoginStatus,
  useLogout,
} from '../../features/login/hooks/useGetLoginStatus';

export const Bedrich = () => {
  const { data: loginData } = useLoginStatus();
  const { invalidateQuery, removeSession } = useLogout();

  const executeLogout = () => {
    invalidateQuery();
    removeSession();
  };

  return (
    <div>
      {loginData.isLogged ? (
        <div style={{ color: 'red', textAlign: 'center', margin: '50px auto' }}>
          {loginData.webUser} je úspěšně přihlášen
          <br />
          <br />
          <button onClick={executeLogout}>odhlásit...</button>
        </div>
      ) : (
        <Modal>
          <Login />
        </Modal>
      )}
    </div>
  );
};
