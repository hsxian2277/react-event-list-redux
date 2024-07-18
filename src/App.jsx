import './App.css';
import EventList from './frontend/components/EventList';
import store from './frontend/redux/store';
import {Provider} from 'react-redux';

/**
 * App
 *
 * @return {object} JSX
 */
export default function App() {
  return (
    <div>
      <Provider store={store}>
        <EventList />
      </Provider>
    </div>
  );
}
