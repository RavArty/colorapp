import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import { ReactComponent as Logo} from '../../assets/crown.svg'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import './Header.scss'


const styles = (theme) => ({
  signUpButton: {
    marginRight: theme.spacing(1)
  }
});

class Header extends React.Component {


  render() {
    const { classes } = this.props;

    return(
    <AppBar color="primary" position="static">
        <Toolbar variant="regular">
          <Typography style={{ flexGrow: 1 }} color="inherit" variant="h6">Colors</Typography>
            <>
              <Button className={classes.signUpButton} color="secondary" variant="contained" >Sign Up</Button>
              <Button color="secondary" variant="contained" >Sign In</Button>
            </>
          
        </Toolbar>
      </AppBar>
  )
  }
}
  

  // <div className='header'>
  //   <Link className='logo-container' to='/'>
  //     <Logo className='logo' />
  //   </Link>
  //   <div className='options'>
  //     <Link className='option' to='/shop'>
  //       SHOP
  //     </Link>
  //     <Link className='option' to='/contact'>
  //       CONTACT
  //     </Link>
  //     {currentUser ? (
  //       <div className='option' onClick={() => auth.signOut()}>
  //         SIGN OUT
  //       </div>
  //     ) : (
  //       <Link className='option' to='/signin'>
  //         SIGN IN
  //       </Link>
  //     )}
  //   </div>
  // </div>


export default withStyles(styles)(Header);
//export default Header