import React from 'react'
import FormInput from '../formInput/formInput'

import Container from '@material-ui/core/Container';
import { signInWithGoogle }  from '../../firebase/firebase.utils';
import { auth } from '../../firebase/firebase.utils';
import Button from '@material-ui/core/Button';
import './Signin.scss'

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state
    try{
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({email: '', password: ''})
    }catch (error) {
      console.log(error)
    }
    
  }
  handleChange = (event) => {
    const { value, name } = event.target
    this.setState({[name]: value})
    }
  render() {
    const {classes} = this.props
    return (
      <Container className='header' maxWidth="sm">  
        <h2 className='title'>Sign In</h2>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='Email'
            required
            autoFocus
          />
          <FormInput
            name='password'
            type='password'
            handleChange={this.handleChange}
            value={this.state.password}
            label='Password'
            required
          />
          <div className='buttons'>
            <div className='button'>
              <Button className='button-signin' color="secondary" size="large"  variant="contained" type='submit'>Sign In</Button>
              <Button className='button-signin' color="secondary" size="large"  variant="contained" onClick={signInWithGoogle}>
                Sign in with Google
              </Button>
            </div>
            
          </div>
        </form>
      </Container>
    )
  }
}

export default SignIn