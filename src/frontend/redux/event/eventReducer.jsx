import {FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  POST_EVENT_REQUEST,
  POST_EVENT_SUCCESS,
  POST_EVENT_FAILURE,
  TOGGLE_ADD,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE} from './eventTypes';

const initialState = {
  isLoading: false,
  events: [],
  error: '',
  isAdding: false,
};

const eventReducer = (state=initialState, action) => {
  switch (action.type) {
  case FETCH_EVENTS_REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_EVENTS_SUCCESS:
    return {
      ...state,
      events: action.payload,
      isLoading: false,
      error: '',
    };
  case FETCH_EVENTS_FAILURE:
    return {
      ...state,
      isLoading: false,
      events: [],
      error: action.payload,
    };
  case POST_EVENT_REQUEST:
    return {
      ...state,
      error: '',
    };
  case POST_EVENT_SUCCESS:
    return {
      ...state,
      events: [...state.events, action.payload],
      error: '',
    };
  case POST_EVENT_FAILURE:
    return {
      ...state,
      isAdding: false,
      error: action.payload,
    };
  case DELETE_EVENT_REQUEST:
    return {
      ...state,
      error: '',
    };
  case DELETE_EVENT_SUCCESS:
    return {
      ...state,
      events: state.events.filter((_event) => _event.id !== action.payload.id),
    };
  case DELETE_EVENT_FAILURE:
    return {
      ...state,
      error: action.payload,
    };
  case EDIT_EVENT_REQUEST:
    return {
      ...state,
      error: '',
    };
  case EDIT_EVENT_SUCCESS:
    return {
      ...state,
      events: state.events.map((_event) => {
        if (_event.id === action.payload.id) {
          return action.payload;
        }
        return _event;
      }),
    };
  case EDIT_EVENT_FAILURE:
    return {
      ...state,
      error: action.payload,
    };
  case TOGGLE_ADD:
    return {
      ...state,
      isAdding: !state.isAdding,
    };
  default:
    return state;
  };
};

export default eventReducer;
