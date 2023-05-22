import { Route, Routes } from 'react-router-dom';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import MoviePage from './MoviePage/MoviePage';
// import Home from './Home/Home';
// import CreateProfile from './CreateProfile/CreateProfile';
import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import { AuthProvider } from '../../contexts/AuthContext';
import { LoadingProvider } from '../../contexts/LoadingContext';
import { SelectedGenreFiltersProvider } from '../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersProvider } from '../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersProvider } from '../../contexts/SelectedDecadeFiltersContext';
import { EmailProvider } from '../../contexts/EmailContext';
import { FetchedDataProvider } from '../../contexts/FetchedDataContext';



// import { Routes, Route } from 'react-router-dom';		


import './App.scss';

function App() {

  return (

    <FetchedDataProvider>
      <EmailProvider>

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
                    <Route
                      path="/signup"
                      element={<Signup />}
                    />
                    <Route
                      path="/login"
                      element={<Login />}
                    />
                    {/* <Route
              path="/movie-page"
              element={<MoviePage/>}
            />      */}

                  </Routes>

                  <Footer />
                </LoadingProvider>
              </AuthProvider>
            </SelectedGenreFiltersProvider>
          </SelectedProviderFiltersProvider>
        </SelectedDecadeFiltersProvider>
      </EmailProvider>
    </FetchedDataProvider>

  )
}

export default App;
