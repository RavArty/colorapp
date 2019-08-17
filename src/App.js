import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './pages/homepage/Main.js'
import SignIn from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import Header from './components/Header/Header'
import HistoryCards from './components/HistoryCards/HistoryCards';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { setCurrentUser } from './redux/user/user.actions';
import { setEntries } from './redux/user/user.actions';
import settings from './settings';
import './App.css';

let theme = createMuiTheme({
  palette: {
    primary: settings.theme.primaryColor.import,
    secondary: settings.theme.secondaryColor.import,
    type: settings.theme.type
  }
});

class App extends Component {
 
  // constructor(){
  //   super()
  //   this.state = {
  //     currentUser: null,
  //  //   entries: 0
  //   }
  // }

  updateUserWithEntries = (data) => {
    console.log("update entries: ", data[0].entries)
    this.props.setEntries(data[0].entries)
  //  Object.assign(this.props.setCurrentUser, { entries: data[0].entries})
   // this.setState(Object.assign(this.state.currentUser, { entries: data[0].entries}))
  }

  unsubscribeFromAuth = null

  registerUserInDB = (id, data) => {
    if (!id) return
  // fetch('https://warm-forest-93262.herokuapp.com/checkuser', { 
      fetch('http://localhost:3000/checkuser', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: id
        })
      })
        .then(response => {
          if (response.status === 204){
          //  fetch('https://warm-forest-93262.herokuapp.com/register', { 
            fetch('http://localhost:3000/register', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: id,
                name: data.displayName,
                email: data.email
              })
            })
              .then(response => response.json())
              .catch(err => console.log('user not registered in db', err))
        } else {
        //  fetch('https://warm-forest-93262.herokuapp.com/entries', { 
          fetch('http://localhost:3000/entries', {
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
          
        })
        .catch(err => console.log('unable to check user in db', err))
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
          this.registerUserInDB(snapShot.id, snapShot.data())
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
        {/* <Header currentUser={currentUser}/> */}
          <Switch>
            <Route exact path='/' component={() => 
            <Main/>}
              // <Main user={currentUser} />}
            />
            <Route path='/history' component={HistoryCards} />
            <Route exact path='/signin' 
            render={() => 
              currentUser ? (
                    <Redirect to='/' />
                  ) : (<SignIn/>)}/>
            <Route exact path='/signup' 
            render={() => 
              currentUser ? (
                    <Redirect to='/' />
                  ) : (<Signup/>)}/>
            </Switch>
        </MuiThemeProvider>
    </div>
  );
  }

}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setEntries: entries => dispatch(setEntries(entries))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
