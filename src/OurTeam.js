import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'; // Import the NavBar component
import './supporting/style/OurTeam.css';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import People from './csv/OurTeam.csv';

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(People); // Replace with the actual path to your CSV file
        const text = await response.text();
        const result = Papa.parse(text, { header: true });
        console.log('Parsed CSV data:', result.data); // Log the parsed data
        setTeamMembers(result.data);
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='our-team__body'>
      <NavBar greenBackground={true} /> {/* Pass the greenBackground prop */}
      <h2 className="page-title">Our Team</h2>

      <section className="people-container">
        {teamMembers.map((member, index) => (
          <div className="our-team" key={index}>
            <div className="pic">
              <img src="https://media.licdn.com/dms/image/D4E03AQHkbcS4FqCOqQ/profile-displayphoto-shrink_200_200/0/1713836703758?e=2147483647&v=beta&t=pLzGlnGtd4BFFp9LMKxDq31fzeRH6_lUNj52ylaUPjo" alt="Team Member" />
            </div>
            <div className="details">
              <h3 className="name">{member.Name}</h3>
              <span className="position">{member.Position} | {member.Town}</span>
              <span className="description">{member.Description}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OurTeam;
