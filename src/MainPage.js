import React from 'react';
import './style/MainPage.css';  // Consolidated CSS file
import NavBar from './NavBar'; // Import the NavBar component

const Header = () => (
  <header className="header">
    <div className="overlay"></div>
    <div className="header-titles">
      <div className="header-title">Vasant Shobha Foundation</div>
      <div className="header-title">वसंत शोभा फाउंडेशन</div>
    </div>
  </header>
);

const AboutUs = () => (
  <div className="aboutus">
    <div className="aboutus-content">
      <div className="aboutus-title">About Us</div>
      <div className="aboutus-body">This foundation was created to improve education</div>
    </div>
  </div>
);

function MainPage() {
  return (
    <div className="App">
      <NavBar /> {/* Add the NavBar component */}
      <Header />
      <AboutUs />
    </div>
  );
}

export default MainPage;
