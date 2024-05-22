import React from 'react';
import '/Users/shreyajangada/vasant-shobha/src/style/SignUpButton.css';

const SignUpButton = ({ onClick }) => {
  return (
    <div className="frame">
      <button className="custom-btn btn-3" onClick={onClick}><span>Sign Up</span></button>
    </div>
  );
};

export default SignUpButton;
