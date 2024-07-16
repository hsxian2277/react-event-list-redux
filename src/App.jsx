import './App.css';
import EventList from './frontend/components/EventList';
import {EventProvider} from './frontend/context/EventContext';

/**
 * App
 *
 * @return {object} JSX
 */
export default function App() {
  return (
    <div>
      <EventProvider>
        <EventList />
      </EventProvider>
    </div>
  );
}
