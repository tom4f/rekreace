import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Status } from 'components/Booking';
import { useLoginStatus } from 'features/login';

export const Booking = () => {
  const { data: loginData } = useLoginStatus();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isEditPage = pathname === '/objednavka/edit';

  useEffect(() => {
    if (loginData.isLogged || !isEditPage) {
      return;
    }
    navigate('/bedrich');
  }, [loginData.isLogged, navigate, isEditPage]);

  return (
    <>
      {!isEditPage && <Form />}
      <Status />
    </>
  );
};
