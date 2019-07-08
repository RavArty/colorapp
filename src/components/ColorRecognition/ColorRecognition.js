import React from 'react';
import Color from './Color'

const ColorRecognition = ({colors, imgUrl}) => {
  return (
  	<div className = 'center'>	
  			<table>
          <tbody>
            <tr>
              <th className = 'pa2'>
                <img alt='' src={imgUrl} width='500px' heigh='auto'/>
              </th>
              <th className = 'pa2'>
                {colors.map((color, i) =>{
                  return(
                  <Color
                    key={i}
                    colorCode={colors[i].raw_hex}
                    value={colors[i].value}
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