import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

// NavBar Component
const NavBar = () => (
  <div className="navbar">
    <ul className="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#classes">Classes</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
);

// Class Component
const Class = ({ classEntry }) => {
  return (
    <div>
      <h3>{classEntry.Class}</h3>
      <p>{classEntry.Description}</p>
      <p>{classEntry.Location}</p>
      <span
        title="Indicates class availability."
        style={{
          display: 'inline-block',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: classEntry.Status === 'Yes' ? 'green' : 'red',
        }}
      >
        {classEntry.Status === 'Yes' ? '✔' : '✖'}
      </span>
    </div>
  );
};

// ClassList Component
const ClassList = ({ classes, emptyHeading }) => {
  const count = classes.length;
  let heading = emptyHeading;
  if (count > 0) {
    const noun = count > 1 ? 'Classes' : 'Class';
    heading = count + ' ' + noun;
  }
  return (
    <section>
      <h2>{heading}</h2>
      {classes.map((classEntry, index) => (
        <Class key={index} classEntry={classEntry} />
      ))}
    </section>
  );
};

// SearchInput Component
const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder="Search classes..."
  />
);

// SearchableClassList Component
const filterClasses = (classes, searchText) => {
  return classes.filter(classEntry =>
    (classEntry.Class?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
    (classEntry.Description?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
    (classEntry.Location?.toLowerCase() || '').includes(searchText.toLowerCase())
  );
};

const SearchableClassList = ({ classes }) => {
  const [searchText, setSearchText] = useState('');
  const foundClasses = filterClasses(classes, searchText);
  return (
    <>
      <SearchInput
        value={searchText}
        onChange={newText => setSearchText(newText)}
      />
      <ClassList
        classes={foundClasses}
        emptyHeading={`No matches for “${searchText}”`}
      />
    </>
  );
};

// Main AdultClasses Component
const AdultClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch('./sfiles/AdultClasses.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            setClasses(results.data);
          },
        });
      });
  }, []);

  return (
    <div>
      <NavBar />
      <h2>Adult Classes</h2>
      <SearchableClassList classes={classes} />
    </div>
  );
};

export default AdultClasses;
