import React from 'react';
import { Link } from 'react-router-dom'


const ButtonToHistory = ({ id }) => {

    return(
    <div>
      <Link to={{pathname: '/history',
            state : {id: id}}}>
        <button
          className='w-30 grow f4 link ph3 pa4 pv2 dib blue '>
            History
        </button>
      </Link>
      
    </div>
  ) 
  
  
}

export default ButtonToHistory;