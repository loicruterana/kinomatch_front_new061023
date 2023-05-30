import React, {useContext} from 'react'

import './NoResult.scss';


export const NoResult = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="NoResult-container">
      <span>Aucun résultat trouvé
      </span>
      <img src='/images/3z9a.gif' alt='gif aucun résultat'></img>

      </div>
  )
}

export default NoResult;
