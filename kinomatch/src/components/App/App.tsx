import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import CreateProfile from './CreateProfile/CreateProfile';

import { Routes, Route } from 'react-router-dom';		



import './App.scss';

function App() {

  return (
    <>
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
        {/* <Route
          path="/movie-page"
          element={<MoviePage/>}
        />      */}
      </Routes>

      <Footer />          
    </>
  )
}

export default App;