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
        <div className="blurb-copy">
          <h2>Learn with us</h2>
          <p>
            Enriching courses that spark creativity, build skills, and bring community together —
            for every age and every stage of lifelong learning.
          </p>
        </div>
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
