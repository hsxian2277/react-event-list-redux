import {v4 as uuidv4} from 'uuid';
const BASE_EVENT_API = 'http://localhost:3001/events';

// Fetch all events from db
export const fetchEvents = (setEvents) => {
  fetch(BASE_EVENT_API)
    .then((res) => res.json())
    .then((data) => {
      setEvents(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Post an event
export const postEvent = (event, setEvents, toggleAdd) => {
  const newEvent = {
    id: uuidv4(),
    eventName: event.eventName,
    startDate: event.startDate,
    endDate: event.endDate,
  };

  fetch(BASE_EVENT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  })
    .then((res) => res.json())
    .then((data) => {
      setEvents((prev) => [...prev, data]);
      toggleAdd();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete an event
export const deleteEvent = (event, setEvents) => {
  fetch(`${BASE_EVENT_API}/${event.id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      setEvents((prev) => prev.filter((_event) => _event.id !== data.id));
    })
    .catch((err) => {
      console.log(err);
    });
};

// Put an event
export const putEvent = (event, setEvents, toggleEdit) => {
  fetch(`${BASE_EVENT_API}/${event.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((res) => res.json())
    .then((data) => {
      setEvents((prev) =>
        prev.map((_event) => {
          if (_event.id === data.id) {
            return event;
          }
          return _event;
        }),
      );
      toggleEdit();
    })
    .catch((err) => {
      console.log(err);
    });
};
