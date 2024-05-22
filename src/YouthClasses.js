import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import NavBar from './NavBar';
import Classes from './csv/YouthClasses.csv'
import SearchableClassList from './SearchableClassList';

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
      <SearchableClassList classes={classes}/>
    </div>
  );
};

export default YouthClasses;
