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
        {content}
        <button type="button" onClick={handleCloseModal} className="btnModal">
          Fermer
        </button>
      </Modal>
    </div>
  );
}

ModalHelp.propTypes = {
  content: PropTypes.element.isRequired,
};

export default ModalHelp;
