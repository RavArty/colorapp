import React from 'react';

//For for uploading images
const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
  return (
    <div>
      <p className='f3'>
        {'This Color Model will detect colors in your pictures. Give it a try!'}
      </p>
      <div className='mw7 center pa3'>
        <div className='bg-red center pa4 br4 shadow-5'>
          <input className='f4 pa2 w-70 center' placeholder="Your Image Link" type='text' 
          onChange={onInputChange}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib blue '
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;