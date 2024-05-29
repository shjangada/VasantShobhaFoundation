import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import NavBar from './NavBar';
import Classes from './csv/YouthClasses.csv';
import SearchableClassList from './SearchableClassList';
import photo1 from './supporting/style/assets/kidphotos/kidpic1.JPG';
import photo2 from './supporting/style/assets/kidphotos/kidpic2.JPG';
import photo3 from './supporting/style/assets/kidphotos/kidpic3.JPG';
import photo4 from './supporting/style/assets/kidphotos/kidpic4.JPG';

const YouthClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(Classes)
      .then(response => {
        console.log('Fetch response:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch CSV file');
        }
        return response.text();
      })
      .then(csvText => {
        console.log('CSV text:', csvText);
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            console.log('Parsed CSV data:', results.data);
            setClasses(results.data);
          },
        });
      })
      .catch(error => {
        console.error('Error fetching or parsing CSV:', error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="blurb-container">
        <h2>We offer a diverse range of enriching and engaging courses designed to enhance your skills, spark creativity, and foster a love for lifelong learning. Whether you're looking to develop a new hobby, advance your career, or simply meet like-minded individuals, our classes provide the perfect environment for growth and exploration.</h2>
        <div className="slideshow">
            <img src={photo1} alt="Photo 1" />
            <img src={photo2} alt="Photo 2" />
            <img src={photo3} alt="Photo 3" />
            <img src={photo4} alt="Photo 4" />
        </div>
      </div>
      <SearchableClassList classes={classes} />
    </div>
  );
};

export default YouthClasses;
