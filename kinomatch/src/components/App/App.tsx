import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import Signin from './Signin/Signin';
import CreateProfile from './CreateProfile/CreateProfile';
import { AuthProvider } from '../../contexts/AuthContext';
import { LoadingProvider } from '../../contexts/LoadingContext';



import { Routes, Route } from 'react-router-dom';		




import './App.scss';

function App() {

  return (
    <AuthProvider>
      <LoadingProvider>
        <Header />
        <Routes>
          <Route
          path="/"
          element={<Home />}
          />
          <Route
            path="/create-profile"
            element={<CreateProfile/>}
          />      
          <Route
            path="/signin"
            element={<Signin/>}
          />    
          {/* <Route
            path="/movie-page"
            element={<MoviePage/>}
          />      */}
        </Routes>

        <Footer />   
        </LoadingProvider>       
    </AuthProvider>
  )
}

export default App;