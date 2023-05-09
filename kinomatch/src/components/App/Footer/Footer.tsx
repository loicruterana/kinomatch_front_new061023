import { useState } from 'react';
import './styles.scss';


function Footer() {

const [ showModal, setShowModal ] = useState(false);

  return (
    <footer className='footer'>
      <div className='footer-content'>
        <p className='footer-content--copyright'>Copyright © 2023 KinoMatch</p>
        <a className='footer-content--contact' href="#">Contact</a>
        <a className='footer-content--legal' href="#">Mentions légales</a>
      </div>
    </footer>
  )
}

export default Footer;