import React, { useState, useEffect } from 'react'
import './Home.scss';

import RollGender from './Rolls/RollGender';
import RollNationality from './Rolls/RollNationality';
import RollYear from './Rolls/RollYear';



export const Home = () => {

  const [showRollGender, setShowRollGender] = useState(false);
  const [showRollNationality, setShowRollNationality] = useState(false);
  const [showRollYear, setShowRollYear] = useState(false);

  function handleClickOut (){
    setShowRollGender(false)
    setShowRollNationality(false)
    setShowRollYear(false)
  }

  function handleClickGender (){
    setShowRollGender(!showRollGender)
  }

  function handleClickNationality (){
    setShowRollNationality(!showRollNationality)
  }

  function handleClickYear (){
    setShowRollYear(!showRollYear)
  }



  return (
    <div className='Home-container'>

      
      {/* //////// */}

      <div className={"Home-container__roll-modale-desktop-version"}>


        <RollGender/>
        <RollNationality/>
        <RollYear/>

      </div>

      <div className={`Home-container__roll-modale-mobile-version ${showRollGender && 'isActive'}`}>
        <div className="Home-container__roll-modale-mobile-version-backdropfilter" onClick={handleClickOut}>
        </div>
            <RollGender/>
      </div>

      <div className={`Home-container__roll-modale-mobile-version ${showRollNationality && 'isActive'}`}>
        <div className="Home-container__roll-modale-mobile-version-backdropfilter" onClick={handleClickOut}>
        </div>
            <RollNationality/>

      </div>

      <div className={`Home-container__roll-modale-mobile-version ${showRollYear && 'isActive'}`}>
        <div className="Home-container__roll-modale-mobile-version-backdropfilter" onClick={handleClickOut}>
        </div>
        <RollYear/> 

      </div>

        {/* //////// */}

      <div className="Home-container__buttons">

        <div className='Home-container__buttons__button'
        onClick={handleClickGender}
        >
        Genre
        </div>

        <div className='Home-container__buttons__button'
        onClick={handleClickNationality}
        >
        Nationalité
        </div>

        <div className='Home-container__buttons__button'
        onClick={handleClickYear}
        >
        Année
        </div>

      </div>

    </div>
  )
}

export default Home;