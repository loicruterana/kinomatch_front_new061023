import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import NotConnected from '../../NotConnected/NotConnected';
import { useUser } from '../../../../hooks/useUser';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const navigate: (path: string) => void = useNavigate();

  const { data, loading } = useUser();

  if (!data?.id) {
    // setShowNotConnected(true);
    if (loading) {
      return <Loading />;
    }
    setTimeout(() => {
      navigate(`/`);
    }, 1000);
    return <NotConnected />;
  }
  return children;
};
