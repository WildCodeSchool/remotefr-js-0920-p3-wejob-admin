import React, { useState } from 'react';
import Modal from 'react-modal';

function ModalHelp({ content }) {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpenModal}>
        Aide
      </button>
      <Modal isOpen={showModal}>
        <button type="button" onClick={handleCloseModal}>
          Fermer
        </button>
        {content}
      </Modal>
    </div>
  );
}

export default ModalHelp;
