import { Route, Routes } from 'react-router-dom';
import { Login } from '../../features/login';
import { Form } from './components/Form';
import { Status } from './components/Status';
import { useLoginStatus } from '../../features/login/hooks/useGetLoginStatus';

export const BookingForm = () => {
  const { data: loginData } = useLoginStatus();

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Form />
              <Status />
            </>
          }
        ></Route>
        <Route
          path='/edit'
          element={
            <>
              {loginData?.isLogged ? (
                <Status />
              ) : (
                <>
                  <Login />
                  <Status />
                </>
              )}
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
};
