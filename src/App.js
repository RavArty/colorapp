import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './pages/homepage/Main.js'
import SignInAndSignUpPage from './pages/sign_in_up/sign_in_up'
import './App.css';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/Header/Header'
import HistoryCards from './components/HistoryCards/HistoryCards';
import settings from './settings';
// Material-UI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: settings.theme.primaryColor.import,
    secondary: settings.theme.secondaryColor.import,
    type: settings.theme.type
  }
});

class App extends Component {
 
  constructor(){
    super()
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  registerUserInDB = (id, data) => {
    if (!id) return
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
        .then(count => {
          this.setState(Object.assign(
            this.state.currentUser, { entries: count}))})
        .catch(err => console.log('user not registered in db', err))
  }

  componentDidMount(){
    //returns a func
    this.unsubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }  
          })
          this.registerUserInDB(snapShot.id, snapShot.data())
          //console.log(this.state)
        })
      }else{
        this.setState({currentUser: userAuth})
      }
        
      
    })
  }

  componentWillUnmount(){
    //after calling func -> closes subscription
    this.unsubscribeFromAuth()
  }


  render(){
    const {currentUser} = this.state
   console.log('user: ', currentUser)
      return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Header title={settings.title} currentUser={currentUser}/>
          <Switch>
            <Route exact path='/' component={() => 
              <Main user={currentUser} />}
            />
            <Route path='/history' component={HistoryCards} />
            {/* <Route exact path='/signin' component={SignInAndSignUpPage} /> */}
            <Route exact path='/signin' 
            render={() => 
              this.state.currentUser ? (
                    <Redirect to='/' />
                  ) : (<SignInAndSignUpPage />)}/>

          </Switch>
      </MuiThemeProvider>
      
    </div>
  );
  }

}


export default App;
