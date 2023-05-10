import { useState } from 'react';
import LegalModal from './LegalModal/LegalModal';
import './styles.scss';

function Footer() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <footer className='footer'>
      <div className='footer__content'>
      {
        !showModal && 
        <>
          <p className='footer__content-copyright'>Copyright © 2023 KinoMatch</p>
          <a className='footer__content-contact' href="mailto:fakeAdress@mail.fr">Contact</a>
          <button className='footer__content-legal' onClick={handleModal}>Mentions légales</button>
        </>
      }
        {
          showModal && <LegalModal showModal={showModal} setShowModal={setShowModal} />
        }
      </div>
    </footer>
  )
}

export default Footer;