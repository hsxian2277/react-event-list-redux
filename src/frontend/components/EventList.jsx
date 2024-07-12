import './styles.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Event from './Event';
import EventInput from './EventInput';
import { fetchEvents, postEvent, deleteEvent, putEvent } from '../api/EventListAPI';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [isAdding, setAdding] = useState(false);

  // Fetch all events from db initially
  useEffect(() => {
    fetchEvents(setEvents);
  }, [])

  // Toggle the event input component
  const toggleAdd = () => {
    setAdding(!isAdding);
  }

  // Validate input fields
  const validateInput = (event) => {
    for (const prop in event) {
      if (!event[prop]) {
        alert('Event details missing');
        return false;
      }
    }

    return true;
  }

  // Make POST API call after validate
  const handlePost = (event) => {
    const newEvent = {
      eventName: event.eventName,
      startDate: event.startDate,
      id: uuidv4(),
      endDate: event.endDate,
    }

    if (validateInput(newEvent)) {
      postEvent(newEvent, setEvents, toggleAdd);
    }
  }

  // Make DELETE API call
  const handleDelete = (event) => {
    deleteEvent(event, setEvents);
  }

  // Make PUT API call after validate
  const handlePut = (event, toggleEdit) => {
    if (validateInput(event)) {
      putEvent(event, setEvents, toggleEdit);
    }
  }
  
  return (
    <div id="event-list-app">
      <div className="add-event-list">
        <button className="add-event-list-button" onClick={toggleAdd}>
          Add New Event
        </button>
      </div>
      <div className="event-list">
        <table className="event-list-table">
          <thead className="event-list-table__header">
            <tr>
              <th>Event</th>
              <th>Start</th>
              <th>End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="event-list-table__body">
            {events.map((event) => {
              return <Event
                        className='event' 
                        key={event.id}
                        handlePost={handlePost}
                        handleDelete={handleDelete}
                        handlePut={handlePut}
                        event={event} />
            })}
            {isAdding ? <EventInput handlePost={handlePost} cancelAdd={toggleAdd}/> : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}