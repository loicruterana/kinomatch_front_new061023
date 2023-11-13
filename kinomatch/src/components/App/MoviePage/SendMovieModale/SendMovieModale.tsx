
import { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../../utils/config';
// On importe le authContext
import { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';

import './SendMovieModale.scss';


function SendMovieModale(props: any) {
  const {
    movie,
    closeModale,
  } = props;

  const { userData } = useContext(AuthContext); 


  // ================ USESTATE ================

  const [userList, setUserList] = useState<any>([]);
  const [userListFiltered, setUserListFiltered] = useState<any>([]);
  const [usersTable, setUsersTable] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<any>([]);

  // ================ FUNCTIONS ================

  // fonction permettant de manipuler la modale. Au clique on passe de true à false et inversement
  const handleModale = () => {
    closeModale();
  };

  // fonction permettant de générer une clé unique
  function generateUniqueKey(): number {
    const uniqueKey = Math.floor(Math.random() * 1000000);
    return uniqueKey;
  }

  // fonction permettant de récupérer l'id de l'utilisateur sélectionné et de l'ajouter dans le contexte
  const handleSelectedUserClick = (event: any) => {
    // On récupère l'id de l'utilisateur sélectionné via son data-id
    const selectedUserId = event.target.dataset.id;
    // On met à jour le useState "selectedUserId" avec l'id de l'utilisateur sélectionné
    setSelectedUserId(selectedUserId);
  };

  // fonction permettant, au click, d'envoyer les informations de l'utilisateur connecté, de l'utilisateur sélectionné et de l'id du film sélectionné dans la BDD
  const handleSendMovieClick = () => {
    // On récupère l'id du film sélectionné
    const movieID = movie;
    // On récupère l'id de l'utilisateur sélectionné
    const receiverUserID = selectedUserId;
    // On récupère l'id de l'utilisateur connecté
    const senderUserID = userData.id;
    // On créé un objet contenant l'id du film sélectionné, l'id de l'utilisateur connecté et l'id de l'utilisateur sélectionné
    const data = {
      movieID,
      senderUserID,
      receiverUserID,
    };

    // On envoie l'objet data dans la BDD
    axios.post(`${API_BASE_URL}/recommendedFilms`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // On ferme la modale
    closeModale();
  };

  // ================ USEEFFECT ================

  // UseEffect pour récupérer les différents utilisateurs

  useEffect(() => {
    
    axios.get(`${API_BASE_URL}/users`)
      .then((response) => {
        setUserList(response.data);
        const usersTable = response.data.userList.map((user: any) => {
          return user;
        }
        );
        setUsersTable(usersTable);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // UseEffect pour filtrer les utilisateurs en fonction de la recherche de l'utilisateur

  useEffect(() => {
    // if (effectRan.current === true) {

    // Fonction permettant de chercher les utilisateurs en fonction de la recherche de l'utilisateur
    // On récupère l'input de recherche
    const searchUser = document.getElementById('searchUsers');
    // On place un écouteur d'évenements sur l'input de recherche
    const handleInputChange = (event: any) => {
      const searchValue = event.target.value.toLowerCase();
      setSearchValue(searchValue);

      // On récupère le mail de chaque utilisateur
      // const usersEmail = usersTable.map((user: any) => {
      //   return user.email;
      // }
      // );
      
      // On vient stocker l'objet correspondant à l'utilisateur dont le mail correspond à la recherche de l'utilisateur
      const machedUsers = usersTable.filter((user: any) => {
        return user.email.toLowerCase().includes(searchValue);
      }
      );
      // On met à jour le useState "userListFiltered" avec le tableau des utilisateurs dont le mail correspond à la recherche de l'utilisateur
      setUserListFiltered(machedUsers);
    };
    searchUser?.addEventListener('input', handleInputChange);

    return () => {
      searchUser?.removeEventListener('input', handleInputChange);
    };
    // }
    // return () => {
    //   effectRan.current = true;
    // };
  }, [userList, userListFiltered, searchValue, usersTable]);
  
  return (
    <div className='sendMovieModale__container'>
      <div className='sendMovieModale__container-form'>
        <input className='sendMovieModale__container-form--input' id='searchUsers' type='text' placeholder='Rechercher un utilisateur' />
        <ul className='sendMovieModale__container-form--input---unorderedList'>
          {userListFiltered.map((user: any) => {
            return (
              <li 
                className='sendMovieModale__container-form--input---list'
                key={generateUniqueKey()}
                onClick={handleSelectedUserClick}
                data-id={user.id}
                >
                {user.email}

              </li>
            );
          }
          )}
        </ul>
        <div className='sendMovieModale__container-form--buttons'>
          <button className='sendMovieModale__container-form--buttons---sendButton' onClick={handleSendMovieClick} >Envoyer
          </button>
          <button className='sendMovieModale__container-form--buttons---cancelButton' onClick={handleModale}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

export default SendMovieModale;
