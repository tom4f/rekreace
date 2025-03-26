import { Modal } from 'components/Modal';
import { Login } from 'features/login';
import { useAuthStore } from 'src/store';

export const Bedrich = () => {
  const { isLogged, user } = useAuthStore();

  const executeLogout = () => {
    useAuthStore.getState().logout();
  };

  return (
    <div>
      {isLogged ? (
        <div
          style={{ color: 'lime', textAlign: 'center', margin: '50px auto' }}
        >
          {user} je úspěšně přihlášen
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
