import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './Header.scss'


const styles = (theme) => ({
  signUpButton: {
    marginRight: theme.spacing(1)
  }
});

class Header extends React.Component {


  render() {
    const { classes,currentUser } = this.props;

    return(
      <AppBar className='header-appbar' color="primary" position="static">
        <Toolbar variant="regular">
          <Link to='/'>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img src="https://i.ibb.co/YPFSJSg/multi-colors-in-circle-udt-2-2.png"
                style={{ height: 50, width: 50 }}/>
            </IconButton>
          </Link>
          <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">COLORS</Typography>
          {currentUser ? (
              <Button color="secondary" variant="contained" onClick={() => auth.signOut()}>
                SIGN OUT
              </Button>
          ) : (
            <>
            <Link className='button' to='/signup'>
              <Button className={classes.signUpButton} color="secondary" variant="contained" >Sign Up</Button>
            </Link>  
            <Link className='button' to='/signin'>
              <Button color="secondary" variant="contained" >Sign in</Button>
            </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      
  )
  }
}
  

  


export default withStyles(styles)(Header);
//export default Header