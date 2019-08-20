import React, { Component } from 'react';
import { connect } from 'react-redux';

import {createStructuredSelector} from 'reselect';
import Rank from '../../components/Rank/Rank';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import ColorRecognition from '../../components/ColorRecognition/ColorRecognition';
import ButtonToHistory from '../../components/HistoryCards/ButtonToHistory';

import { setImageUrl } from '../../redux/image/image.actions';
import { setImageCodes } from '../../redux/image/image.actions';
import { setEntries } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCurrentImageUrl } from '../../redux/image/image.selectors';
import { selectCurrentImageCodes } from '../../redux/image/image.selectors';

class Main extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      input: '',
      imgUrl: '',
      colors: [],
      colorsTest: [],
    }
  }
// componentDidMount(){
//   if (this.props.currentUser){
//     this.setState(Object.assign(this.state.entries, { entries: this.props.currentUser.entries}))
//   }
// }

keepColors = (data) => {
  const clarifaiColors = data.outputs[0].data.colors
  this.props.setImageCodes(clarifaiColors)
//  console.log('clarifaiColors: ', clarifaiColors)
//  this.setState(Object.assign(this.state.colors, { colors: clarifaiColors}))
}

parseColors = (data) => {
  const colorArr = []
  const colors = data.outputs[0].data.colors
  colors.map((color, i) =>{
     return colorArr.push(color.raw_hex, (color.value * 100).toFixed(2))
  })
console.log('colorArr: ', colorArr)
}

// onInputChange = (event) => {
// //  this.setState({input: event.target.value})
//   this.props.setImageUrl(event.target.value)
// }

// onButtonSubmit = () => {
// //  this.setState({imgUrl: this.state.input})
//   //  fetch('http://localhost:3000/imageurl', {
//     fetch('https://warm-forest-93262.herokuapp.com/imageurl', {
//       method: 'post',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         input: this.props.imageUrl
//       //  input: this.state.input,
//       })
//     })
//     .then(response => response.json())
//     .then(response => {
//         this.keepColors(response)  // update colors with fetched values 
//         //----------------------------------------------------------------
//         const colorArr = []
//         const colorArrValue = []
//         const colors = response.outputs[0].data.colors
//         colors.map((color, i) => {
          
//           return (colorArr.push(color.raw_hex),
//                   colorArrValue.push((color.value).toFixed(2))
//                   )
//         })
//         //----------------------------------------------------------------
//         if(this.props.currentUser){
//           fetch('https://warm-forest-93262.herokuapp.com/postcolors', {
//         //  fetch('http://localhost:3000/postcolors', {
//                   method: 'post',
//                   headers: {'Content-Type': 'application/json'},
//                   body: JSON.stringify({
//                     input: this.props.imageUrl,
//                   //  input: this.state.input,
//                     id: this.props.user.id,
//                     colors: colorArr,
//                     colorValue: colorArrValue
//                   })
//                 })
//                 .then(response => response.json())
//                  .then(response => {
//                   fetch('https://warm-forest-93262.herokuapp.com/image', {
//                 //  fetch('http://localhost:3000/image', {
//                   method: 'put',
//                   headers: {'Content-Type': 'application/json'},
//                   body: JSON.stringify({
//                     id: response[0],
//                   })
//                 })   
//                 .then(response => response.json())
//                 .then(count => {
//                   this.props.setEntries(count)
//                   //  this.setState(Object.assign(this.state.entries, { entries: count}))
//                   })
//                 .catch(console.log)
//                  })
//                 .catch(err => console.log('unable to post colors: ', err))
//               }
      
        
//       })
//       .catch(err => console.log(err));
// }

render() {
  const { currentUser } = this.props
//  const { colors, imgUrl, entries } = this.state
  let useComponent  //depends on route state

  if(currentUser !== null) {
    useComponent = 
        <div>
          <Rank/> 
          <ImageLinkForm/>
          <ColorRecognition/> 
          {/* <Rank name={user.displayName} entries={entries}/>  */}
          {/* <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <ColorRecognition colors={colors} imgUrl={imgUrl}/> */}
          <ButtonToHistory />
          {/* <ButtonToHistory id={user.id}/> */}
        </div>
    }else{
    useComponent = 
      <div>
        <ImageLinkForm />
        <ColorRecognition />
      </div>
   }
  
  return (
    <div className ='App'> 
       {useComponent}
    </div>
  );
}
}

const mapStateToProps = createStructuredSelector({
  imageUrl: selectCurrentImageUrl,
  imageCodes: selectCurrentImageCodes,
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setImageUrl: image => dispatch(setImageUrl(image)),
  setImageCodes: codes => dispatch(setImageCodes(codes)),
  setEntries: entries => dispatch(setEntries(entries))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
