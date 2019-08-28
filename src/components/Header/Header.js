import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import './Header.scss'


const styles = (theme) => ({
  signUpButton: {
    marginRight: theme.spacing(1)
  }
});
//Navbar - sign out if user signed in; sing in & sign up buttons if not
export const Header = ({classes, currentUser}) => (

      <AppBar className='header-appbar' color="primary" position="static">
        <Toolbar variant="regular">
          <Link to='/'>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img src="https://i.ibb.co/YPFSJSg/multi-colors-in-circle-udt-2-2.png" alt=''
                style={{ height: 50, width: 50 }}/>
            </IconButton>
          </Link>
          <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">COLORS</Typography>
          {currentUser ? 
              <div>
                <Button className='btn-signOut'color="secondary" variant="contained" onClick={() => auth.signOut()}>
                  SIGN OUT
                </Button>
              </div>
           : (
            <>
            <Link className='button' to='/signup'>
              <div>
                <Button className={classes.signUpButton} color="secondary" variant="contained" >Sign Up</Button>
              </div>
            </Link>  
            <Link className='button' to='/signin'>
              <div>
                <Button color="secondary" variant="contained" >Sign in</Button>
              </div>
            </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      

)

  
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(withStyles(styles)(Header));
//export default Header