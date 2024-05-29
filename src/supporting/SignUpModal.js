import React, { useState } from 'react';
import './style/SignUpModal.css'; // Use a relative path for the CSS file

const SignUpModal = ({ classEntry, closeModal, onSubmit }) => {
  const [kidName, setKidName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [flipCard] = useState(false); // State for flip card animation

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

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div>
      <div className={`contact-wrapper ${flipCard ? 'active' : ''}`}>
        <div className="envelope">
          <div className="back paper"></div>
          <div className="content">
            <div className="form-wrapper">
              <form>
                <div className="top-wrapper">
                  <div className="input">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={kidName}
                      onChange={(e) => setKidName(e.target.value)}
                    />
                  </div>
                  <div className="input">
                    <label>Parent's Name</label>
                    <input
                      type="text"
                      name="parentName"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                    />
                  </div>
                  <div className="input">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="input">
                    <label>District</label>
                    <input
                      type="text"
                      name="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                  <div className="input">
                    <label>Class</label>
                    <input
                      type="text"
                      name="class"
                      value={classEntry.Class}
                      readOnly
                    />
                  </div>
                </div>
                <div className="bottom-wrapper">
                  <div className="button-container">
                    <button type="button" onClick={handleSubmit} className="submit-button-old">Submit</button>
                    <button type="button" onClick={handleCancel} className="cancel-button-old">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="front paper"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
