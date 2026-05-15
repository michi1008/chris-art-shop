import React from 'react';
import './EventScreen.css';
import { MdLocationOn } from 'react-icons/md';
import Loader from '../components/Loader';
import { useGetEventsQuery } from '../slices/eventsApiSlice';

const EventScreen = () => {
  const { data: events, isLoading, error } = useGetEventsQuery();
  const activeEvents = events ? events.filter((e) => e.active) : [];

  return (
    <div className='event-page'>
      <div className='event-page-header'>
        <p className='event-eyebrow'>Chris Lange Fine Art</p>
        <h1>Upcoming Events</h1>
        <div className='event-header-divider' />
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className='event-empty'>
          <p>Could not load events. Please try again later.</p>
        </div>
      ) : activeEvents.length === 0 ? (
        <div className='event-empty'>
          <p>No upcoming events at this time — check back soon!</p>
        </div>
      ) : (
        <div className='event-list'>
          {activeEvents.map((event, idx) => (
            <article className='event-card' key={event._id}>

              {/* Top: info + image side by side */}
              <div className='event-card-top'>
                <div className='event-card-info'>
                  <span className='event-location'>
                    <MdLocationOn className='event-location-icon' />
                    {event.location}
                  </span>
                  <h2 className='event-name'>{event.name}</h2>
                  <p className='event-description'>{event.description}</p>
                </div>

                {event.image && (
                  <div className='event-card-img-wrap'>
                    <img
                      src={event.image}
                      alt={event.name}
                      className='event-card-img'
                    />
                  </div>
                )}
              </div>

              {/* Bottom: date blocks grid */}
              {event.dates.length > 0 && (
                <div className='event-dates'>
                  {event.dates.map((block, i) => (
                    <div className='event-date-block' key={i}>
                      <div className='event-date-header'>
                        <span className='event-day'>{block.day}</span>
                        <span className='event-date-time'>
                          {block.date}&ensp;·&ensp;{block.hours}
                        </span>
                      </div>
                      {block.highlights.length > 0 && (
                        <ul className='event-highlights'>
                          {block.highlights.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventScreen;
