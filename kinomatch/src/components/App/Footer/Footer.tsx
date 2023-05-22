import { useState } from 'react';
import LegalModal from './LegalModal/LegalModal';
import './styles.scss';

{/* Fonction permettant l'affichage du Footer */}
function Footer() {
  const [showModal, setShowModal] = useState(false);

  {/* Fonction permettant de manipuler la modale. Au clique ==> passe de true à false et inversement */}
  const handleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <footer className='footer'>
      <div className='footer__content'>
      {/* Lorsque "showModal" est falsy, alors les éléments du footer s'affichent, sinon ils ne s'éxécutent pas */}
        {
          !showModal &&
          <>
            <p className='footer__content-copyright'>© 2023 KinoMatch</p>
            <a className='footer__content-contact' href="mailto:fakeAdress@mail.fr">Contact</a>
            <button className='footer__content-legal' onClick={handleModal}>Mentions légales</button>
          </>
        }
      {/* Lorsque "showModal" est truthy, alors la modale "LegalModal" s'affiche et les éléments du footer ne s'affichent pas */}
        {
          showModal && <LegalModal showModal={showModal} setShowModal={setShowModal} />
        }
      </div>
    </footer>
  )
}

export default Footer;