import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";


import BookmarkedRoll from './Rolls/BookmarkedRoll';

import { LoadingContext } from '../../../contexts/LoadingContext';


import './Profile.scss';

export const Profile = () => {
  const navigate = useNavigate();

  const [mobileVersion, setMobileVersion] = useState(false);
  const [showWatchedRoll, setShowWatchedRoll] = useState(true);
  const [showToWatchRoll, setShowToWatchRoll] = useState(true);
  const [watchedList, setWatchedList] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState({});
  const [toWatchMovies, setToWatchMovies] = useState({});
  const [bookmarkedList, setBookmarkedList] = useState({});
  const [toWatchList, setToWatchList] = useState([]);
  const [toWatchListWithName, setToWatchListWithName] = useState([]);
  const { load, unload, isLoading } = useContext(LoadingContext);

  const coucou = watchedList === undefined; // false

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  // const [isClicked, setIsClicked] = useState(false)


  const { userData, logout, deleteBookmarked, deleteToWatch, deleteBookmarkedAndWatched, deleteWatched, addBookmarked
  } = useContext(AuthContext);

  // ================ HANDLERS ================

  function handleClickOut() {
    setShowWatchedRoll(false)
    setShowToWatchRoll(false)
  }


  function handleShowWatchedRoll(){
    setShowWatchedRoll(true);
    }


  function handleShowToWatchRoll(){
    setShowToWatchRoll(true);
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


    // ================ USEWINDOWSIZE ================


  useEffect(() => {
    function handleResize() {

      if (window.innerWidth >= 900) {
        setMobileVersion(false);
        setShowWatchedRoll(true);
        setShowToWatchRoll(true);
      }
      if (window.innerWidth < 900) {
        setMobileVersion(true);
        setShowWatchedRoll(false);
        setShowToWatchRoll(false);
      }
    }

    window.addEventListener('resize', handleResize);
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize
    // et actualiser le state windowSize
    handleResize()

  return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
  }, []);
  



  // =========================== WatchedMovies

  // =========================== WATCHEDLIST

  useEffect(() => {
    load();
    console.log(isLoading);

    const searchParams = new URLSearchParams();
    searchParams.append('userID', userData.id);
    axios
     .get(`https://deploy-back-kinomatch.herokuapp.com/watchedMovies?${searchParams.toString()}`)
      .then(({ data }) => {
        console.log(data);
        setWatchedList(data);
 
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(watchedList);

  }, []);
  console.log(watchedList);

    // =========================== MOVIES

  useEffect(() => {
    const fetchMovieTitles = async () => {
      try {
        const requests = watchedList.map((watchedListItem) => {
          const searchParams = new URLSearchParams();
          searchParams.append('movieID', watchedListItem.film_id);
          return axios.get(`https://deploy-back-kinomatch.herokuapp.com/detail?${searchParams.toString()}`);
        });
  
        Promise.all(requests)
          .then((responses) => {
            const moviesToAdd = responses.map(({ data }) => (
              { name: data.title, movie_id: data.id }));
  
            // Utiliser un objet pour stocker les films uniques
            const uniqueMovies = {};
  
            // Parcourir la liste des films à ajouter
            moviesToAdd.forEach((movie) => {

                // S'il n'existe pas, l'ajouter à l'objet uniqueMovies
                uniqueMovies[movie.movie_id?.toString()] = movie;

            });
  
  
            setWatchedMovies(uniqueMovies);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchMovieTitles();
  }, [watchedList]);


    // =========================== BOOKMARKED (COEUR)



  useEffect(() => {
    const fetchMoviesBookmarked = async () => {
      try {
    
          const searchParams = new URLSearchParams();
          searchParams.append('userID', userData.id);
          axios.get(`https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies?${searchParams.toString()}`)
          .then(({data}) => {
  
            // Utiliser un objet pour stocker les films uniques
            const bookmarked = {};
            data.forEach(element => {
              const key = element.film_id?.toString()
              bookmarked[key] = element
            })
  
            setBookmarkedList(bookmarked);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchMoviesBookmarked();
  }, []);

  console.log(watchedMovies)
  
      // ===========================ToWatchMovies

    // =========================== TOWATCHLIST

      useEffect(() => {
        load();
        console.log(isLoading);
    
        const searchParams = new URLSearchParams();
        searchParams.append('userID', userData.id);
        axios
         .get(`https://deploy-back-kinomatch.herokuapp.com/toWatchMovies?${searchParams.toString()}`

        )
          .then(({ data }) => {
            console.log(data);
            setToWatchList(data);
     
          })
          .catch((error) => {
            console.error(error);
          });
        console.log(toWatchList);
    
      }, []);
      console.log(toWatchList);
    
    // =========================== TOWATCHLISTWITHNAME

    
      useEffect(() => {
        const fetchMovieTitles = async () => {
          try {
            const requests = toWatchList.map((toWatchListItem) => {
              const searchParams = new URLSearchParams();
              searchParams.append('movieID', toWatchListItem.film_id);
              return axios.get(`https://deploy-back-kinomatch.herokuapp.com/detail?${searchParams.toString()}`);
            });
      
            Promise.all(requests)
              .then((responses) => {
                const moviesToAdd = responses.map(({ data }) => ({ name: data.title, movie_id: data.id }));
                const uniqueMovies = {};
                moviesToAdd.forEach((movie) => {uniqueMovies[movie.movie_id?.toString()] = movie});
                setToWatchMovies(uniqueMovies)
              })
              .catch((error) => {
                console.error(error);
              });
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchMovieTitles();
      }, [toWatchList]);

      console.log(toWatchMovies)


      //==========

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
              <div className='Profile-container__personnal__pictureemailpassword__emailpassword__email'>
                <span>Adresse email -</span><div>{userData.email}</div>
              </div>
              <div className='Profile-container__personnal__pictureemailpassword__emailpassword__password'>
              <span>Mot de passe -</span>
                <div>∗∗∗∗∗∗∗</div>
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

        {((showWatchedRoll && mobileVersion) || (showToWatchRoll && mobileVersion) || !mobileVersion) && (
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
              showWatchedRoll={showWatchedRoll}
              setShowWatchedRoll={setShowWatchedRoll}
              showToWatchRoll={showToWatchRoll}
              setShowToWatchRoll={setShowToWatchRoll}

              watchedList={watchedList}
              setWatchedList={setWatchedList}
              watchedMovies={watchedMovies}
              setWatchedMovies={setWatchedMovies}
              deleteWatched={deleteWatched}

              toWatchList={toWatchList}
              setToWatchList={setToWatchList}
              toWatchMovies={toWatchMovies}
              setToWatchMovies={setToWatchMovies}
              deleteToWatch={deleteToWatch}
              
              deleteBookmarkedAndWatched={deleteBookmarkedAndWatched}

              bookmarkedList={bookmarkedList}
              deleteBookmarked={deleteBookmarked}
              addBookmarked={addBookmarked}
            />
            {/* <FiltersRoll isLoading={coucou} preselectedGenres={preselectedGenres} preselectedProviders={preselectedProviders} showRollGenre={showRollGenre} showRollProvider={showRollProvider} showRollDecade={showRollDecade} mobileVersion={mobileVersion}/> */}
          </div>
        )}


        

        {/* BOUTONS */}

        {mobileVersion && (
          <div className='Profile-container__rollbuttons'>
            <div
              className='Profile-container__rollbuttons__button'
              onClick={handleShowWatchedRoll}
            >
              <i className='fa-sharp fa-solid fa-check'></i>
              Vus
              <i className='fa-regular fa-heart'></i>            
            </div>

            <div
              className='Profile-container__rollbuttons__button'
              onClick={handleShowToWatchRoll}
            >
              <i 
            className='fa-solid fa-xmark'></i>
              À voir
              <div></div>
            </div>
          </div>
        )}
      
    </div>
  );
};
export default Profile;
