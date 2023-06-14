import { Route, Routes } from 'react-router-dom';

import Header from './Header/Header';
import MoviePage from './MoviePage/MoviePage';
// import Home from './Home/Home';
// import CreateProfile from './CreateProfile/CreateProfile';
import Home from './Home/Home';
// import Login from './Login/Login';
// import Signup from './Signup/Signup';
// import Profile from './Profile/Profile';

import { AuthProvider } from '../../contexts/AuthContext';
import { LoadingProvider } from '../../contexts/LoadingContext';
import { SelectedGenreFiltersProvider } from '../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersProvider } from '../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersProvider } from '../../contexts/SelectedDecadeFiltersContext';
import { CurrentMovieIdProvider } from '../../contexts/CurrentMovieIdContext';
import { NoResultProvider } from '../../contexts/NoResultContext';



// import { Routes, Route } from 'react-router-dom';		


import './App.scss';
import PageNotFound from './PageNotFound/PageNotFound';

function App() {

  return (
    <NoResultProvider>
      <CurrentMovieIdProvider>
        <SelectedDecadeFiltersProvider>
          <SelectedProviderFiltersProvider>
            <SelectedGenreFiltersProvider>
              <AuthProvider>
                <LoadingProvider>
                  <Header />
                  <Routes>
                    <Route
                      path="/"
                      element={<Home />}
                    />
                    <Route
                      path="/films"
                      element={<MoviePage />}
                    />
                    {/* <Route
                      path="/signup"
                      element={<Signup />}
                    /> */}
                    {/* <Route
                      path="/login"
                      element={<Login />}
                    /> */}
                    {/* <Route
                      path="/profile"
                      element={<Profile />}
                    /> */}
                    <Route
                      path="*"
                      element={<PageNotFound />}
                    />

                  </Routes>
                </LoadingProvider>
              </AuthProvider>
            </SelectedGenreFiltersProvider>
          </SelectedProviderFiltersProvider>
        </SelectedDecadeFiltersProvider>
      </CurrentMovieIdProvider>
    </NoResultProvider>

  )
}

export default App;
