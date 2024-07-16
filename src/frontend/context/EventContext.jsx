import {createContext, useState, useEffect} from 'react';
import {
  fetchEvents,
  postEvent,
  deleteEvent,
  putEvent} from '../api/EventListAPI';

export const EventContext = createContext(null);

/**
 * Event Provider
 *
 * @return {object} JSX
 */
export function EventProvider({children}) {
  const [events, setEvents] = useState([]);
  const [isAdding, setAdding] = useState(false);

  // Fetch all events from db initially
  useEffect(() => {
    fetchEvents(setEvents);
  }, []);

  // Toggle the event input component
  const toggleAdd = () => {
    setAdding(!isAdding);
  };

  // Validate input fields
  const validateInput = (event) => {
    // Checking if all fields exist
    if (!Object.getOwnPropertyNames(event).includes('eventName') ||
        !Object.getOwnPropertyNames(event).includes('startDate') ||
        !Object.getOwnPropertyNames(event).includes('endDate')) {
      alert('Event details missing');
      return false;
    }

    // Checking if all fields has value
    for (const prop in event) {
      if (!event[prop]) {
        alert('Event details missing');
        return false;
      }
    }

    return true;
  };

  // Make POST API call after validate
  const handlePost = (event) => {
    if (validateInput(event)) {
      postEvent(event, setEvents, toggleAdd);
    }
  };

  // Make DELETE API call
  const handleDelete = (event) => {
    deleteEvent(event, setEvents);
  };

  // Make PUT API call after validate
  const handlePut = (event, toggleEdit) => {
    if (validateInput(event)) {
      putEvent(event, setEvents, toggleEdit);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events, handlePost, handleDelete, handlePut, toggleAdd, isAdding,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
