import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteEvent, putEvent} from '../redux';
import {validateInput} from '../utils/helpers';

/**
 * Event component for Event List
 *
 * @return {object} JSX
 */
export default function Event({event}) {
  const [isEditing, setEditing] = useState(false);
  const [input, setInput] = useState({
    id: event.id,
    eventName: event.eventName,
    startDate: event.startDate,
    endDate: event.endDate,
  });
  const dispatch = useDispatch();

  // Change value of input
  const handleChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setEditing(!isEditing);
  };

  // Update event
  const handlePut = () => {
    // Don't need to update if no change
    if (JSON.stringify(input) !== JSON.stringify(event) &&
        validateInput(input)) {
      dispatch(putEvent(input));
      toggleEdit();
    } else {
      alert('Event details missing');
    }
  };

  // Render for view or edit depending on state
  if (isEditing) {
    return (
      <tr className='event'>
        <td>
          <input
            name='eventName'
            type='text'
            defaultValue={event.eventName}
            onChange={handleChange}>
          </input>
        </td>
        <td>
          <input
            name='startDate'
            type='date'
            defaultValue={event.startDate}
            onChange={handleChange}>
          </input>
        </td>
        <td>
          <input
            name='endDate'
            type='date'
            defaultValue={event.endDate}
            onChange={handleChange}>
          </input>
        </td>
        <td>
          <button className='save-btn' onClick={handlePut}>
            <SaveIcon />
          </button>
          <button className='close-btn' onClick={toggleEdit}>
            <CloseIcon />
          </button>
        </td>
      </tr>
    );
  } else {
    return (
      <tr className='event'>
        <td>{event.eventName}</td>
        <td>{event.startDate}</td>
        <td>{event.endDate}</td>
        <td>
          <button className='edit-btn' onClick={toggleEdit}>
            <EditIcon />
          </button>
          <button className='delete-btn'
            onClick={() => dispatch(deleteEvent(event.id))}
          >
            <DeleteIcon />
          </button>
        </td>
      </tr>
    );
  }
}
