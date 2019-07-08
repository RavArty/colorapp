import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ColorRecognition from './components/ColorRecognition/ColorRecognition';
import './App.css';


const app = new Clarifai.App({
 apiKey: 'f708fd0eb7ad441c93f44dae1de7d9e0'
});


class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
      imgUrl: '',
      colors: [],
      route: 'signin',
      isSignedIn: false
    }
  }

keepColors = (data) => {
  const clarifaiColors = data.outputs[0].data.colors
  this.setState({colors: clarifaiColors})
  console.log(this.state.colors)
}
onInputChange = (event) => {
  this.setState({input: event.target.value})
}

onButtonSubmit = () => {
  this.setState({imgUrl: this.state.input})
  app.models.predict(
    Clarifai.COLOR_MODEL, 
    this.state.input)
    .then(response => this.keepColors(response))
    .catch(err => console.log(err))
  
  // .then(
  //   function(response) {
  //   //  console.log(
  //       response.outputs[0].data.colors.forEach(function(item){
  //         console.log(item.raw_hex, item.value)
  //       })//)
  //   },
  //   function(err){});
}
onRouteChange = (route) => {
  if(route === 'signout'){
    this.setState({isSignedIn: false})
  }else if(route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}
render() {
  const { isSignedIn, route, imgUrl, colors } = this.state;
  return (
    <div className="App">
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
    { route === 'home'
      ? <div>
          <Logo/>
          <Rank/>
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <ColorRecognition colors={colors} imgUrl={imgUrl}/>
        </div>
      : ( this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
        ) 
       
    }
    </div>
  );
}
}

export default App;
