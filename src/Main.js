import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ColorRecognition from './components/ColorRecognition/ColorRecognition';
import ButtonToHistory from './components/HistoryCards/ButtonToHistory';
//import './App.css';

//Default state to remove picture and current data
const initialState = {
  input: '',
      imgUrl: '',               
      colors: [],              
      route: 'testHome',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class Main extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
      imgUrl: '',
      route: 'testHome',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        colors: [],
        joined: ''
      }
    }
  }

loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


keepColors = (data) => {
  const clarifaiColors = data.outputs[0].data.colors
//  this.setState({colors: clarifaiColors})
this.setState(Object.assign(this.state.user, { colors: clarifaiColors}))
// console.log(this.state.colors)
}
onInputChange = (event) => {
  this.setState({input: event.target.value})
}

onButtonSubmit = () => {
  this.setState({imgUrl: this.state.input})
    fetch('http://localhost:3000/imageurl', {
  //  fetch('https://warm-forest-93262.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input,
        id: this.state.user.id
      })
    })
    .then(response => response.json())
    .then(response => {
        this.keepColors(response)
        if (response) {
          fetch('http://localhost:3000/image', {    
       //   fetch('https://warm-forest-93262.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
              input: this.state.input,
              colors: this.state.user.colors
            })
          })
            .then(response => response.json())
            .then(count => {
             // this.setState({user : {entries: count}})
             this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
      //  this.keepColors(response)
      })
      .catch(err => console.log(err));
}

onRouteChange = (route) => {
  if(route === 'signout'){
    this.setState(initialState)
  }else if(route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}
render() {
  const { isSignedIn, route, imgUrl, user } = this.state;
  let useComponent  //depending on route state

  if(route === 'testHome') {
    useComponent = 
        <div>
          <Logo/>
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <ColorRecognition id={user.id} colors={user.colors} imgUrl={imgUrl}/>
        </div>
  } else if (route === 'home'){
    useComponent = 
        <div>
          <Logo/>
          <Rank
            name={user.name}
            entries={user.entries}
          />
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <ColorRecognition id={user.id} colors={user.colors} imgUrl={imgUrl}/>
          <ButtonToHistory id={user.id}/>
        </div>
  } else if (route === 'signin'){
    useComponent = <Signin 
                      loadUser={this.loadUser} 
                      onRouteChange={this.onRouteChange}/>
  } else if (route === 'register'){
    useComponent = <Register 
                      loadUser={this.loadUser} 
                      onRouteChange={this.onRouteChange}/>
  }
  
  return (
    <div className ='App'> 
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
       {useComponent}
    </div>
  );
}
}

export default Main;
