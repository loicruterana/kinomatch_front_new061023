import React, { useState } from 'react'
import './Home.scss';

import RollGender from './Rolls/RollGender';


export const Home = () => {

  const [showRoll, setShowRoll] = useState(false);

  function handleClick (){
    setShowRoll(!showRoll)
  }
  return (
    <div className="Home-container">
      <div className='Home-container__rolls'>
        <div className='Home-container__rolls__roll'
          onClick={handleClick}
          >
            WESTERN
        </div>
      </div>
      { showRoll &&
        <RollGender/>
      }
    </div>
  )
}

export default Home;