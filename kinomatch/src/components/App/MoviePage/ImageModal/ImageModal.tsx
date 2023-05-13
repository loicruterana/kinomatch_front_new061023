import './ImageModal.scss';

{/* Création de l'interface pour Typescript */ }
interface ImageModalProps {
    showImageModal: boolean;
    setShowImageModal: (showImageModal: boolean) => void;
}

{/* Fonction permettant de cacher la modale ImageModal */ }
function ImageModal(props: ImageModalProps) {
    const { showImageModal, setShowImageModal } = props;

    {/* Fonction permettant de manipuler la modale. Au clique ==> passe de true à false et inversement */ }
    const handleImageModal = () => {
        setShowImageModal(!showImageModal);
    }

    return (
        <div className='imageModal__container'>
          <img className='imageModal__container-image' src='./images/les_gardiens.jpg' alt='Image du film' onClick={handleImageModal}/>
        </div>

    )
}

export default ImageModal;



