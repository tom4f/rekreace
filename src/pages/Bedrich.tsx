import styled from '@emotion/styled';
import { Login } from 'features/login';
import { useEffect } from 'react';
import { Button } from 'src/components/Atoms';
import { useAuthStore, useModalStore } from 'src/store';

export const Bedrich = () => {
  const { isLogged, user, logout } = useAuthStore();
  const { openModal, closeModal, isOpen } = useModalStore();

  useEffect(() => {
    if (!isLogged && !isOpen) {
      openModal({
        content: <Login />,
        customStyle: { height: 'auto' },
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
    <Wrapper>
      {user} je úspěšně přihlášen
      <br />
      <br />
      <Button label='odhlásit' onClick={logout} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: lime;
  text-align: center;
  margin: 50px auto;
`;
