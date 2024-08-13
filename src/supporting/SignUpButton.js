import React from 'react';
import './style/SignUpButton.css';

const SignUpButton = ({ onClick }) => {
  return (
    <div className="sign-up-container">
      <button className="custom-btn btn-3" onClick={onClick}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUpButton;
