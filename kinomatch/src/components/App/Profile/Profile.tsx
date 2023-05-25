import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:5173';

import ToWatchRoll from './Rolls/ToWatchRoll';

import { LoadingContext } from '../../../contexts/LoadingContext';

import './Profile.scss';

export const Profile = () => {
  const [mobileVersion, setMobileVersion] = useState(false);
  const [showToWatchRoll, setShowToWatchRoll] = useState(true);
  const [toWatchList, setToWatchList] = useState([]);
  const [toWatchListWithName, setToWatchListWithName] = useState([]);
  const { load, unload, isLoading } = useContext(LoadingContext);

  const coucou = toWatchList === undefined; // false

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  // const [isClicked, setIsClicked] = useState(false)

  // import { AuthContext } from '../../../contexts/AuthContext';

  const { userData } = useContext(AuthContext);

  // ================ HANDLERS ================

  useEffect(() => {
    function handleResize() {
      setWindowSize((prevState) => ({
        ...prevState,
        width: window.innerWidth,
      }));

      if (windowSize.width > 900) {
        setMobileVersion(false);
        setShowToWatchRoll(true);
        // setShowRollProvider(true)
        // setShowRollDecade(true)
      }
      if (windowSize.width < 900) {
        setMobileVersion(true);
        setShowToWatchRoll(false);
        // setShowRollProvider(false)
        // setShowRollDecade(false)
      }
    }

    window.addEventListener('resize', handleResize);
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize
    // et actualiser le state windowSize
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
  }, [windowSize]);

  // bookmarkedMovies

  useEffect(() => {
    load();
    console.log(isLoading);

    const searchParams = new URLSearchParams();
    searchParams.append('userID', userData.id);
    // console.log(`https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies?${searchParams.toString()}`);
    axios
     .get(`https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies?${searchParams.toString()}`, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173' // Remplacez par votre origine autorisée
      }
    })
      .then(({ data }) => {
        console.log(data);
        console.log(data);
        setToWatchList(data);
 
      })
      .catch((error) => {
        console.error(error);
        // Effectuez ici les actions à réaliser en cas d'erreur
      });
    console.log(toWatchList);


    // useEffect(() => {
    //   // ...
  
    //   const searchMovieId = new URLSearchParams();
    //   searchMovieId.append('movieID', toWatchList[0].film_id);
      
    //   axios
    //     .get(
    //       `https://deploy-back-kinomatch.herokuapp.com/detail?${searchMovieId.toString()}`
    //     )
    //     .then(({ data }) => {
    //       console.log(data);
    //       // Faites quelque chose avec les données retournées
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       // Effectuez ici les actions à réaliser en cas d'erreur
    //     });
        
    // }, [toWatchList]);


//=====ici

    // const searchMovieId = new URLSearchParams();
    // console.log(`index 0 du tableau ${toWatchList[0]}`)
    // searchMovieId.append('movieID', toWatchList[0].film_id);
    // axios
    //   .get(
    //     `https://deploy-back-kinomatch.herokuapp.com/detail?${searchMovieId.toString()}`
    //   )
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });


    // axios.get(`https://deploy-back-kinomatch.herokuapp.com/detail?${toWatchList[0].film_id}`)
    // .then(({ data }) => {
    //   console.log(data);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }, []);
  console.log(toWatchList);



    // const searchParams = new URLSearchParams();
    // searchParams.append('movieID', toWatchList[0].film_id);
    // axios.get(`https://deploy-back-kinomatch.herokuapp.com/detail?${searchParams.toString()}`)
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    useEffect(() => {
      const fetchMovieTitles = async () => {
        try {
          const requests = toWatchList.map((toWatchListItem) => {
            const searchParams = new URLSearchParams();
            searchParams.append('movieID', toWatchListItem.film_id);
            return axios.get(`https://deploy-back-kinomatch.herokuapp.com/detail?${searchParams.toString()}`);
          });
    
          const responses = await Promise.all(requests);
          const movieTitles = responses.map(({ data }) => data.title);
    
          setToWatchListWithName((state) => [...state, ...movieTitles]);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchMovieTitles();
    }, [toWatchList]);
    
    console.log(toWatchList);
    console.log(toWatchListWithName)


  return (
    <div className='Profile-container'>
      <div className='Profile-container__personnal'>
        <div className='Profile-container__personnal__infos'>
          <h2 className='Profile-container__personnal__title'>Profil</h2>
          <div className='Profile-container__personnal__pictureemailpassword'>
            <div className='Profile-container__personnal__circle'></div>
            <div className='Profile-container__personnal__pictureemailpassword__emailpassword'>
              <div className='Profile-container__personnal__pictureemailpassword__emailpassword__item'>
                Adresse email :<div>{userData.email}</div>
              </div>
              <div className='Profile-container__personnal__pictureemailpassword__emailpassword__item'>
                Mot de passe
              </div>
            </div>
          </div>
        </div>
        </div>
        {/* <div className="Profile-container__favoritefilters">
          <h3 className="Profile-container__favoritefilters__title">Filtres favoris </h3>
        </div> */}

        {((showToWatchRoll && mobileVersion) || !mobileVersion) && (
          <div
            className={`Profile-container__roll-modale-${
              mobileVersion ? 'mobile-version' : 'desktop-version'
            }`}
          >
            <div
              className={`Profile-container__roll-modale-${
                mobileVersion ? 'mobile-version' : 'desktop-version'
              }-backdropfilter`}
              // onClick={handleClickOut}
            >
              sdfsdf
            </div>
            <ToWatchRoll
              isLoading={coucou}
              mobileVersion={mobileVersion}
              showToWatchRoll={showToWatchRoll}
              toWatchList={toWatchList}
              toWatchListWithName={toWatchListWithName}
            />
            {/* <FiltersRoll isLoading={coucou} preselectedGenres={preselectedGenres} preselectedProviders={preselectedProviders} showRollGenre={showRollGenre} showRollProvider={showRollProvider} showRollDecade={showRollDecade} mobileVersion={mobileVersion}/> */}
          </div>
        )}

        {/* BOUTONS */}

        {mobileVersion && (
          <div className='Profile-container__buttons'>
            <div
              className='Profile-container__buttons__button'
              // onClick={handleClickGenre}
            >
              Genre
            </div>

            <div
              className='Profile-container__buttons__button'
              // onClick={handleClickProvider}
            >
              Plateforme
            </div>

            <div
              className='Profile-container__buttons__button'
              // onClick={handleClickDecade}
            >
              Année
            </div>
          </div>
        )}
      
    </div>
  );
};
export default Profile;
