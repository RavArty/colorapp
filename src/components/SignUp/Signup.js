import React from 'react';

import FormInput from '../formInput/formInput'
import CustomButton from '../customButton/customButton';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './Signup.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }


  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const userRef = await createUserProfileDocument(user, { displayName }); 

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const {classes} = this.props
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <Container className='header' maxWidth="sm">
        {/* <div className='sign-up'> */}
 
        <h2 className='title'>Sign Up</h2>
        {/* <span>Sign up with your email and password</span> */}
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
            autoFocus
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <div className='button'>
             <Button  color="secondary" size="large"  variant="contained" type='submit'>Sign Up</Button>
          
          </div>
        </form>
      </Container>
    );
  }
}

export default SignUp