import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

export default function EventInput({ handlePost, cancelAdd }) {
  const [input, setInput] = useState({});

  // Change value input
  const handleChange = (e) => {
    setInput(prevInput => ({
      ...prevInput,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <tr className='event'>
      <td><input name='eventName' type='text' onChange={handleChange}></input></td>
      <td><input name='startDate' type='date' onChange={handleChange}></input></td>
      <td><input name='endDate' type='date' onChange={handleChange}></input></td>
      <td>
        <button className='add-btn' onClick={() => {handlePost(input)}}>
          <AddIcon />
        </button>
        <button className='close-btn' onClick={cancelAdd}>
          <CloseIcon />
        </button>
      </td>
    </tr>
  );
}