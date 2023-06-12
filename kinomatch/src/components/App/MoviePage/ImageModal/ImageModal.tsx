import './ImageModal.scss';

{/* Création de l'interface pour Typescript */ }
interface Movie {
    id: string;
    title: string;
    poster_path: string;
    }

interface ImageModalProps {
    showImageModal: boolean;
    setShowImageModal: (showImageModal: boolean) => void;
    movie: Movie | null;
}

{/* Fonction permettant de cacher la modale ImageModal */ }
function ImageModal(props: ImageModalProps) {
    const { showImageModal, setShowImageModal, movie } = props;

    {/* Fonction permettant de manipuler la modale. Au clique ==> passe de true à false et inversement */ }
    const handleImageModal = () => {
        setShowImageModal(!showImageModal);
    }

    return (
        <div className='imageModal__container'>
          <img className='imageModal__container-image' src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt={`Image du film: ${movie?.title}`} onClick={handleImageModal}/>
        </div>

    )
}

export default ImageModal;



