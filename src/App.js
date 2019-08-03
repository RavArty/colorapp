import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/homepage/Main.js'
import SignInAndSignUpPage from './pages/sign_in_up/sign_in_up'
import './App.css';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Header from './components/Header/Header'
class App extends Component {
 
  constructor(){
    super()
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

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
        })
        //console.log(this.state)

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
      return (
    <div>
      <Header currentUser={this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={Main} />
        {/* <Route path='/history' component={HistoryCards} /> */}
        <Route exact path='/signin' component={SignInAndSignUpPage} />

      </Switch>
    </div>
  );
  }

}


export default App;
