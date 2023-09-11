import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
// j'importe le fichier scss correspondant au composant
import './FeedbackForm.scss';
// Interface FeedbackFormProps permettant de typer les props du composant FeedbackForm
interface FeedbackFormProps {
    showFeedbackModal: boolean;
    setShowFeedbackModal: (showFeedbackModal: boolean) => void;
}
// Fonction permettant de cacher la FeedbackModal FeedbackForm
function FeedbackForm(props: FeedbackFormProps) {
    const { showFeedbackModal, setShowFeedbackModal } = props;
    // Fonction permettant de manipuler la FeedbackModal. Au clique ==> passe de true à false et inversement
    const handleFeedbackModal = () => {
        setShowFeedbackModal(!showFeedbackModal);
    };
    
    // Fonction permettant d'envoyer un email via EmailJS
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();

      emailjs.sendForm('service_twmabe6', 'template_u67rdgj', form.current, 'I0havWHpVhlzwlI9_')
        .then((result) => {
            console.log(result.text);
            handleFeedbackModal();
        }, (error) => {
            console.log(error.text);
        });
      };

    return (
        <div className='container'>
           
            <h1 className='container_title'>Feedback</h1>
        
            <form className='container_form' ref={form} onSubmit={sendEmail}>
              <label className='container_form_title'>Auteur</label>
              <input className='container_form__element_user' type="text" name="user_name" />
              <label className='container_form_title'>Commentaire</label>
              <textarea className='container_form__element_message' name="message" />
              <input className='container_form__element_submit' type="submit" value="Envoyer" />
            </form>


            <div className='container__legalModal__button--container'>
              {/* Au clic ==> passe de true à false et inversement */}
              <button
                className='container__legalModal__button--container---btn'
                onClick={handleFeedbackModal}
              >
                Retour
              </button>
            
          </div>
        </div>
    );
}

export default FeedbackForm;