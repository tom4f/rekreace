import { Route, Routes, Navigate } from 'react-router-dom';
import { useLoginStatus } from 'src/features/login';
import { Form } from 'src/components/Booking/components/Form';
import { Status } from 'src/components/Booking/components/Status/Status';

export const Booking = () => {
  const { data: loginData } = useLoginStatus();

  return (
    <div>
      <Routes>
        <Route path='/' element={<Form />}></Route>
        <Route
          path='/edit'
          element={
            !loginData?.isLogged ? (
              <Navigate replace to={'../../bedrich'} />
            ) : null
          }
        />
      </Routes>
      <Status />
    </div>
  );
};
