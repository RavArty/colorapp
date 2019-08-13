import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import './ButtonHistory.scss'

const ButtonToHistory = ({ id }) => {

    return(
    <div style={{marginBottom: '30px'}}>
      <Link className='button-history' to={{pathname: '/history',
            state : {id: id}}}>
        <Button size="large" variant="contained" color="primary">
        History
      </Button>
        {/* <button
          className='w-30 grow f4 link ph3 pa4 pv2 dib blue '>
            History
        </button> */}
      </Link>
      
    </div>
  ) 
  
  
}

export default ButtonToHistory;