import React, { useState, useEffect, useMemo, useRef } from 'react';
import Papa from 'papaparse';
import NavBar from './NavBar';
import Footer from './Footer';
import EventsModal from './supporting/EventsModal';
import EventDetailsPopup from './supporting/EventDetailsPopup';
import './supporting/style/Events.css';
import EventsCSV from './csv/Events.csv';
import { LuClipboardSignature } from "react-icons/lu";

const CATEGORY_ORDER = [
  'Arts & Creative',
  'Yoga & Wellness',
  'Culture & Tradition',
  'Environment & Service',
  'Community Care',
  'Education & Guidance',
];

const getPhotoCount = (eventEntry) => {
  if (eventEntry.galleryPhotos) {
    return eventEntry.galleryPhotos
      .split('|')
      .map((url) => url.trim())
      .filter(Boolean).length;
  }
  return eventEntry.photoUrl ? 1 : 0;
};

const Event = ({ eventEntry, onEventClick, onSignUpClick }) => {
  const isUpcoming = eventEntry.type.toLowerCase() === 'upcoming';
  const photoCount = getPhotoCount(eventEntry);

  const handleBoxClick = (e) => {
    e.stopPropagation();
    if (isUpcoming) {
      onSignUpClick?.(eventEntry);
    } else {
      onEventClick?.(eventEntry);
    }
  };

  const isClickable = isUpcoming || typeof onEventClick === 'function';

  return (
    <div
      className={`event-box ${isClickable ? 'clickable' : ''}`}
      onClick={isClickable ? handleBoxClick : undefined}
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
    >
      <div className="event-photo-container">
        <img src={eventEntry.photoUrl} alt={eventEntry.title} className="event-photo" />
        <div className="event-time">{eventEntry.time}</div>
        {photoCount > 1 && (
          <div className="event-photo-count" aria-label={`${photoCount} photos`}>
            {photoCount} photos
          </div>
        )}
      </div>
      <div className="event-text-container">
        {eventEntry.category && <span className="event-category-tag">{eventEntry.category}</span>}
        <h3>{eventEntry.title}</h3>
        <p>Location: {eventEntry.location}</p>
        {isUpcoming && (
          <button
            className="sign-up-icon"
            onClick={(e) => {
              e.stopPropagation();
              onSignUpClick?.(eventEntry);
            }}
          >
            <LuClipboardSignature />
          </button>
        )}
      </div>
    </div>
  );
};

const HorizontalRow = ({ events, onEventClick, onSignUpClick }) => {
  const scrollerRef = useRef(null);

  const scrollByCards = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(640, el.clientWidth * 0.85) * direction;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (!events.length) return null;

  return (
    <div className="events-row">
      {events.length > 2 && (
        <>
          <button
            type="button"
            className="events-row-nav events-row-nav--left"
            onClick={() => scrollByCards(-1)}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            type="button"
            className="events-row-nav events-row-nav--right"
            onClick={() => scrollByCards(1)}
            aria-label="Scroll right"
          >
            ›
          </button>
        </>
      )}
      <div className="events-row-scroller" ref={scrollerRef}>
        {events.map((event, index) => (
          <Event
            key={`${event.title}-${event.sortDate}-${index}`}
            eventEntry={event}
            onEventClick={onEventClick}
            onSignUpClick={onSignUpClick}
          />
        ))}
      </div>
    </div>
  );
};

