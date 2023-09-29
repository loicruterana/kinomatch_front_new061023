// ================ IMPORT BIBLIOTHEQUES ================

import { useCookies } from "react-cookie";

// ================ IMPORT SCSS ================

import "./CookieConsentModal.scss";

//* ================ COMPOSANT ================

function CookieConsentModal() {
  const [cookies, setCookie] = useCookies(['cookieConsent']);

  // On créer la fonction permettant de mettre à jour le consentement des cookies
  const giveCookieConsent = () => {
    setCookie('cookieConsent', true, { path: '/' });
  };

  if (cookies.cookieConsent) {
    return null;
  }
  
  return (
    <div className="cookie-consent-modal__background">
      <div className="cookie-consent-modal">
        <div>
          <p>Nous utilisons des cookies pour améliorer votre expérience. <br /> En utilisant notre site, vous acceptez notre <a href="https://sites.google.com/view/kinomatch-com/accueil" target="blank">politique de confidentialité</a> et l'utilisation de cookies.</p>
          <button onClick={giveCookieConsent}>J'accepte</button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsentModal;
