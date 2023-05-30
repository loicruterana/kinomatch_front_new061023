import React, {useContext} from 'react'
import { AuthContext } from '../../../contexts/AuthContext';

import './Connected.scss';


export const Connected = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="Connected-container">Vous êtes connecté avec l'adresse {userData.email}</div>
  )
}

export default Connected;
