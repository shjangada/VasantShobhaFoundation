import React, { useState } from 'react';
import './supporting/style/SearchableClassList.css';
import SignUpModal from './supporting/SignUpModal';
import { saveAs } from 'file-saver';
import DescriptionPopup from './supporting/DescriptionPopup.js';
import SignUpButton from './supporting/SignUpButton';

// Function to handle scrolling
const scrollDownByViewportHeight = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
};

// ScrollButton Component
const ScrollButton = () => (
    <div className="down-arrow" onClick={scrollDownByViewportHeight}>
        <img className="scroll-down-img" src="https://static.thenounproject.com/png/196759-200.png" alt="Scroll Down" />
    </div>
);

// Class Component
const Class = ({ classEntry, onClassClick, onSignUpClick }) => {
    return (
        <div className="class-box" onClick={() => onClassClick(classEntry)}>
            <h3>{classEntry.Class}</h3>
            <p>Location: {classEntry.Location}</p>
            <p>Time: {classEntry.Time}</p>
            <p>Age Group: {classEntry.AgeGroup}</p>
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
                ) : (
                    <>
                    <div className="class-full-spacing"></div> 
                    <span className="class-full">
                        Class Full
                    </span>
                    </>
                )}
            </span>
        </div>
    );
};

// ClassList Component
const ClassList = ({ classes, onClassClick, onSignUpClick }) => {
    return (
        <div className="classes-container">
            {classes.map((classEntry, index) => (
                <Class key={index} classEntry={classEntry} onClassClick={onClassClick} onSignUpClick={onSignUpClick} />
            ))}
        </div>
    );
};

// SearchInput Component
const SearchInput = ({ value, onChange }) => (
    <input
        className="search__input"
        type="text"
        onChange={e => onChange(e.target.value)}
        placeholder="Search classes..."
    />
);

// Filter Classes Function
const filterClasses = (classes, searchText, sortBy) => {
    let filteredClasses = classes.filter(classEntry =>
        (classEntry.Class?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
        (classEntry.Description?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
        (classEntry.Location?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
        (classEntry.Time?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
        (classEntry.AgeGroup?.toLowerCase() || '').includes(searchText.toLowerCase())
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
                const statusComparison = b.Status.localeCompare(a.Status);
                if (statusComparison !== 0) {
                    return statusComparison;
                }
                return a.Location.localeCompare(b.Location);
            });
            break;
        case 'age group':
            filteredClasses.sort((a, b) => b.AgeGroup.localeCompare(a.AgeGroup));
            break;
        default:
            break;
    }

    return filteredClasses;
};

// Save to CSV Function
const saveToCSV = (data) => {
    const csv = [
        ['Class', 'Description', 'Location', 'Time', 'Status', 'AgeGroup'],
        ...data.map(row => [row.Class, row.Description, row.Location, row.Time, row.Status, row.AgeGroup])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Signups.csv');
};

// SearchableClassList Component
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
        const updatedSignUps = [...signUps, formData];
        setSignUps(updatedSignUps);
        saveToCSV(updatedSignUps);
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
                        <option value="" disabled>Sort By</option>
                        <option value="location">Location</option>
                        <option value="time">Time</option>
                        <option value="availability">Availability</option>
                        <option value="age group">Age Group</option>
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
            <ScrollButton />
        </div>
    );
};

export default SearchableClassList;
