import './LegalModal.scss';

{/* Création de l'interface pour Typescript */}
interface LegalModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

{/* Fonction permettant de cacher la modale LeagalModal */}
function LegalModal(props: LegalModalProps) {
  const { showModal, setShowModal } = props;

  {/* Fonction permettant de manipuler la modale. Au clique ==> passe de true à false et inversement */}
  const handleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div className='container'>
      <div className='legalModal'>
        <h2 className='legalModal__title'>Mentions légales</h2>
        <p
          className='legalModal__content'>`Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eius, iusto tempore eveniet quasi impedit at exercitationem itaque animi voluptatem, perspiciatis hic magnam blanditiis beatae in repudiandae nesciunt consectetur. Possimus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eius, iusto tempore eveniet quasi impedit at exercitationem itaque animi voluptatem, perspiciatis hic magnam blanditiis beatae in repudiandae nesciunt consectetur. Possimus?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eius, iusto tempore eveniet quasi impedit at exercitationem itaque animi voluptatem, perspiciatis hic magnam blanditiis beatae in repudiandae nesciunt consectetur. Possimus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eius, iusto tempore eveniet quasi impedit at exercitationem itaque animi voluptatem, perspiciatis hic magnam blanditiis beatae in repudiandae nesciunt consectetur. Possimus?`
        </p>
        <button className='legalModal__button' onClick={handleModal}>Retour</button>
      </div>
    </div>

  )
}

export default LegalModal;



