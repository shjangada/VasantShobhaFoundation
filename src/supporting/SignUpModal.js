import React, { useState } from 'react';
import '/Users/shreyajangada/vasant-shobha/src/style/SignUpModal.css'; // Use a relative path for the CSS file

const SignUpModal = ({ classEntry, closeModal, onSubmit }) => {
  const [kidName, setKidName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [district, setDistrict] = useState('');

  const handleSubmit = () => {
    const formData = {
      kidName,
      parentName,
      phoneNumber,
      district,
      className: classEntry.Class,
    };
    onSubmit(formData);
    closeModal();
  };
  
  return (
    <div className="modal">
      <div className="registration-form">
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="registration-form">
          <header>
            <h1>Sign Up</h1>
            <p>Fill in all information</p>
          </header>
          <form>
            <div className="input-section kid-name-section">
              <input
                type="text"
                placeholder="ENTER KID'S NAME HERE"
                value={kidName}
                onChange={(e) => setKidName(e.target.value)} 
                required
              />
            </div>
            <div className="input-section parent-name-section">
              <input
                type="text"
                placeholder="ENTER PARENT'S NAME HERE"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)} 
                required
              />
            </div>
            <div className="input-section phone-number-section">
              <input
                type="text"
                placeholder="ENTER PHONE NUMBER HERE"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)} 
                required
              />
            </div>
            <div className="input-section district-section">
              <input
                type="text"
                placeholder="ENTER DISTRICT HERE"
                value={district}
                onChange={(e) => setDistrict(e.target.value)} 
                required
              />
            </div>
            <div className="input-section class-section">
              <input
                type="text"
                placeholder="CLASS NAME"
                value={classEntry.Class}
                readOnly
              />
            </div>
            <div className="cancel-submit-container">
              <button type="button" onClick={handleSubmit} className="submit-button">Submit</button>
              <button type="button" onClick={closeModal} className="cancel-button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
