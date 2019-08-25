import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import Main from './pages/homepage/Main.js'
import SignIn from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import Header from './components/Header/Header'
import HistoryCards from './components/HistoryCards/HistoryCards';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { setCurrentUser } from './redux/user/user.actions';
import { setEntries } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import settings from './settings';
import * as Constants from './constants'

import './App.css';

let theme = createMuiTheme({
  palette: {
    primary: settings.theme.primaryColor.import,
    secondary: settings.theme.secondaryColor.import,
    type: settings.theme.type
  }
});

export class App extends Component {


  updateUserWithEntries = (data) => {
    this.props.setEntries(data[0].entries)
  }

  unsubscribeFromAuth = null

  checkUserInDB = (id, data) => {
  //registerUserInDB = (id, data) => {
    if (!id) return
      fetch(Constants.isUserInDBURL, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: id
        })
      })
        .then(response => {
          // code 204 - user not registered, insert in db
          if (response.status === 204){
            this.registerUserInDB(id, data.displayName, data.email)
            // fetch(Constants.registerUserURL, {
            //   method: 'post',
            //   headers: {'Content-Type': 'application/json'},
            //   body: JSON.stringify({
            //     id: id,
            //     name: data.displayName,
            //     email: data.email
            //   })
            // })
            //   .then(response => response.json())
            //   .catch(err => console.log('user not registered in db', err))
        } else {
          this.returnNumberOfEntries(id)
          // fetch(Constants.fetchEntriesURL, {
          //     method: 'post',
          //     headers: {'Content-Type': 'application/json'},
          //     body: JSON.stringify({
          //       id: id
          //     })
          //   })
          //     .then(response => response.json())
          //     .then(count => this.updateUserWithEntries(count))
          //     .catch(err => console.log('unable to fetch entries: ', err))
        }
          
        })
        .catch(err => console.log('unable to check user in db', err))
  }

  registerUserInDB(id, name, email) {
    fetch(Constants.registerUserURL, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
        name: name,
        email: email
      })
    })
      .then(response => response.json())
      .catch(err => console.log('user not registered in db', err))
      this.updateUserWithEntries(0)

  }

  returnNumberOfEntries(id){
    fetch(Constants.fetchEntriesURL, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id
      })
    })
      .then(response => response.json())
      .then(count => this.updateUserWithEntries(count))
      .catch(err => console.log('unable to fetch entries: ', err))
  }

  componentDidMount(){
    //returns a func
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()  
          })
          this.checkUserInDB(snapShot.id, snapShot.data())
        })
      }else{
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount(){
    //after calling func -> closes subscription
    this.unsubscribeFromAuth()
  }


  render(){
    const { currentUser } = this.props
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Header/>
            <Switch>
              <Route exact path='/' component={() => <Main/>}/>
              <Route path='/history' component={HistoryCards} />
              <Route exact path='/signin' 
              render={() => 
                currentUser ? (
                    <Redirect to='/' /> )
                    : (<SignIn/>)}/>
              <Route exact path='/signup' 
              render={() => 
                currentUser ? (
                      <Redirect to='/' /> )
                      : (<Signup/>)}/>
              </Switch>
          </MuiThemeProvider>
      </div>
  );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setEntries: entries => dispatch(setEntries(entries))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
