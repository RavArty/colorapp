import React from 'react';
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect';

import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './ButtonHistory.scss'

//if user logged in, he has access to all previously uploaded images
const ButtonToHistory = () => {

    return(
    <div style={{marginBottom: '30px'}}>
      <Link className='button-history' to={{pathname: '/history'}}>
        <Button size="large" variant="contained" color="primary">
          History
        </Button>
      </Link>  
    </div>
  ) 
  
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(ButtonToHistory)