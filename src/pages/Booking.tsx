import { Form, Status } from 'components/Booking';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'src/store';

export const Booking = () => {
  const { isLogged } = useAuthStore();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isEditPage = pathname === '/objednavka/edit';

  useEffect(() => {
    if (isLogged || !isEditPage) {
      return;
    }
    navigate('/bedrich');
  }, [isLogged, navigate, isEditPage]);

  return (
    <>
      {!isEditPage && <Form />}
      <Status />
    </>
  );
};