const EventList = ({
  events,
  browseMode,
  activeCategory,
  activeYear,
  onEventClick,
  onSignUpClick,
}) => {
  const upcomingEvents = useMemo(
    () =>
      events
        .filter((event) => event.type && event.type.toLowerCase() === 'upcoming')
        .sort((a, b) => (a.sortDate || '').localeCompare(b.sortDate || '')),
    [events]
  );

  const pastEvents = useMemo(
    () =>
      events
        .filter((event) => event.type && event.type.toLowerCase() === 'past')
        .sort((a, b) => (b.sortDate || '').localeCompare(a.sortDate || '')),
    [events]
  );

  const filteredPast = useMemo(() => {
    let list = pastEvents;
    if (activeCategory !== 'All') {
      list = list.filter((event) => event.category === activeCategory);
    }
    if (browseMode === 'date' && activeYear !== 'All') {
      list = list.filter((event) => (event.sortDate || '').startsWith(activeYear));
    }
    return list;
  }, [pastEvents, activeCategory, browseMode, activeYear]);

  const categoriesPresent = useMemo(() => {
    const present = new Set(pastEvents.map((e) => e.category).filter(Boolean));
    return CATEGORY_ORDER.filter((c) => present.has(c));
  }, [pastEvents]);

  const monthGroups = useMemo(() => {
    const groups = [];
    const map = new Map();
    filteredPast.forEach((event) => {
      const key = (event.sortDate || '').slice(0, 7) || 'Unknown';
      if (!map.has(key)) {
        map.set(key, []);
        groups.push(key);
      }
      map.get(key).push(event);
    });
    return groups.map((key) => ({
      key,
      label: formatMonthLabel(key),
      events: map.get(key),
    }));
  }, [filteredPast]);

  return (
    <div className="events-container">
      <div className="events-section" id="upcoming">
        <div className="events-section-header">
          <h2>Upcoming Events</h2>
          <span className="events-count-pill">{upcomingEvents.length}</span>
        </div>
        {upcomingEvents.length ? (
          <HorizontalRow
            events={upcomingEvents}
            onEventClick={onEventClick}
            onSignUpClick={onSignUpClick}
          />
        ) : (
          <p className="events-empty">No upcoming events right now — explore past programs below.</p>
        )}
      </div>

      {browseMode === 'activity' ? (
        (activeCategory === 'All' ? categoriesPresent : [activeCategory]).map((category) => {
          const categoryEvents = pastEvents.filter((event) => event.category === category);
          if (!categoryEvents.length) return null;
          return (
            <div className="events-section" id={slugify(category)} key={category}>
              <div className="events-section-header">
                <h2>{category}</h2>
                <span className="events-count-pill">{categoryEvents.length}</span>
              </div>
              <HorizontalRow
                events={categoryEvents}
                onEventClick={onEventClick}
                onSignUpClick={onSignUpClick}
              />
            </div>
          );
        })
      ) : (
        <div className="events-section" id="past-by-date">
          <div className="events-section-header">
            <h2>Past Events</h2>
            <span className="events-count-pill">{filteredPast.length}</span>
          </div>
          {monthGroups.length ? (
            monthGroups.map((group) => (
              <div className="events-month-block" key={group.key} id={`month-${group.key}`}>
                <h3 className="events-month-label">{group.label}</h3>
                <div className="events-grid">
                  {group.events.map((event, index) => (
                    <Event
                      key={`${event.title}-${event.sortDate}-${index}`}
                      eventEntry={event}
                      onEventClick={onEventClick}
                      onSignUpClick={onSignUpClick}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="events-empty">No events match this filter.</p>
          )}
        </div>
      )}
    </div>
  );
};

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function formatMonthLabel(ym) {
  if (!ym || ym === 'Unknown' || ym.length < 7) return 'Date TBD';
  const [year, month] = ym.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
  const [browseMode, setBrowseMode] = useState('activity');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeYear, setActiveYear] = useState('All');

  useEffect(() => {
    fetch(EventsCSV)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const cleaned = results.data
              .map((row) =>
                Object.fromEntries(
                  Object.entries(row).map(([k, v]) => [
                    k.trim(),
                    typeof v === 'string' ? v.trim() : v,
                  ])
                )
              )
              .filter((r) => r.title?.trim() && r.type?.trim());

            setEvents(cleaned);
          },
          error: (err) => console.error('Error parsing CSV:', err),
        });
      });
  }, []);

  const categories = useMemo(() => {
    const present = new Set(events.map((e) => e.category).filter(Boolean));
    return CATEGORY_ORDER.filter((c) => present.has(c));
  }, [events]);

  const years = useMemo(() => {
    const present = new Set(
      events
        .filter((e) => e.type?.toLowerCase() === 'past')
        .map((e) => (e.sortDate || '').slice(0, 4))
        .filter(Boolean)
    );
    return Array.from(present).sort((a, b) => b.localeCompare(a));
  }, [events]);

  const handleSignUpClick = (eventEntry) => {
    setSelectedEvent(eventEntry);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleFormSubmit = (formData) => {
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

  const jumpToCategory = (category) => {
    setActiveCategory(category);
    setBrowseMode('activity');
    const id = category === 'All' ? 'upcoming' : slugify(category);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleSortChange = (mode) => {
    setBrowseMode(mode);
    if (mode === 'activity') {
      setActiveYear('All');
    } else {
      setActiveCategory('All');
    }
  };

  return (
    <div>
      <NavBar greenBackground={true} />
      <div className="events__body">
        <h2>Events</h2>
      </div>

      <div className="events-controls">
        <div className="events-controls-row">
          {browseMode === 'activity' ? (
            <div className="events-filter-chips" aria-label="Filter by activity">
              <button
                type="button"
                className={`events-chip${activeCategory === 'All' ? ' is-active' : ''}`}
                onClick={() => jumpToCategory('All')}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`events-chip${activeCategory === category ? ' is-active' : ''}`}
                  onClick={() => jumpToCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          ) : (
            <div className="events-filter-chips" aria-label="Filter by year">
              <button
                type="button"
                className={`events-chip${activeYear === 'All' ? ' is-active' : ''}`}
                onClick={() => setActiveYear('All')}
              >
                All
              </button>
              {years.map((year) => (
                <button
                  type="button"
                  key={year}
                  className={`events-chip${activeYear === year ? ' is-active' : ''}`}
                  onClick={() => setActiveYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          <div className="events-sort">
            <label htmlFor="events-sort-select">Sort by</label>
            <select
              id="events-sort-select"
              value={browseMode}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="activity">Activity</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>
      </div>

      <div className="events-page">
        <EventList
          events={events}
          browseMode={browseMode}
          activeCategory={activeCategory}
          activeYear={activeYear}
          onEventClick={handleEventClick}
          onSignUpClick={handleSignUpClick}
        />
        {showModal && (
          <EventsModal
            eventEntry={selectedEvent}
            closeModal={handleModalClose}
            onSubmit={handleFormSubmit}
          />
        )}
        {showDescriptionPopup && (
          <EventDetailsPopup eventEntry={selectedEvent} onClose={handlePopupClose} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
