// import { useContext } from 'react';
// import { AuthContext } from '../../../../contexts/AuthContext';
// import NotConnected from '../../NotConnected/NotConnected';
import { useUser } from '../../../../hooks/useUser';
import Loading from '../../Loading/Loading';
// import { useNavigate } from 'react-router-dom';
// import { addUserData } from '../../../../contexts/AuthContext';
// import { RequireAuth } from './RequireAuth/RequireAuth';

import { ReactNode } from 'react';

type RequireAuthProps = {
  children: ReactNode;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { data, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  if (!data?.id) {
    // Aucun utilisateur n'est connecté, vous pouvez rediriger vers la page de connexion ici
    // navigate('/login');
    return null; // Ne rend rien ici car la redirection est en cours
  }

  return children;
};
