// YouthClasses.js
import React from 'react';
import NavBar from './NavBar'; // Import the NavBar component
import ClassList from './ClassList.js';


const YouthClasses = () => (
  <div>
    <NavBar />
    <h2>Youth Classes</h2>
    <ClassList csvlink="./sfiles/YouthClasses.csv" />
  </div>
);


export default YouthClasses;
