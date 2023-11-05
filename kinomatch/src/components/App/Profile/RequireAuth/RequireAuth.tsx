import NotConnected from '../../NotConnected/NotConnected';
import { useUser } from '../../../../hooks/useUser';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

type RequireAuthProps = {
  children: ReactNode;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const navigate: (path: string) => void = useNavigate();
  const { data, loading } = useUser();
  console.log('data:', data);
  console.log('data?.id:', data?.id);
  setTimeout(() => {
    if (loading) {
      return <Loading />;
    }
    if (data.id === '') {
      setTimeout(() => {
        navigate(`/`);
        // console.log('on est déconnecté');
      }, 500);
      return <NotConnected />;
    }
  }, 1000);

  return <>{children}</>;
};
