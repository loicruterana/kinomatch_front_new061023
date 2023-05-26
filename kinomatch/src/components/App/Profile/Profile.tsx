import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:5173';

import BookmarkedRoll from './Rolls/BookmarkedRoll';

import { LoadingContext } from '../../../contexts/LoadingContext';


import './Profile.scss';

export const Profile = () => {
  const navigate = useNavigate();

  const [mobileVersion, setMobileVersion] = useState(false);
  const [showBookmarkedRoll, setShowBookmarkedRoll] = useState(true);
  const [bookmarkedList, setBookmarkedList] = useState([]);
  const [bookmarkedListWithName, setBookmarkedListWithName] = useState([]);
  const { load, unload, isLoading } = useContext(LoadingContext);

  const coucou = bookmarkedList === undefined; // false

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  // const [isClicked, setIsClicked] = useState(false)


  const { userData, logout, deleteBookmarked } = useContext(AuthContext);

  // ================ HANDLERS ================

  function handleClickOut() {
    setShowBookmarkedRoll(false)
  }

  useEffect(() => {
    function handleResize() {
      setWindowSize((prevState) => ({
        ...prevState,
        width: window.innerWidth,
      }));

      if (windowSize.width > 900) {
        setMobileVersion(false);
        setShowBookmarkedRoll(true);
        // setShowRollProvider(true)
        // setShowRollDecade(true)
      }
      if (windowSize.width < 900) {
        setMobileVersion(true);
        setShowBookmarkedRoll(false);
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
     .get(`https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies?${searchParams.toString()}`
    //  , 
    //  {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': true,
    //     'Accept': 'application/json'
    //   }
    // }
    )
      .then(({ data }) => {
        console.log(data);
        setBookmarkedList(data);
 
      })
      .catch((error) => {
        console.error(error);
        // Effectuez ici les actions à réaliser en cas d'erreur
      });
    console.log(bookmarkedList);

  }, []);
  console.log(bookmarkedList);


  useEffect(() => {
    const fetchMovieTitles = async () => {
      try {
        const requests = bookmarkedList.map((bookmarkedListItem) => {
          const searchParams = new URLSearchParams();
          searchParams.append('movieID', bookmarkedListItem.film_id);
          return axios.get(`https://deploy-back-kinomatch.herokuapp.com/detail?${searchParams.toString()}`);
        });
  
        Promise.all(requests)
          .then((responses) => {
            const moviesToAdd = responses.map(({ data }) => ({ name: data.title, movie_id: data.id }));
            setBookmarkedListWithName((state) => [...new Set([...state, ...moviesToAdd])]);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchMovieTitles();
  }, [bookmarkedList]);
  
  
    
    console.log(bookmarkedList);
    console.log(bookmarkedListWithName)

    function handleShowBookmarkedRoll(){
      setShowBookmarkedRoll(true);
      }

    function handleDeleteProfile() {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('userID', userData.id);
        // searchParams.append('email', userData.email);

        console.log(userData.id)
        axios
          .delete(`https://deploy-back-kinomatch.herokuapp.com/deleteAccount?${searchParams.toString()}`)
          .then((response) => {
            console.log(response.data.message);
            logout();
            navigate(`/`);

          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    }

    function handleLogout() {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('userID', userData.id);
        console.log(userData.id)
        axios
          .get(`https://deploy-back-kinomatch.herokuapp.com/logout?${searchParams.toString()}`)
          .then((response) => {
            console.log(response.data.message);
            logout();
            navigate(`/`);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    }
    
    


  return (
    <div className='Profile-container'>
      <div className='Profile-container__personnal'>
        <div className='Profile-container__personnal__infos'>
          {/* <h2 className='Profile-container__personnal__infos__title'>Profil</h2> */}
          <div className='Profile-container__personnal__infos__pictureemailpassword'>
            <div className='Profile-container__personnal__circle'>
              <img src='images/SamplePicCircle.png' alt="Image de profil par defaut"></img>
            </div>
            <div className='Profile-container__personnal__pictureemailpassword__emailpassword'>
              <div className='Profile-container__personnal__pictureemailpassword__emailpassword__item'>
                Adresse email :<div>{userData.email}</div>
              </div>
              <div className='Profile-container__personnal__pictureemailpassword__emailpassword__item'>
                Mot de passe
              </div>
            </div>
          </div>
          {!mobileVersion && (
          <div className='Profile-container-buttons'>
          <button 
          className='Profile-container-buttons-button'
          onClick={handleLogout}>
              Se déconnecter
          </button>
          <button className='Profile-container-buttons-button'
          onClick={handleDeleteProfile}>
              Supprimer profil
          </button>
        </div>
        )}
        </div>
        </div>
        {/* <div className="Profile-container__favoritefilters">
          <h3 className="Profile-container__favoritefilters__title">Filtres favoris </h3>
        </div> */}

        {((showBookmarkedRoll && mobileVersion) || !mobileVersion) && (
          <div
            className={`Profile-container__roll-modale-${
              mobileVersion ? 'mobile-version' : 'desktop-version'
            }`}
          >
            <div
              className={`Profile-container__roll-modale-${
                mobileVersion ? 'mobile-version' : 'desktop-version'
              }-backdropfilter`}
              onClick={handleClickOut}
            >
            </div>
            <BookmarkedRoll
              isLoading={coucou}
              mobileVersion={mobileVersion}
              showBookmarkedRoll={showBookmarkedRoll}
              bookmarkedList={bookmarkedList}
              bookmarkedListWithName={bookmarkedListWithName}
              deleteBookmarked={deleteBookmarked}
              setBookmarkedList={setBookmarkedList}
              setBookmarkedListWithName={setBookmarkedListWithName}
            />
            {/* <FiltersRoll isLoading={coucou} preselectedGenres={preselectedGenres} preselectedProviders={preselectedProviders} showRollGenre={showRollGenre} showRollProvider={showRollProvider} showRollDecade={showRollDecade} mobileVersion={mobileVersion}/> */}
          </div>
        )}


        

        {/* BOUTONS */}

        {mobileVersion && (
          <div className='Profile-container__rollbuttons'>
            <div
              className='Profile-container__rollbuttons__button'
              onClick={handleShowBookmarkedRoll}
            >
    <i className='fa-sharp fa-solid fa-check'></i>
    À voir
    <i className='fa-regular fa-heart'></i>            
    </div>

            <div
              className='Profile-container__rollbuttons__button'
              // onClick={handleClickProvider}
            >
              Vus
            </div>
          </div>
        )}
      
    </div>
  );
};
export default Profile;
