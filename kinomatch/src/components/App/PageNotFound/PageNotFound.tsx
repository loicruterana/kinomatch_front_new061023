import React from 'react'

import './PageNotFound.scss';


const PageNotFound: React.FC = () => {

  return (
    <div className="PageNotFound-container">
      <span className="PageNotFound-container-text">
        La page que vous recherchez semble introuvable
      </span>

      <img src="/images/Yqe.gif" alt="gif de 404 mire" />
      </div>
  )
}

export default PageNotFound;
