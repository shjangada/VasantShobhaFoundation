import React from 'react';
import { Link } from 'react-router-dom';
import './supporting/style/MainPage.css';
import NavBar from './NavBar';
import Footer from './Footer';
import { Compass, RocketLaunch, Target } from '@phosphor-icons/react';

const Header = () => {
  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <header className="header">
      <div className="header-overlay" aria-hidden="true" />
      <div className="header-titles">
        <p className="header-eyebrow">Community · Education · Seva</p>
        <div className="header-title">Vasant Shobha</div>
        <div className="header-title">Foundation</div>
        <div className="header-subtitle">वसंत शोभा फाउंडेशन</div>
        <div className="header-actions">
          <Link to="/events" className="header-cta header-cta--primary">
            Explore Events
          </Link>
          <Link to="/involved" className="header-cta header-cta--secondary">
            Get Involved
          </Link>
        </div>
      </div>
      <button type="button" className="down-arrow" onClick={scrollDown} aria-label="Scroll down">
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </header>
  );
};

const FoundationInfo = () => (
  <div className="foundation-info">
    <h1>Welcome to the Vasant Shobha Foundation</h1>
    <p className="foundation-lead">
      Quality education, cultural grounding, and community care — for people of all ages.
    </p>
    <HeaderBoxes />
  </div>
);

const HeaderBoxes = () => (
  <div className="info-container">
    <div className="info-box">
      <Compass size={64} color="#193d09" weight="duotone" className="team-img" />
      <p className="info-title">MISSION</p>
      <p className="info-p">
        The Vasant Shobha Foundation was established with the mission to provide quality education to
        people of all ages. We believe in the power of education to transform lives and communities,
        fostering opportunities for growth, empowerment, and societal advancement. Through our
        diverse programs and initiatives, we strive to create a world where knowledge is accessible
        to all, enabling individuals to reach their full potential and contribute meaningfully to
        society.
      </p>
    </div>
    <div className="info-box">
      <RocketLaunch size={64} color="#193d09" weight="duotone" className="team-img" />
      <p className="info-title">VISION</p>
      <p className="info-p">
        Our dedicated team of educators and volunteers, many of whom hail from similar backgrounds as
        those we serve, bring a unique perspective and deep understanding of the challenges faced by
        our community members. They serve as mentors and role models, inspiring students to reach
        their full potential despite any obstacles they may encounter. This shared connection creates
        a supportive environment where individuals feel valued and empowered to pursue their
        educational goals.
      </p>
    </div>
    <div className="info-box">
      <Target size={64} color="#193d09" weight="duotone" className="team-img" />
      <p className="info-title">ACTION</p>
      <p className="info-p">
        We partner with local schools, community centers, and other organizations to offer a variety
        of educational opportunities. Together, we develop innovative initiatives tailored to the
        specific needs of each group, fostering a culture of lifelong learning and empowerment.
        Additionally, these partnerships enable us to leverage resources and expertise, maximizing
        the impact of our educational efforts and creating lasting change in the communities we
        serve.
      </p>
    </div>
  </div>
);

function MainPage() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <FoundationInfo />
      <Footer />
    </div>
  );
}

export default MainPage;
