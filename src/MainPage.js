import React from 'react';
import './NavBar'; // Import the NavBar component
import './supporting/style/MainPage.css';  // Consolidated CSS file
import NavBar from './NavBar'; // Import the NavBar component


const Header = () => (
  <header className="header">
    <div className="header-titles">
      <div className="header-title">Vasant Shobha Foundation</div>
      <div className="header-title">वसंत शोभा फाउंडेशन</div>
    </div>
  </header>
);

const FoundationInfo = () => (
  <div className="foundation-info">
    <h1>Vasant Shobha Foundation</h1>
    <h4>Empowering Education for All</h4>
    <hr />
    <p className="info-p">The Vasant Shobha Foundation was established with the mission to provide quality education to people of all ages. We believe in the power of education to transform lives and communities.</p>
    <p className="info-p">Our programs range from basic literacy classes to advanced skill development courses, all designed to meet the diverse needs of our community.</p>
    <p className="info-p">We partner with local schools, community centers, and other organizations to offer a variety of educational opportunities.</p>
    <p className="info-p">Our dedicated team of educators and volunteers work tirelessly to ensure that everyone has access to the education they deserve.</p>
    <p className="info-p info-p-final">For more information, contact us at <a href="mailto:info@vasantshobhafoundation.org">info@vasantshobhafoundation.org</a>.</p>
  </div>
);

function MainPage() {
  return (
    <div className="App">
      <NavBar /> {/* Add the NavBar component */}
      <Header />
      <FoundationInfo />
    </div>
  );
}

export default MainPage;
