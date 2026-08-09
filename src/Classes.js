import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import NavBar from './NavBar';
import SearchableClassList from './SearchableClassList';
import Footer from './Footer';
import ClassesCSV from './csv/Classes.csv';

const slideshowPhotos = [
  {
    src: 'https://i.imgur.com/SI2M4yN.jpeg',
    alt: 'Community planting drive in Mul',
  },
  {
    src: 'https://i.imgur.com/5rHjVWK.jpeg',
    alt: 'Mahila Day celebration',
  },
  {
    src: 'https://i.imgur.com/njc0pg1.jpeg',
    alt: 'Morning yoga session',
  },
  {
    src: 'https://i.imgur.com/iZOowWK.jpeg',
    alt: 'Baal-Sanskaar cultural presentation',
  },
  {
    src: 'https://i.imgur.com/4QVHDpm.jpeg',
    alt: 'Volunteers planting trees together',
  },
  {
    src: 'https://i.imgur.com/9VMmXuT.jpeg',
    alt: 'Community yoga practice',
  },
];

const UnifiedClassesPage = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(ClassesCSV)
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
          {slideshowPhotos.map((photo) => (
            <img key={photo.src} src={photo.src} alt={photo.alt} />
          ))}
        </div>
      </div>
      <SearchableClassList classes={classes} />
      <Footer />
    </div>
  );
};

export default UnifiedClassesPage;
