import React from 'react';
import '/Users/shreyajangada/vasant-shobha/src/style/DescriptionPopup.css';

const DescriptionPopup = ({ classEntry, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{classEntry.Class}</h2>
        <p>{classEntry.Description}</p>
      </div>
    </div>
  );
};

export default DescriptionPopup;
