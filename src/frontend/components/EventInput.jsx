import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {postEvent, toggleAdd} from '../redux';
import {validateInput} from '../utils/helpers';

/**
 * Event Input
 *
 * @return {object} JSX
 */
export default function EventInput() {
  const [input, setInput] = useState({});
  const dispatch = useDispatch();

  // Change value input
  const handleChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  // Add an event
  const handlePost = () => {
    if (validateInput(input)) {
      dispatch(postEvent(input));
    } else {
      alert('Event details missing');
    }
  };

  return (
    <tr className='event'>
      <td>
        <input name='eventName' type='text' onChange={handleChange}></input>
      </td>
      <td>
        <input name='startDate' type='date' onChange={handleChange}></input>
      </td>
      <td>
        <input name='endDate' type='date' onChange={handleChange}></input>
      </td>
      <td>
        <button className='add-btn' onClick={handlePost}>
          <AddIcon />
        </button>
        <button className='close-btn' onClick={() => dispatch(toggleAdd())}>
          <CloseIcon />
        </button>
      </td>
    </tr>
  );
}
