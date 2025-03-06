import { Modal } from 'components/Modal';
import { Login, useLoginStatus, useLogout } from 'features/login';

export const Bedrich = () => {
  const { data: loginData, isSuccess } = useLoginStatus();
  const { invalidateQuery, removeSession } = useLogout();

  const executeLogout = () => {
    removeSession();
    invalidateQuery();
  };

  return (
    <div>
      {isSuccess && loginData.isLogged ? (
        <div
          style={{ color: 'lime', textAlign: 'center', margin: '50px auto' }}
        >
          {loginData.webUser} je úspěšně přihlášen
          <br />
          <br />
          <button className='text-red-500' onClick={executeLogout}>
            odhlásit...
          </button>
        </div>
      ) : (
        <Modal>
          <Login />
        </Modal>
      )}
    </div>
  );
};
