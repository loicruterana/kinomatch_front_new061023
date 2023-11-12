import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/config';
import { AuthContext } from '../contexts/AuthContext';

let alreadyLoading = false;

export function useUser() {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(!auth.userData?.id);
  // if (!auth.userData?.id) {
  //   // setShowNotConnected(true);
  //   setTimeout(() => {
  //     // navigate(`/`);
  //   }, 1000);
  //   return <NotConnected />;
  // }
  useEffect(() => {
    if (auth.userData?.id || alreadyLoading) {
      return;
    }

    alreadyLoading = true;

    axios
      .get(`${API_BASE_URL}/login`)
      .then(({ data }) => {
        if (data.authorized) {
          const { user } = data;
          auth.addUserData(user.email, user.id, user.picture);
        }
      })
      .finally(() => {
        setIsLoading(false);
        alreadyLoading = false;
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data: auth.userData, loading: isLoading };

  // return children;
}

// vérifie si on a les informations
// sinon vérifier avec une requête
// faire la logique de refus
