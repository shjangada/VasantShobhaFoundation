import React from 'react';
import './NavBar'; // Import the NavBar component
import './supporting/style/MainPage.css'; // for MainPage.js
import './supporting/style/Footer.css'; // for Footer.js
import NavBar from './NavBar'; // Import the NavBar component
import Footer from './Footer'
import { ListChecks, RocketLaunch, Target } from '@phosphor-icons/react'; // Import Phosphor Icons


const Header = () => {
  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <header className="header">
      <div className="header-titles">
        <div className="header-title">Vasant Shobha</div>
        <div className="header-title">Foundation</div>
        <div className="header-subtitle">वसंत शोभा फाउंडेशन</div>
      </div>
      <div className="down-arrow" onClick={scrollDown}>
        <img src="https://static.thenounproject.com/png/196759-200.png" alt="Scroll Down" className="scroll-down-img" />
      </div>
    </header>
  );
};


const FoundationInfo = () => (
  <div className="foundation-info">
    <h1>Welcome to the Vasant Shobha Foundation</h1>
    <HeaderBoxes />
  </div>
);

const HeaderBoxes = () => (
  <div className="info-container">
    <div className="info-box">
      <ListChecks size={75} color="#45613D" weight="fill" className="team-img"/>
      <p className="info-title">MISSION</p>
      <p className="info-p">The Vasant Shobha Foundation was established with the mission to provide quality education to people of all ages. We believe in the power of education to transform lives and communities, fostering opportunities for growth, empowerment, and societal advancement. Through our diverse programs and initiatives, we strive to create a world where knowledge is accessible to all, enabling individuals to reach their full potential and contribute meaningfully to society.</p>
    </div>
    <div className="info-box">
      <RocketLaunch size={75} color="#45613D" weight="fill" className="team-img"/>
      <p className="info-title">VISION</p>
      <p className="info-p">Our dedicated team of educators and volunteers, many of whom hail from similar backgrounds as those we serve, bring a unique perspective and deep understanding of the challenges faced by our community members. They serve as mentors and role models, inspiring students to reach their full potential despite any obstacles they may encounter. This shared connection creates a supportive environment where individuals feel valued and empowered to pursue their educational goals.</p>
    </div>
    <div className="info-box">
      <Target size={75} color="#45613D" weight="fill" className="team-img"/>
      <p className="info-title">ACTION</p>
      <p className="info-p">We partner with local schools, community centers, and other organizations to offer a variety of educational opportunities. Together, we develop innovative initiatives tailored to the specific needs of each group, fostering a culture of lifelong learning and empowerment. Additionally, these partnerships enable us to leverage resources and expertise, maximizing the impact of our educational efforts and creating lasting change in the communities we serve.</p>
    </div>
  </div>
);


function MainPage() {
  return (
    <div className="App">
      <NavBar /> {/* Add the NavBar component */}
      <Header />
      <FoundationInfo />
      <Footer />
    </div>
  );
}

export default MainPage;
