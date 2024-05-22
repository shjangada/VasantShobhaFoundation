import React, { useState } from 'react';
import './style/SearchableClassList.css';
import SignUpModal from './supporting/SignUpModal';
import { saveAs } from 'file-saver';
import DescriptionPopup from './supporting/DescriptionPopup.js';
import SignUpButton from './supporting/SignUpButton';

const Class = ({ classEntry, onClassClick, onSignUpClick }) => {
  return (
    <div className="class-box" onClick={() => onClassClick(classEntry)}>
      <h3>{classEntry.Class}</h3>
      <p>Location: {classEntry.Location}</p>
      <p>Time: {classEntry.Time}</p>
      <span
        title="Indicates class availability."
        className="class__body"
        style={{
          color: classEntry.Status === 'Yes' ? 'green' : '#680b0b',
          backgroundColor: 'transparent',
        }}
      >
        {classEntry.Status === 'Yes' ? (
          <SignUpButton onClick={(e) => { e.stopPropagation(); onSignUpClick(classEntry); }} />
        ) : 'Class Full'}
      </span>
    </div>
  );
};

const ClassList = ({ classes, onClassClick, onSignUpClick }) => {
  return (
    <div className="classes-container">
      {classes.map((classEntry, index) => (
        <Class key={index} classEntry={classEntry} onClassClick={onClassClick} onSignUpClick={onSignUpClick} />
      ))}
    </div>
  );
};

const SearchInput = ({ value, onChange }) => (
  <input
    className="search__input"
    type="text"
    onChange={e => onChange(e.target.value)}
    placeholder="Search classes..."
  />
);

const filterClasses = (classes, searchText, sortBy) => {
  let filteredClasses = classes.filter(classEntry =>
    (classEntry.Class?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
    (classEntry.Description?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
    (classEntry.Location?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
    (classEntry.Time?.toLowerCase() || '').includes(searchText.toLowerCase())
  );

  switch (sortBy) {
    case 'location':
      filteredClasses.sort((a, b) => a.Location.localeCompare(b.Location));
      break;
    case 'time':
      filteredClasses.sort((a, b) => a.Time.localeCompare(b.Time));
      break;
    case 'availability':
      filteredClasses.sort((a, b) => {
        const statusComparison = a.Status.localeCompare(b.Status);
        if (statusComparison !== 0) {
          return statusComparison;
        }
        return a.Location.localeCompare(b.Location);
      });
      break;
    default:
      break;
  }

  return filteredClasses;
};

const saveToCSV = (data) => {
  const csv = [
    ['Class', 'Description', 'Location', 'Time', 'Status'],
    ...data.map(row => [row.Class, row.Description, row.Location, row.Time, row.Status])
  ].map(e => e.join(",")).join("\n");

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'Signups.csv');
};

const SearchableClassList = ({ classes }) => {
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [signUps, setSignUps] = useState([]);
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);

  const handleSignUpClick = (classEntry) => {
    setSelectedClass(classEntry);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedClass(null);
  };

  const handleFormSubmit = (formData) => {
    setSignUps([...signUps, formData]);
    saveToCSV([...signUps, formData]);
    handleModalClose();
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleClassClick = (classEntry) => {
    setSelectedClass(classEntry);
    setShowDescriptionPopup(true);
  };

  const handlePopupClose = () => {
    setShowDescriptionPopup(false);
    setSelectedClass(null);
  };

  const foundClasses = filterClasses(classes, searchText, sortBy);

  return (
    <div className="class__body">
      <div className="search-sort-container">
        <SearchInput value={searchText} onChange={newText => setSearchText(newText)} />
        <div className="sort-dropdown">
          <select className="sort__select" onChange={handleSortChange} value={sortBy}>
            <option value="" disabled>Select Sort By</option>
            <option value="location">Location</option>
            <option value="time">Time</option>
            <option value="availability">Availability</option>
          </select>
        </div>
      </div>
      <ClassList classes={foundClasses} onClassClick={handleClassClick} onSignUpClick={handleSignUpClick} />
      {showModal && (
        <SignUpModal
          classEntry={selectedClass}
          closeModal={handleModalClose}
          onSubmit={handleFormSubmit}
        />
      )}
      {showDescriptionPopup && (
        <DescriptionPopup classEntry={selectedClass} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default SearchableClassList;
