import { useState } from 'react';
import LegalModal from './LegalModal/LegalModal';
import FeedbackForm from './FeedbackForm/FeedbackForm';
import './styles.scss';

// Fonction permettant l'affichage du Footer
function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Fonction permettant de manipuler la modale de legalModal. Au clique ==> passe de true à false et inversement
  const handleModal = () => {
    setShowModal(!showModal);
  };

  // Fonction permettant de manipuler la modale du Feedback. Au clique ==> passe de true à false et inversement
  const handleFeedbackModal = () => {
    setShowFeedbackModal(!showFeedbackModal);
  };

  return (
    <footer className='footer'>
    <div className='footer__content'>
        {/* Lorsque "showModal" est falsy, alors les éléments du footer s'affichent, sinon ils ne s'éxécutent pas */}
        {(!showFeedbackModal && !showModal) && (
          <>
            <p className='footer__content-copyright'>© 2023 KinoMatch</p>
            <a
              className='footer__content-contact'
              href='mailto:lruterana@gmail.com'
            >
              Contact
            </a>
            <button className='footer__content-legal' onClick={handleModal}>
              Mentions légales
            </button>
            <button className='footer__content-feedback' onClick={handleFeedbackModal}>
              Feedback
            </button>
          </>
        )}

        {/* Lorsque "showModal" est truthy, alors la modale "LegalModal" s'affiche et les éléments du footer ne s'affichent pas */}
        {showModal && (
          <LegalModal
            showModal={showModal}
            setShowModal={setShowModal} />
        )}
        {/* Lorsque "showFeedbackModal" est truthy, alors la modale "FeedbackModal" s'affiche et les éléments du footer ne s'affichent pas */}
        {showFeedbackModal && (
          <FeedbackForm
            showFeedbackModal={showFeedbackModal}
            setShowFeedbackModal={setShowFeedbackModal}
          />
        )}

      </div>
    </footer>
  );
}

export default Footer;