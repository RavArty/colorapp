import React from 'react'
import SignIn from '../../components/Signin/Signin'
import SignUp from '../../components/Signup/Signup'
import './sign_in_up.scss'

const SignInAndSignUpPage = () => (
  <div className='sign-in-and-sign-up'>
    <SignIn />
    <SignUp />
  </div>
)

export default SignInAndSignUpPage