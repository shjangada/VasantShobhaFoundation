import React from 'react';
import './style/SignUpModal.css'; // Use a relative path for the CSS file

const EventsModal = ({ closeModal }) => {
  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <iframe
          src="https://form.jotform.com/242300202386140"
          title="Events form"
          width="100%"
          height="500"
          frameBorder="0"
          allow="camera; microphone; autoplay; encrypted-media;"
        ></iframe>
        <button type="button" onClick={handleCancel} className="cancel-button">X</button>
      </div>
    </div>
  );
};

export default EventsModal;
