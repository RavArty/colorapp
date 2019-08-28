import React from 'react';
import Color from './Color'
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect';
import { selectCurrentImageUrl } from '../../redux/image/image.selectors';
import { selectCurrentImageCodes } from '../../redux/image/image.selectors';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));
//display image and colors after clicking button "DETECT"
//progress bar spinning while waiting for colors to be obtained
const ColorRecognition = ({ imageCodes, imageUrl }) =>  {

   const classes = useStyles();

  return (
  	<div className = 'center'>	
  			<table>
          <tbody>
            <tr>
              <th className = 'pa2'>
                <img alt='' src={imageUrl} width='500px' height='auto'/>
              </th>
              <th className = 'pa2'>
                {(!imageCodes && imageUrl)
                  ? <CircularProgress className={classes.progress} />
                  : imageCodes.map((color, i) =>{
                  return(
                    <Color
                      key={i}
                      colorCode = {color.raw_hex}
                      value = {color.value}
                    />
                  )
                })
              }   
              </th>
            </tr>
          </tbody>
	    </table>
    </div>
  );

  
}
const mapStateToProps = createStructuredSelector({
  imageUrl: selectCurrentImageUrl,
  imageCodes: selectCurrentImageCodes
})

export default connect(mapStateToProps)(ColorRecognition)