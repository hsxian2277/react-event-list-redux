import './styles.css';
import {useContext} from 'react';
import Event from './Event';
import EventInput from './EventInput';
import {EventContext} from '../context/EventContext';


/**
 * Event List
 *
 * @return {object} JSX
 */
export default function EventList() {
  const ctx = useContext(EventContext);

  return (
    <div id="event-list-app">
      <div className="add-event-list">
        <button className="add-event-list-button" onClick={ctx?.toggleAdd}>
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
            {ctx?.events?.map((event) => {
              return <Event
                className='event'
                key={event.id}
                event={event} />;
            })}
            {ctx.isAdding && <EventInput/>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
