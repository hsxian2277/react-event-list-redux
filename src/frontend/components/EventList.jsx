import './styles.css';
import {useEffect} from 'react';
import Event from './Event';
import EventInput from './EventInput';
import {fetchEvents, toggleAdd} from '../redux/index';
import {useDispatch, useSelector} from 'react-redux';

/**
 * Event List
 *
 * @return {object} JSX
 */
export default function EventList() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  const isLoading = useSelector((state) => state.event.isLoading);
  const error = useSelector((state) => state.event.error);
  const isAdding = useSelector((state) => state.event.isAdding);

  // Fetch events
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (isLoading) {
    return <div className="event-list-app"><h1>Loading...</h1></div>;
  }

  if (error) {
    return <div className="event-list-app"><h1>Error: {error}</h1></div>;
  }

  return (
    <div className="event-list-app">
      <div className="add-event-list">
        <button className="add-event-list-button"
          onClick={() => dispatch(toggleAdd())}>
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
                event={event} />;
            })}
            {isAdding && <EventInput/>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
