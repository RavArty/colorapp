import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import './ImageLinkForm.scss'

//For for uploading images
const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
  return (
    <Container className='header-imagelinkform' maxWidth="lg"> 
      <Typography className='heading-motto' variant="h4">
        This Color Model will detect dominant colors in your pictures
      </Typography>
      {/* <p className='f3'>
        {'This Color Model will detect dominant colors in your pictures.'}
      </p> */}
      <div className='mw7 center pa3'>
        {/* <div className='bg-red center pa4 br4 shadow-5'> */}
        <div className='form-input-image'> 
          <input className='f4 pa2 w-70 center' placeholder="Your Image Link" type='text' 
          onChange={onInputChange}/>
          <Button color="default" variant="contained" onClick={onButtonSubmit}>DETECT</Button>
          {/* <button
            className='w-30 grow f4 link ph3 pv2 dib blue '
            onClick={onButtonSubmit}
          >Detect</button> */}
        </div>
      </div>
    </Container>
  );
}

export default ImageLinkForm;