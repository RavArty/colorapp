import React from 'react';
import Color from './Color'

class ColorRecognition extends React.Component  {


  render(){
    
    const { colors, imgUrl} = this.props

  return (
  	<div className = 'center'>	
  			<table>
          <tbody>
            <tr>
              <th className = 'pa2'>
                <img alt='' src={imgUrl} width='500px' height='auto'/>
              </th>
              <th className = 'pa2'>
                {!colors
                  ? <div></div>
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
  
}

export default ColorRecognition;