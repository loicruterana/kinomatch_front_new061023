import './LegalModal.scss';

// Interface LegalModalProps permettant de typer les props du composant LegalModal 
interface LegalModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

// Fonction permettant de cacher la modal LegalModal 
function LegalModal(props: LegalModalProps) {
  const { showModal, setShowModal } = props;

  // Fonction permettant de manipuler la modal. Au clic ==> passe de true à false et inversement 
  const handleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div className='container'>
      <div className='container__legalModal'>
        <div className='container__legalModal__title'>
          <h2>Mentions légales </h2>
          <h3>En vigueur au 30/05/23</h3>
        </div>
        <p>
          Conformément aux dispositions des articles 6-III et 19 de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs, ci-après dénommés "l'Utilisateur", du site www.kinomatch.com, ci-après dénommé "le Site", les présentes mentions légales.</p>

        <p>La connexion et la navigation sur le Site par l’Utilisateur implique l'acceptation intégrale et sans réserve des présentes mentions légales.</p>

        <p>Ces dernières sont accessibles sur le Site à la rubrique « Mentions légales ».</p>

        <h4>ARTICLE 1 - L'ÉDITEUR </h4>

        <p>L’édition et la direction de la publication du Site est assurée par Loïc Ruterana, domicilié 76 rue des jonquilles, dont le numéro de téléphone est 0600112233, et l'adresse e-mail lruterana@gmail.com. ci-après "l'ÉDITEUR".</p>

        <h4>ARTICLE 2 - ACCES AU SITE</h4>

        <p>Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découlant d’une nécessité de maintenance. En cas de modification, interruption ou suspension du Site, l'Éditeur ne saurait être tenu responsable. </p>

        <h4>ARTICLE 3 - COLLECTE DES DONNÉES </h4>

        <p>Le site est exempté de déclaration à la Commission Nationale Informatique et Libertés (CNIL) dans la mesure où il ne collecte aucune donnée concernant les utilisateurs. Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site, sans autorisation de l’Editeur est prohibée et pourra entraînée des actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil. </p>

      </div>
      <div className='container__legalModal__button--container'>
        {/* Au clic ==> passe de true à false et inversement */}
        <button className='container__legalModal__button--container---btn' onClick={handleModal}>Retour</button>
      </div>
    </div>

  )
}

export default LegalModal;



