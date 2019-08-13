import React, { Component } from 'react';
import Rank from '../../components/Rank/Rank';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import ColorRecognition from '../../components/ColorRecognition/ColorRecognition';
import ButtonToHistory from '../../components/HistoryCards/ButtonToHistory';


class Main extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      user: null,
      input: '',
      imgUrl: '',
      route: 'testHome',
      isSignedIn: false,
      entries: 0,
      colors: [],
      colorsTest: [],
    }
  }
componentDidMount(){
  if (this.props.user){
    this.setState(Object.assign(this.state.entries, { entries: this.props.user.entries}))
  }
}

keepColors = (data) => {
  const clarifaiColors = data.outputs[0].data.colors
//  console.log('clarifaiColors: ', clarifaiColors)
  this.setState(Object.assign(this.state.colors, { colors: clarifaiColors}))
}

parseColors = (data) => {
  const colorArr = []
  const colors = data.outputs[0].data.colors
  colors.map((color, i) =>{
     return colorArr.push(color.raw_hex, (color.value * 100).toFixed(2))
  })
console.log('colorArr: ', colorArr)
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
        this.keepColors(response)  // update colors with fetched values 
        //----------------------------------------------------------------
        const colorArr = []
        const colorArrValue = []
        const colors = response.outputs[0].data.colors
        colors.map((color, i) => {
          
          return (colorArr.push(color.raw_hex),
                  colorArrValue.push((color.value * 100).toFixed(2))
                  )
        })
        //----------------------------------------------------------------
        if(this.props.user){
          fetch('http://localhost:3000/postcolors', {
                  method: 'post',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    input: this.state.input,
                    id: this.props.user.id,
                    colors: colorArr,
                    colorValue: colorArrValue
                  })
                })
                .then(response => response.json())
                 .then(response => {
                  fetch('http://localhost:3000/image', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    id: response[0],
                  })
                })   
                .then(response => response.json())
                .then(count => {
                    this.setState(Object.assign(this.state.entries, { entries: count}))
                  })
                .catch(console.log)
                 })
                .catch(err => console.log('unable to post colors: ', err))
              }
      
        
      })
      .catch(err => console.log(err));
}

render() {
  const {user} = this.props
  const { colors, imgUrl, entries } = this.state
  let useComponent  //depends on route state

    if(user !== null) {
    useComponent = 
        <div>
          <Rank name={user.displayName} entries={entries}/> 
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <ColorRecognition colors={colors} imgUrl={imgUrl}/>
          <ButtonToHistory id={user.id}/>
        </div>
    }else{
    useComponent = 
      <div>
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
