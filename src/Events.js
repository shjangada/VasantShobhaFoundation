import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import NavBar from './NavBar';
import Footer from './Footer';
import EventsModal from './supporting/EventsModal';
import DescriptionPopup from './supporting/DescriptionPopup';
import SignUpButton from './supporting/SignUpButton';
import './supporting/style/Events.css';
import EventsCSV from './csv/Events.csv';
import { LuClipboardSignature } from "react-icons/lu";

const Event = ({ eventEntry, onEventClick, onSignUpClick }) => {
  return (
    <div
      className="event-box"
      onClick={() => onEventClick(eventEntry)}
      style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate it's clickable
    >
      <div className="event-photo-container">
        <img src={eventEntry.photoUrl} alt={eventEntry.title} className="event-photo" />
        <div className="event-time">{eventEntry.time}</div>
      </div>
      <div className="event-text-container">
        <h3>{eventEntry.title}</h3>
        <p>Location: {eventEntry.location}</p>
        {eventEntry.type.toLowerCase() === 'upcoming' && (
          <button className="sign-up-icon" onClick={(e) => { e.stopPropagation(); onSignUpClick(eventEntry); }}>
            <LuClipboardSignature />
          </button>
        )}
      </div>
    </div>
  );
};


const EventList = ({ events, onEventClick, onSignUpClick }) => {
    // Filter events with proper checks for undefined `type`
    const upcomingEvents = events.filter(event => event.type && event.type.toLowerCase() === 'upcoming');
    const pastEvents = events.filter(event => event.type && event.type.toLowerCase() === 'past');
    
    return (
      <div className="events-container">
        <div className="events-section">
          <h2>Upcoming Events</h2>
          <div className="events-grid">
            {upcomingEvents.length ? (
              upcomingEvents.map((event, index) => (
                <Event key={index} eventEntry={event} onEventClick={onEventClick} onSignUpClick={onSignUpClick} />
              ))
            ) : (
              <p>No upcoming events available.</p>
            )}
          </div>
        </div>
        <div className="events-section">
          <h2>Past Events</h2>
          <div className="events-grid">
            {pastEvents.length ? (
              pastEvents.map((event, index) => (
                <Event key={index} eventEntry={event} onEventClick={onEventClick} onSignUpClick={onSignUpClick} />
              ))
            ) : (
              <p>No past events available.</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);

  useEffect(() => {
    fetch(EventsCSV)
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            console.log('Parsed CSV data:', results.data); // Log the parsed data
            setEvents(results.data);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  const handleSignUpClick = (eventEntry) => {
    setSelectedEvent(eventEntry);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleFormSubmit = (formData) => {
    // Handle form submission logic
    console.log('Form submitted:', formData);
    handleModalClose();
  };

  const handleEventClick = (eventEntry) => {
    setSelectedEvent(eventEntry);
    setShowDescriptionPopup(true);
  };

  const handlePopupClose = () => {
    setShowDescriptionPopup(false);
    setSelectedEvent(null);
  };

  return (
    <div>
        <NavBar greenBackground={true}/>
        <div className="events__body">
            <h2>Events</h2>
        </div>
        <div className="events-page">
            <EventList events={events} onEventClick={handleEventClick} onSignUpClick={handleSignUpClick} />
            {showModal && (
                <EventsModal
                eventEntry={selectedEvent}
                closeModal={handleModalClose}
                onSubmit={handleFormSubmit}
                />
            )}
            {showDescriptionPopup && (
                <DescriptionPopup eventEntry={selectedEvent} onClose={handlePopupClose} />
            )}
        </div>
        <Footer />
    </div>
  );
};

export default EventsPage;
