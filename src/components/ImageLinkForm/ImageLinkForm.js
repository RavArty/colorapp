import React, { Component } from 'react';
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { setImageUrl } from '../../redux/image/image.actions';
import { setImageCodes } from '../../redux/image/image.actions';
import { setEntries } from '../../redux/user/user.actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCurrentImageUrl } from '../../redux/image/image.selectors';
import { selectCurrentImageCodes } from '../../redux/image/image.selectors';

import * as Constants from '../../constants.js'
import './ImageLinkForm.scss'



//For uploading images
class ImageLinkForm extends Component {
    constructor(props){
    super(props)
      this.state = {
        input: ''
      }
    //remove image and codes after refresh
    props.setImageUrl('')
    props.setImageCodes([])
    }

  keepColors = (data) => {
      const clarifaiColors = data.outputs[0].data.colors
      this.props.setImageCodes(clarifaiColors)
    }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.props.setImageUrl(this.state.input)
        fetch(Constants.imageURL, {
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
                      colorArrValue.push((color.value).toFixed(2))
                      )
            })
            //----------------------------------------------------------------
            if(this.props.currentUser){
              fetch(Constants.postColorsInDB, {
                      method: 'post',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({
                        input: this.state.input,
                        id: this.props.currentUser.id,
                        colors: colorArr,
                        colorValue: colorArrValue
                      })
                    })
                    .then(response => response.json())
                     .then(response => {
                      fetch(Constants.incrementEntries, {
                      method: 'put',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({
                        id: response[0],
                      })
                    })   
                    .then(response => response.json())
                    .then(count => {
                      this.props.setEntries(count)
                      })
                    .catch(console.log)
                     })
                    .catch(err => console.log('unable to post colors: ', err))
                  }
          
            
          })
          .catch(err => console.log(err));
    }

  render(){
    return (
    <Container className='header-imagelinkform' maxWidth="lg"> 
      <Typography className='heading-motto' variant="h4">
        This Color Model will detect dominant colors in your pictures
      </Typography>
        <div className='mw7 center pa3'>
          <div className='form-input-image'> 
            <input className='f4 pa2 w-70 center' placeholder="Your Image Link" type='text' 
            onChange={this.onInputChange}/>
            <Button color="default" variant="contained" onClick={this.onButtonSubmit}>DETECT</Button>
          </div>
       </div>
    </Container>
    )
  }
  
}

const mapStateToProps = createStructuredSelector({
  imageUrl: selectCurrentImageUrl,
  imageCodes: selectCurrentImageCodes,
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setImageUrl: image => dispatch(setImageUrl(image)),
  setImageCodes: codes => dispatch(setImageCodes(codes)),
  setEntries: entries => dispatch(setEntries(entries))
})


export default connect(mapStateToProps, mapDispatchToProps)(ImageLinkForm)