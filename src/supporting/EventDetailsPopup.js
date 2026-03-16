import React, { useMemo, useState } from 'react';
import './style/EventDetailsPopup.css';

const EventDetailsPopup = ({ eventEntry, onClose }) => {
  const photos = useMemo(() => {
    if (!eventEntry) return [];

    // Preferred: galleryPhotos as a pipe-separated list of URLs
    if (eventEntry.galleryPhotos) {
      return eventEntry.galleryPhotos
        .split('|')
        .map((url) => url.trim())
        .filter((url) => url.length > 0);
    }

    // Fallback: single main photo
    return eventEntry.photoUrl ? [eventEntry.photoUrl] : [];
  }, [eventEntry]);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!eventEntry) return null;

  const hasPhotos = photos.length > 0;

  const goPrev = () => {
    if (!hasPhotos) return;
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goNext = () => {
    if (!hasPhotos) return;
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <div className="event-details-overlay" onClick={onClose}>
      <div
        className="event-details-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-details-title"
      >
        <button className="event-details-close-btn" onClick={onClose} aria-label="Close">
          X
        </button>

        <h2 id="event-details-title" className="event-details-title">
          {eventEntry.title}
        </h2>

        <div className="event-details-meta">
          {eventEntry.time && <p><strong>When:</strong> {eventEntry.time}</p>}
          {eventEntry.location && <p><strong>Where:</strong> {eventEntry.location}</p>}
        </div>

        {eventEntry.summary && (
          <p className="event-details-summary">{eventEntry.summary}</p>
        )}

        {hasPhotos && (
          <div className="event-details-gallery">
            <div className="event-details-main-photo-wrapper">
              {photos.length > 1 && (
                <button
                  className="event-details-nav-btn event-details-nav-btn-left"
                  onClick={goPrev}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
              )}

              <img
                src={photos[currentIndex]}
                alt={`${eventEntry.title} – view ${currentIndex + 1}`}
                className="event-details-main-photo"
              />

              {photos.length > 1 && (
                <button
                  className="event-details-nav-btn event-details-nav-btn-right"
                  onClick={goNext}
                  aria-label="Next photo"
                >
                  ›
                </button>
              )}
            </div>

            {photos.length > 1 && (
              <div className="event-details-thumbnails">
                {photos.map((url, index) => (
                  <button
                    key={url + index}
                    type="button"
                    className={`event-details-thumbnail-btn${
                      index === currentIndex ? ' event-details-thumbnail-btn--active' : ''
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Show view ${index + 1}`}
                  >
                    <img
                      src={url}
                      alt={`${eventEntry.title} – view ${index + 1}`}
                      className="event-details-thumbnail-img"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {!hasPhotos && (
          <p className="event-details-no-photos">No photos available for this event yet.</p>
        )}
      </div>
    </div>
  );
};

export default EventDetailsPopup;

