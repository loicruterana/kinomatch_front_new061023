import React, { useState, useEffect } from 'react'
import './Home.scss';

import RollGender from './Rolls/RollGender';
import RollNationality from './Rolls/RollNationality';
import RollYear from './Rolls/RollYear';



export const Home = () => {

  const [showRollGender, setShowRollGender] = useState(false);
  const [showRollNationality, setShowRollNationality] = useState(false);
  const [showRollYear, setShowRollYear] = useState(false);
  const [showButtons, setShowButtons] = useState(false);



  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });


  useEffect(() => {
    function handleResize() {
      setWindowSize((prevState) => ({
        ...prevState,
        width: window.innerWidth
    }));

      if (windowSize.width > 900){
      showDesktopVersion();
      }
      if (windowSize.width < 900){
      showMobileVersion();
      }
    }
    
    window.addEventListener('resize', handleResize);
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize 
    // et actualiser le state windowSize
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
  }, [windowSize]);

  function showDesktopVersion (){
    setShowRollGender(true)
    setShowRollNationality(true)
    setShowRollYear(true)
    setShowButtons(false)
    console.log('ça passe en version desktop')
  }

function showMobileVersion (){
  setShowButtons(true)
  setShowRollGender(false)
  setShowRollNationality(false)
  setShowRollYear(false)
  console.log(showButtons);
  (console.log('ça passe en version mobile'))

}




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

      <div className={`Home-container__roll-modale ${showRollGender && 'isActive'}`}>
        <div className='Home-container__roll-modale-backdropfilter' onClick={handleClickOut}>
        </div>
          { showRollGender &&
            <RollGender/>
          }
      </div>

      <div className={`Home-container__roll-modale ${showRollNationality && 'isActive'}`}>
        <div className='Home-container__roll-modale-backdropfilter' onClick={handleClickOut}>
        </div>
          { showRollNationality &&
            <RollNationality/>
          }
      </div>

      <div className={`Home-container__roll-modale ${showRollYear && 'isActive'}`}>
        <div className='Home-container__roll-modale-backdropfilter' onClick={handleClickOut}>
        </div>
          { showRollYear &&
            <RollYear/>
          }
      </div>
        
 

          {/* { showRollYear &&
            <RollYear/>
          } */}



      

        {/* //////// */}

      <div className={`Home-container__buttons ${showButtons && 'isActive'}`}>

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





      {/* <div className={`Home-container-backdropfilter ${showRollNationality && 'active'}`}
      onClick={handleClickOut}
      ></div> */}


{/* 
      <div className={`Home-container-backdropfilter ${showRollYear && 'active'}`}
      onClick={handleClickOut}
      ></div> */}



    </div>
  )
}

export default Home;