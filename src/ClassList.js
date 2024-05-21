import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const ClassList = ({ csvlink }) => { // Accept csvlink as prop
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(csvlink)
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            setClasses(results.data);
          },
        });
      });
  }, [csvlink]); // Listen for changes in csvlink

  return (
    <div>
      {classes.map((classEntry, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2>{classEntry.Class}</h2>
          <p>{classEntry.Description}</p>
          <p>{classEntry.Location}</p>
          <p style={{ color: classEntry.Status === 'Yes' ? 'green' : 'red' }}>
            Status: {classEntry.Status === 'Yes' ? 'Open' : 'Closed'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ClassList;
