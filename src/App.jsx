import './App.css';
import EventList from "./frontend/components/EventList";

export default function App() {
  return (
    <div>
      {/* Make sure json-server is running for EventList */}
      <EventList />
    </div>
  )
}