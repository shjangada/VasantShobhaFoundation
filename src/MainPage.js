import React from 'react';
import './NavBar'; // Import the NavBar component
import './supporting/style/MainPage.css'; // for MainPage.js
import './supporting/style/Footer.css'; // for Footer.js
import NavBar from './NavBar'; // Import the NavBar component
import Footer from './Footer'

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
      <img src="https://static-00.iconduck.com/assets.00/open-book-emoji-1024x769-oyfx263r.png" alt="Book Emoji" className="book-img" />
      <p className="info-title">MISSION</p>
      <p className="info-p">The Vasant Shobha Foundation was established with the mission to provide quality education to people of all ages. We believe in the power of education to transform lives and communities, fostering opportunities for growth, empowerment, and societal advancement.</p>
    </div>
    <div className="info-box">
      <img src="https://i.pinimg.com/originals/51/b8/28/51b828dea556424bcd9fcf7838e44976.png" alt="Team Emoji" className="team-img" />
      <p className="info-title">VISION</p>
      <p className="info-p">Our dedicated team of educators and volunteers, many of whom hail from similar backgrounds as those we serve, bring a unique perspective and deep understanding of the challenges faced by our community members. They serve as mentors and role models, inspiring students to reach their full potential despite any obstacles they may encounter. This shared connection creates a supportive environment where individuals feel valued and empowered to pursue their educational goals.</p>
    </div>
    <div className="info-box">
      <img src="https://www.shutterstock.com/shutterstock/videos/1006810768/thumb/7.jpg?ip=x480" alt="Handshake Emoji" className="handshake-img" />
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
