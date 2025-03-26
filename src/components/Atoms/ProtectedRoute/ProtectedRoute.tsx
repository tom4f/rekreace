import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from 'src/store';

export const ProtectedRoute = () => {
  const { isLogged } = useAuthStore();

  return isLogged ? <Outlet /> : <Navigate to='/' replace />;
};
