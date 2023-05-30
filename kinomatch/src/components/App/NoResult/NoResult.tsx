import React, {useContext} from 'react'

import './NoResult.scss';


export const NoResult = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="NoResult-container">
      <span>Aucun résultat trouvé
      </span>
      </div>
  )
}

export default NoResult;
