import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import NavBar from './NavBar';
import './supporting/style/SearchableClassList.css'; // Import your CSS file for styling
import Classes from './csv/AdultClasses.csv'
import SearchableClassList from './SearchableClassList';
const AdultClasses = () => {
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
      <div class="blurb-container">
        <h2>We offer a diverse range of enriching and engaging courses designed to enhance your skills, spark creativity, and foster a love for lifelong learning. Whether you're looking to develop a new hobby, advance your career, or simply meet like-minded individuals, our classes provide the perfect environment for growth and exploration.</h2>
        <div class="slideshow">
            <img src="https://www.aclu.org/wp-content/uploads/2023/09/education-equity-blog.jpg" alt="Photo 1" />
            <img src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/teacher-in-classroom.jpeg.jpg" alt="Photo 2" />
            <img src="https://imageio.forbes.com/specials-images/imageserve/61d5b5f9529aee8feb22c68a/Rear-view-of-schoolgirl-raising-her-arm-to-answer-the-question-in-the-classroom-/960x0.jpg?format=jpg&width=960" alt="Photo 3" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThSNorR78HwDdX2MAy4EYoOD14zoxooRrolisgA3J_Mw&s" alt="Photo 4" />
        </div>
      </div>
      <SearchableClassList classes={classes} />
    </div>
  );
};

export default AdultClasses;
