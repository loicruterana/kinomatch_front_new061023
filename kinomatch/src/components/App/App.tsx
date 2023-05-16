import Header from './Header/Header';
import Footer from './Footer/Footer';
import MoviePage from './MoviePage/MoviePage';
// import Home from './Home/Home';
// import CreateProfile from './CreateProfile/CreateProfile';

// import { Routes, Route } from 'react-router-dom';		

import './App.scss';

function App() {

  return (
    <>
      <Header />
      <MoviePage />
      <Footer />          
    </>
  )
}

export default App;

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route
//       element={<Team />}
//       path="teams/:teamId"
//       loader={async ({ params }) => {
//         return fetch(
//           `/fake/api/teams/${params.teamId}.json`
//         );
//       }}
//       action={async ({ request }) => {
//         return updateFakeTeam(await request.formData());
//       }}
//       errorElement={<ErrorBoundary />}
//     />
//   )
// );

// Ce code utilise la bibliothèque React Router pour créer un routeur de navigation pour une application web.

// La première ligne crée un routeur en utilisant la fonction `createBrowserRouter` de React Router.

// La deuxième ligne utilise la fonction `createRoutesFromElements` pour créer des routes à partir d'un élément React. Dans ce cas, l'élément est une route qui correspond à l'URL `/teams/:teamId`.

// La route a plusieurs propriétés, notamment un composant `Team` qui sera rendu lorsque l'URL correspond à cette route, un `loader` qui est une fonction asynchrone qui sera appelée pour charger les
// avatar
// données de l'équipe à partir d'une API fictive, et une fonction `action` qui sera appelée lorsque les données de l'équipe sont soumises via un formulaire.

// Enfin, la route a également un élément `errorElement` qui est un composant qui sera rendu en cas d'erreur.

// Le résultat final est un routeur de navigation qui gère les routes pour l'application web et qui charge les données de l'équipe à partir d'une API fictive.