import React from 'react'

import './Connected.scss';


export const Connected = ({email}) => {
  return (
    <div className="Connected-container">Vous êtes connecté avec l'adresse {email}</div>
  )
}

export default Connected;
