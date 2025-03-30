import { Login } from 'features/login';
import { useEffect } from 'react';
import { useAuthStore, useModalStore } from 'src/store';

export const Bedrich = () => {
  const { isLogged, user, logout } = useAuthStore();
  const { openModal, closeModal, isOpen } = useModalStore();

  useEffect(() => {
    if (!isLogged && !isOpen) {
      openModal({
        content: <Login />,
      });
    }

    if (isLogged && isOpen) {
      closeModal();
    }

    return () => {
      if (isOpen) {
        closeModal();
      }
    };
  }, [isLogged, openModal, closeModal, isOpen]);

  if (!isLogged) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ color: 'lime', textAlign: 'center', margin: '50px auto' }}>
      {user} je úspěšně přihlášen
      <br />
      <br />
      <button className='text-red-500' onClick={logout}>
        odhlásit...
      </button>
    </div>
  );
};
