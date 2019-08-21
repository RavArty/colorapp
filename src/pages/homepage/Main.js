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

keepColors = (data) => {
  const clarifaiColors = data.outputs[0].data.colors
  this.props.setImageCodes(clarifaiColors)
}

parseColors = (data) => {
  const colorArr = []
  const colors = data.outputs[0].data.colors
  colors.map((color, i) =>{
     return colorArr.push(color.raw_hex, (color.value * 100).toFixed(2))
  })

}

render() {
  const { currentUser } = this.props
  let useComponent  //depends on route state

  if(currentUser !== null) {
    useComponent = 
        <div>
          <Rank/> 
          <ImageLinkForm/>
          <ColorRecognition/> 
          <ButtonToHistory />
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
