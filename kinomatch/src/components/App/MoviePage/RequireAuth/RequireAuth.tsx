import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import NotConnected from '../../NotConnected/NotConnected';
import { useUser } from '../../../../hooks/useUser';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';
// import { RequireAuth } from './RequireAuth/RequireAuth';

export const RequireAuth = ({ children }) => {
  const navigate: (path: string) => void = useNavigate();
  const { data, loading } = useUser();

  if (loading) {
    console.log('ok');
    return <Loading />;
  }

  // if (!data?.id) {
  //   setTimeout(() => {
  //     navigate(`/`);
  //   }, 1000);
  //   return <NotConnected />;
  // }

  return children;
};
