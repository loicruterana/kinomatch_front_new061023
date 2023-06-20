import './ImageModal.scss';

// Création de l'interface Typescript pour "Movie"
interface Movie {
    id: string;
    title: string;
    poster_path: string;
}

// Création de l'interface Typescript pour "ImageModalProps"
interface ImageModalProps {
    showImageModal: boolean;
    setShowImageModal: (showImageModal: boolean) => void;
    movie: Movie | null;
}

// Fonction permettant de cacher la modale ImageModal
function ImageModal(props: ImageModalProps) {
    const { showImageModal, setShowImageModal, movie } = props;

    // Fonction permettant de manipuler la modale. Au click ==> passe de true à false et inversement
    const handleImageModal = () => {
        setShowImageModal(!showImageModal);
    }

    return (
        <div className='imageModal__container'>
            {/* Si showImageModal est true alors affiche la modale ImageModal et au clic éxécute handleImageModal */}
            <img className='imageModal__container-image' src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt={`Image du film: ${movie?.title}`} onClick={handleImageModal} />
        </div>

    )
}

export default ImageModal;



