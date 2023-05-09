import { useState } from 'react';
import LegalModal from './LegalModal/LegalModal';

import './styles.scss';


function Footer() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(showModal => !showModal);
  }

  return (
    <footer className='footer'>
      <div className='footer-content'>
        <p className='footer-content--copyright'>Copyright © 2023 KinoMatch</p>
        <a className='footer-content--contact' href="#">Contact</a>
        <button className='footer-content--legal' onClick={openModal}>Mentions légales</button>
      </div>
    </footer>
  )
}



export default Footer;