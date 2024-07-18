import {DELETE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  POST_EVENT_FAILURE,
  POST_EVENT_REQUEST,
  POST_EVENT_SUCCESS,
  TOGGLE_ADD} from './eventTypes';
import {v4 as uuidv4} from 'uuid';

const BASE_EVENT_API = 'http://localhost:3001/events';

// Fetch events actions
const fetchEventsRequest = () => {
  return {
    type: FETCH_EVENTS_REQUEST,
  };
};

const fetchEventsSuccess = (events) => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: events,
  };
};

const fetchEventsFailure = (error) => {
  return {
    type: FETCH_EVENTS_FAILURE,
    payload: error,
  };
};

// Post event actions
const postEventRequest = () => {
  return {
    type: POST_EVENT_REQUEST,
  };
};

const postEventSuccess = (newEvent) => {
  return {
    type: POST_EVENT_SUCCESS,
    payload: newEvent,
  };
};

const postEventFailure = (error) => {
  return {
    type: POST_EVENT_FAILURE,
    payload: error,
  };
};

// Delete event actions
const deleteEventRequest = () => {
  return {
    type: DELETE_EVENT_REQUEST,
  };
};

const deleteEventSuccess = (deletedEvent) => {
  return {
    type: DELETE_EVENT_SUCCESS,
    payload: deletedEvent,
  };
};

const deleteEventFailure = (error) => {
  return {
    type: DELETE_EVENT_FAILURE,
    payload: error,
  };
};

// Put event actions
const editEventRequest = () => {
  return {
    type: EDIT_EVENT_REQUEST,
  };
};

const editEventSuccess = (editedEvent) => {
  return {
    type: EDIT_EVENT_SUCCESS,
    payload: editedEvent,
  };
};

const editEventFailure = (error) => {
  return {
    type: EDIT_EVENT_FAILURE,
    payload: error,
  };
};

// Toggle add mode
export const toggleAdd = () => {
  return {
    type: TOGGLE_ADD,
  };
};

// Get from backend
export const fetchEvents = () => {
  return (dispatch) => {
    dispatch(fetchEventsRequest());
    fetch(BASE_EVENT_API)
      .then((res) => res.json())
      .then((data) => {
        // Update store with events list
        dispatch(fetchEventsSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchEventsFailure(err.message));
      });
  };
};

// Post to backend
export const postEvent = (_newEvent) => {
  return (dispatch) => {
    const newEvent = {
      id: uuidv4(),
      ..._newEvent,
    };

    dispatch(postEventRequest());
    fetch(BASE_EVENT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update store with new event
        dispatch(postEventSuccess(data));
        dispatch(toggleAdd());
      })
      .catch((err) => {
        dispatch(postEventFailure(err.message));
      });
  };
};

// Delete from backend
export const deleteEvent = (id) => {
  return (dispatch) => {
    dispatch(deleteEventRequest());
    fetch(`${BASE_EVENT_API}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        // Update store by removing the event
        dispatch(deleteEventSuccess(data));
      })
      .catch((err) => {
        dispatch(deleteEventFailure(err));
      });
  };
};

// Put to backend
export const putEvent = (event) => {
  return (dispatch) => {
    dispatch(editEventRequest());
    fetch(`${BASE_EVENT_API}/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update store event with updated data
        dispatch(editEventSuccess(data));
      })
      .catch((err) => {
        dispatch(editEventFailure(err));
      });
  };
};
