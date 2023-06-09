import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  WatchedListArray,
  WatchedMoviesObject,
  ToWatchListArray,
  toWatchMoviesObject,
  BookmarkedListObject,
  UserData
} from '../../../utils/interfaces';

import BookmarkedRoll from './Rolls/BookmarkedRoll';

import { LoadingContext } from '../../../contexts/LoadingContext';

import './Profile.scss';

export const Profile: React.FC = () => {
  const navigate: (path: string) => void = useNavigate();

  const [mobileVersion, setMobileVersion] = useState<boolean>(false);
  const [showWatchedRoll, setShowWatchedRoll] = useState<boolean>(true);
  const [showToWatchRoll, setShowToWatchRoll] = useState<boolean>(true);
  const [watchedList, setWatchedList] = useState<WatchedListArray>([]);
  const [watchedMovies, setWatchedMovies] = useState<WatchedMoviesObject>({});
  const [toWatchList, setToWatchList] = useState<ToWatchListArray>([]);
  const [toWatchMovies, setToWatchMovies] = useState<toWatchMoviesObject>({});
  const [bookmarkedList, setBookmarkedList] = useState<BookmarkedListObject>(
    {}
  );
  const [userEvent, setUserEvent] = useState(false);
  const { load } = useContext(LoadingContext);
  

  const coucou = watchedList === undefined; // false

  interface BookmarkedItem {
    createdAt: string;
    film_id: string;
    id: number;
    updatedAt: string;
    user_id: string;
  }


  const {
    userData,
    logout,
    deleteBookmarked,
    deleteToWatch,
    deleteBookmarkedAndWatched,
    deleteWatched,
    addBookmarked,
  } = useContext(AuthContext) as {
    userData : UserData;
    logout: () => void;
    deleteBookmarked: (element: { movie: string }) => void;
    deleteToWatch: (element: { movie: string }) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteBookmarkedAndWatched: (element: { movie: string; toString: () => any }) => void;
    deleteWatched: (element: { movie: string }) => void;
    addBookmarked: (element: { movie: string }) => void;
  };

  // ================ HANDLERS ================

  function handleRemoveBookmarked(film_id : string) {
    console.log(film_id)
    deleteBookmarked({ movie: film_id });
    setUserEvent(true);
    // setBookmarkedItems((prevItems) => prevItems.filter((item) => item !== film_id));
    console.log("je passe par la suppression")
  }

  function handleAddBookmarked(film_id : string) {
    addBookmarked({ movie: film_id })
    setUserEvent(true);
    console.log("je passe par l'ajout")

    // setBookmarkedItems((prevItems) => [...prevItems, film_id]);

  }


  function handleClickOut(): void {
    setShowWatchedRoll(false);
    setShowToWatchRoll(false);
  }

  function handleShowWatchedRoll(): void {
    setShowWatchedRoll(true);
  }

  function handleShowToWatchRoll(): void {
    setShowToWatchRoll(true);
  }

  function handleDeleteProfile(): void {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', userData.id);
      axios
        .delete(
          `https://deploy-back-kinomatch.herokuapp.com/deleteAccount?${searchParams.toString()}`
        )
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

  function handleLogout(): void {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', userData.id);
      axios
        .get(
          `https://deploy-back-kinomatch.herokuapp.com/logout?${searchParams.toString()}`
        )
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
    function handleResize(): void {
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
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // =========================== WatchedMovies

  // =========================== WATCHEDLIST

  useEffect(() => {
    load();
    // console.log(isLoading);

    const searchParams = new URLSearchParams();
    searchParams.append('userID', userData.id);
    axios
      .get(
        `https://deploy-back-kinomatch.herokuapp.com/watchedMovies?${searchParams.toString()}`
      )
      .then(({ data }) => {
        // console.log(data);
        setWatchedList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================== MOVIES

  useEffect(() => {
    const fetchMovieTitles = async () => {
      try {
        const requests = watchedList.map((watchedListItem) => {
          const searchParams = new URLSearchParams();
          searchParams.append('movieID', watchedListItem?.film_id ?? '');
          return axios.get(
            `https://deploy-back-kinomatch.herokuapp.com/detail?${searchParams.toString()}`
          );
        });

        Promise.all(requests)
          .then((responses) => {
            const moviesToAdd = responses.map(({ data }) => ({
              name: data.title,
              movie_id: data.id,
            }));

            // Utiliser un objet pour stocker les films uniques
            const uniqueMovies: Record<string, { name: string; movie_id?: string }> = {};

            // Parcourir la liste des films à ajouter
            moviesToAdd.forEach((movie) => {
              // S'il n'existe pas, l'ajouter à l'objet uniqueMovies
              uniqueMovies[movie.movie_id?.toString()] = movie;
            });

            setWatchedMovies(uniqueMovies as WatchedMoviesObject);
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

  console.log(bookmarkedList)

  // =========================== BOOKMARKED (COEUR)

  useEffect(() => {
    const fetchMoviesBookmarked = async () => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('userID', userData.id);
        await axios
          .get(
            `https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies?${searchParams.toString()}`
          )
          .then(({ data }) => {
            // Utiliser un objet pour stocker les films uniques
            const bookmarked: BookmarkedListObject = {};
            data.forEach((element: any) => {
              const key = element.film_id?.toString();
              bookmarked[key] = element as BookmarkedItem;
            });
            setBookmarkedList(bookmarked);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setUserEvent(false);
          });
      } catch (error) {
        console.error(error);
      }
    };
  
    // if (userEvent) {
      fetchMoviesBookmarked();
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEvent]);
  
  console.log(bookmarkedList)


  // =========================== TOWATCHLIST

  useEffect(() => {
    load();
    // console.log(isLoading);

    const searchParams = new URLSearchParams();
    searchParams.append('userID', userData.id);
    axios
      .get(
        `https://deploy-back-kinomatch.herokuapp.com/toWatchMovies?${searchParams.toString()}`
      )
      .then(({ data }) => {
        // console.log(data);
        setToWatchList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================== TOWATCHLISTWITHNAME

  useEffect(() => {
    const fetchMovieTitles = async () => {
      try {
        const requests = toWatchList.map((toWatchListItem) => {
          const searchParams = new URLSearchParams();
          searchParams.append('movieID', toWatchListItem.film_id);
          return axios.get(
            `https://deploy-back-kinomatch.herokuapp.com/detail?${searchParams.toString()}`
          );
        });

        Promise.all(requests)
          .then((responses) => {
            const moviesToAdd = responses.map(({ data }) => ({
              name: data.title,
              movie_id: data.id,
            }));
            const uniqueMovies = {};
            moviesToAdd.forEach((movie) => {
              uniqueMovies[movie.movie_id?.toString()] = movie;
            });
            setToWatchMovies(uniqueMovies);
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

console.log(toWatchList)

  //==========

  return (
    <div className='Profile-container'>
      <div className='Profile-container__personnal'>
        <div className='Profile-container__personnal__infos'>
          {/* <h2 className='Profile-container__personnal__infos__title'>Profil</h2> */}
          <div className='Profile-container__personnal__infos__pictureemailpassword'>
            <div className='Profile-container__personnal__circle'>
              <img
                src='images/SamplePicCircle.png'
                alt='Image de profil par defaut'
              ></img>
            </div>
            <div className='Profile-container__personnal__pictureemailpassword__emailpassword'>
              <div className='Profile-container__personnal__pictureemailpassword__emailpassword__email'>
                <span>Adresse email</span>
                <div>{userData.email}</div>
              </div>
              <div className='Profile-container__personnal__pictureemailpassword__emailpassword__password'>
                <span>Mot de passe</span>
                <div>∗∗∗∗∗∗∗</div>
              </div>
            </div>
          </div>
          {!mobileVersion && (
            <div className='Profile-container-buttons'>
              <button
                className='Profile-container-buttons-button'
                onClick={handleLogout}
              >
                Se déconnecter
              </button>
              <button
                className='Profile-container-buttons-button'
                onClick={handleDeleteProfile}
              >
                Supprimer profil
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <div className="Profile-container__favoritefilters">
          <h3 className="Profile-container__favoritefilters__title">Filtres favoris </h3>
        </div> */}

      {((showWatchedRoll && mobileVersion) ||
        (showToWatchRoll && mobileVersion) ||
        !mobileVersion) && (
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
          ></div>
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
            // setToWatchMovies={setToWatchMovies}
            deleteToWatch={deleteToWatch}
            deleteBookmarkedAndWatched={deleteBookmarkedAndWatched}
            bookmarkedList={bookmarkedList}
            deleteBookmarked={deleteBookmarked}
            addBookmarked={addBookmarked}

            handleRemoveBookmarked={handleRemoveBookmarked}
            handleAddBookmarked={handleAddBookmarked}
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
            <i className='fa-solid fa-xmark'></i>À voir
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
