import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'; // Import the NavBar component
import './supporting/style/OurTeam.css';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import People from './csv/OurTeam.csv';
import Footer from './Footer';

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(People);
        const text = await response.text();
  
        const result = Papa.parse(text, {
          header: true,
          skipEmptyLines: 'greedy',               // ← ignores trailing blank line(s)
          transformHeader: (h) => h.trim(),       // clean headers like "Phone Number"
          transform: (v) => (v ?? '').trim(),     // trim cell whitespace
        });
  
        // Filter out rows with no real content (e.g., the ghost row)
        const cleaned = result.data.filter(
          (row) => row && (row.Name ?? '').trim() !== ''
        );
  
        setTeamMembers(cleaned);
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className='App'>
      <div className='our-team__body'>
        <NavBar greenBackground={true} /> {/* Pass the greenBackground prop */}
        <h2 className="page-title">Our Team</h2>

        <section className="people-container">
          {teamMembers.map((member, index) => (
            <div className="our-team" key={index}>
              <div className="pic">
                <img src={member.Photo} alt={`${member.Name}'s Photo`} />
              </div>
              <div className="details">
                <h3 className="name">{member.Name}</h3>
                <span className="position">{member.Position} | {member.Town}</span>
                <span className="description" dangerouslySetInnerHTML={{__html: (member.Description || "").replace(/\n/g, "<br />"),}}></span>
              </div>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default OurTeam;
