import React, { useState, useEffect } from 'react'
import './Home.scss';

import RollGender from './Rolls/RollGender';
import RollNationality from './Rolls/RollNationality';
import RollYear from './Rolls/RollYear';



export const Home = () => {

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  function showDesktopVersion (){
    setShowRollGender(true)
    setShowRollNationality(true)
    setShowRollYear(true)
  }

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth
      });

      if (windowSize.width > 900){
      showDesktopVersion();

      }
    }

    window.addEventListener('resize', handleResize);
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize 
    // et actualiser le state windowSize
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
  }, [windowSize]);



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
      <div className={`Home-container-backdropfilter ${showRollGender && 'active'}`}
      onClick={handleClickOut}
      ></div>
      <div className='Home-container__buttons'>
        <div className='Home-container__buttons__button'
        onClick={handleClickGender}
        >
        Genre
        </div>
      </div>
      { showRollGender &&
        <RollGender/>
      }

      <div className={`Home-container-backdropfilter ${showRollNationality && 'active'}`}
      onClick={handleClickOut}
      ></div>
      <div className='Home-container__buttons'>
        <div className='Home-container__buttons__button'
          onClick={handleClickNationality}
          >
            Nationalité
        </div>
      </div>
      { showRollNationality &&
        <RollNationality/>
      }

<div className={`Home-container-backdropfilter ${showRollYear && 'active'}`}
      onClick={handleClickOut}
      ></div>
      <div className='Home-container__buttons'>
        <div className='Home-container__buttons__button'
          onClick={handleClickYear}
          >
            Année
        </div>
      </div>
      { showRollYear &&
        <RollYear/>
      }

    </div>
  )
}

export default Home;