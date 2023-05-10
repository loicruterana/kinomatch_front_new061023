import './LegalModal.scss';


interface LegalModalProps {
  showModal: boolean;
  setShowModal: boolean;
}

function LegalModal(props: LegalModalProps) {
  const { showModal, setShowModal } = props;
  
  const handleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div className='container'>
      <div className='legalModal'>
        <h2 className='legalModal__title'>Mentions légales</h2>
        <p
          className='legalModal__content'>`Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eius, iusto tempore eveniet quasi impedit at exercitationem itaque animi voluptatem, perspiciatis hic magnam blanditiis beatae in repudiandae nesciunt consectetur. Possimus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eius, iusto tempore eveniet quasi impedit at exercitationem itaque animi voluptatem, perspiciatis hic magnam blanditiis beatae in repudiandae nesciunt consectetur. Possimus?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eius, iusto tempore eveniet quasi impedit at exercitationem itaque animi voluptatem, perspiciatis hic magnam blanditiis beatae in repudiandae nesciunt consectetur. Possimus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eius, iusto tempore eveniet quasi impedit at exercitationem itaque animi voluptatem, perspiciatis hic magnam blanditiis beatae in repudiandae nesciunt consectetur. Possimus?`
        </p>
        <button className='legalModal__button' onClick={handleModal}>Retour</button>
      </div>
    </div>

  )
}

export default LegalModal;



