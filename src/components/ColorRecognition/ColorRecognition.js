import React from 'react';
import Color from './Color'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));

const ColorRecognition = ({colors, imgUrl}) =>  {



  const classes = useStyles();

  return (
  	<div className = 'center'>	
  			<table>
          <tbody>
            <tr>
              <th className = 'pa2'>
                <img alt='' src={imgUrl} width='500px' height='auto'/>
              </th>
              <th className = 'pa2'>
                {!colors.length && imgUrl
                  ? <CircularProgress className={classes.progress} />
                  :
                
                colors.map((color, i) =>{
                  return(
                  <Color
                    key={i}
                    colorCode = {color.raw_hex}
                    value = {color.value}
                  />
                );
                })
               
              }   
              </th>
            </tr>
          </tbody>
	    </table>
    </div>
  );

  
}

export default ColorRecognition;