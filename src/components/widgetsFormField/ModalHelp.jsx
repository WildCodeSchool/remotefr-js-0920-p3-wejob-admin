import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
      <Modal isOpen={showModal} ariaHideApp={false}>
        <button type="button" onClick={handleCloseModal}>
          Fermer
        </button>
        {content}
      </Modal>
    </div>
  );
}

ModalHelp.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ModalHelp;
