import React, { Component } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Signin from '../../components/Signin/Signin';
import Register from '../../components/Register/Register';
import Logo from '../../components/Logo/Logo';
import Rank from '../../components/Rank/Rank';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import ColorRecognition from '../../components/ColorRecognition/ColorRecognition';
import ButtonToHistory from '../../components/HistoryCards/ButtonToHistory';




class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      input: '',
      imgUrl: '',
      route: 'testHome',
      isSignedIn: false,
      entries: 0,
      colors: [],
    }
  }

 


keepColors = (data) => {
  const clarifaiColors = data.outputs[0].data.colors
  console.log('clarifaiColors: ', clarifaiColors)
  this.setState(Object.assign(this.state.colors, { colors: clarifaiColors}))
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
      })
    })
    .then(response => response.json())
    .then(response => {
        this.keepColors(response)
        if(this.props.user){
          fetch('http://localhost:3000/postcolors', {
                  method: 'post',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    input: this.state.input,
                    id: this.props.user.id,
                    colors: response.outputs[0].data.colors
                  })
                })   
                .then(response => response.json())
                .catch(err => console.log(err))
        }
        
      })
      .catch(err => console.log(err));
}

render() {
  const {user} = this.props
  const { colors, imgUrl } = this.state
  let useComponent  //depends on route state

    if(user !== null) {
    useComponent = 
        <div>
          <Logo/>
          <Rank name={user.displayName} entries={user.entries}/> 
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <ColorRecognition colors={colors} imgUrl={imgUrl}/>
          <ButtonToHistory id={user.id}/>
        </div>
    }else{
    useComponent = 
      <div>
        <Logo/>
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <ColorRecognition colors={colors} imgUrl={imgUrl}/>
      </div>
   }
  
  return (
    <div className ='App'> 
       {useComponent}
    </div>
  );
}
}

export default Main;
