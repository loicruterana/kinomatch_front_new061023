// ================ IMPORT BIBLIOTHEQUES ================

import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

// ================ IMPORT COMPOSANTS ================

import Header from './Header/Header';
import MoviePage from './MoviePage/MoviePage';
// import Home from './Home/Home';
// import CreateProfile from './CreateProfile/CreateProfile';
import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Profile from './Profile/Profile';
import SearchResults from './SearchResults/SearchResults';
import PageNotFound from './PageNotFound/PageNotFound';
import CookieConsentModal from './CookieConsentModal/CookieConsentModal';

// ================ IMPORT CONTEXTS ================

import { AuthProvider } from '../../contexts/AuthContext';
import { LoadingProvider } from '../../contexts/LoadingContext';
import { SelectedGenreFiltersProvider } from '../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersProvider } from '../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersProvider } from '../../contexts/SelectedDecadeFiltersContext';
import { SelectedNotationFiltersProvider } from '../../contexts/SelectedNotationFiltersContext';
import { SelectedNationalityFiltersProvider } from '../../contexts/SelectedNationalityFiltersContext';
import { CurrentMovieIdProvider } from '../../contexts/CurrentMovieIdContext';
import { NoResultProvider } from '../../contexts/NoResultContext';

// ================ IMPORT SCSS ================

import './App.scss';
import NoResult from './NoResult/NoResult';
import { Cookies } from 'react-cookie';

//* ================ COMPOSANT ================

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <CookieConsentModal />
      <NoResultProvider>
        <CurrentMovieIdProvider>
          <SelectedDecadeFiltersProvider>
            <SelectedProviderFiltersProvider>
              <SelectedGenreFiltersProvider>
                <SelectedNotationFiltersProvider>
                  <SelectedNationalityFiltersProvider>
                    <AuthProvider>
                      <LoadingProvider>
                        <Header />
                        <Routes>
                          <Route path='/' element={<Home />} />
                          <Route path='/films' element={<MoviePage />} />
                          <Route path='/signup' element={<Signup />} />
                          <Route path='/login' element={<Login />} />
                          <Route path='/profile' element={<Profile />} />
                          <Route path='/noresult' element={<NoResult />} />
                          <Route path='*' element={<PageNotFound />} />
                          <Route path='/searchresults' element={<SearchResults />} />
                        </Routes>
                      </LoadingProvider>
                    </AuthProvider>
                  </SelectedNationalityFiltersProvider>
                </SelectedNotationFiltersProvider>
              </SelectedGenreFiltersProvider>
            </SelectedProviderFiltersProvider>
          </SelectedDecadeFiltersProvider>
        </CurrentMovieIdProvider>
      </NoResultProvider>
    </div>
  );
  //* ================ FERMETURE COMPOSANT ================
}

export default App;
