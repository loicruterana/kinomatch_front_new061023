import './DeleteProfileModale.scss';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserData } from '../../../../utils/interfaces';
import { AuthContext } from '../../../../contexts/AuthContext';
import API_BASE_URL from '../../../../utils/config';
import { useNavigate } from 'react-router-dom';



// Création de l'interface Typescript pour "DeleteProfileModaleProps"
interface DeleteProfileModaleProps {
  showDeleteProfileModale: boolean;
  setShowDeleteProfileModale: (showDeleteProfileModale: boolean) => void;
}

// Fonction permettant de cacher la modale DeleteProfileModale
function DeleteProfileModale(props: DeleteProfileModaleProps) {
  
  // ================ IMPORT PROPS CONTEXTS ================

  const { userData } = useContext(AuthContext) as {
    userData: UserData;
    addUserData: (email: string, id: string, picture: string) => void;
    clearUserData: () => void;
  };

  const navigate: (path: string) => void = useNavigate();

  const { showDeleteProfileModale, setShowDeleteProfileModale } = props;

  // Fonction permettant de manipuler la modale. Au click ==> passe de true à false et inversement
  const handleDeleteProfileModale = () => {
    setShowDeleteProfileModale(!showDeleteProfileModale);
  };

  
  const [isConfirmed, setIsConfirmed] = useState(false);

  //handler pour supprimer profil
  function handleDelete(): void {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('userID', userData.id);
        console.log(userData.id);
        axios
          .delete(`${API_BASE_URL}/deleteAccount?${searchParams.toString()}`)
          .then(() => {
            // on rafraîchit la page pour que le cookie soit supprimé
            navigate(`/`);
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    } 

  function showConfirmationMessage(): void {

    setIsConfirmed(true);
    // je lance la fonction de suppression au bout de 2 secondes
    setTimeout(handleDelete, 2000);
  }


return ( 
        <div className="delete-profile-modal">
            {isConfirmed ? (
                <div className="delete-profile-modal__content">
                  <h2>Votre compte a bien été supprimé</h2>
                </div> 
            ) : (
                  <div className="delete-profile-modal__content">
                    <h2>Etes-vous sûr de vouloir supprimer votre profil?</h2>
                    <div className="modal-buttons">
                      <button className ="modal-buttons__button" onClick={showConfirmationMessage}>Valider</button>
                      <button className ="modal-buttons__button" onClick={handleDeleteProfileModale}>Annuler</button>
                    </div> 
                </div>
              )}
        </div>
      )
    }

export default DeleteProfileModale;