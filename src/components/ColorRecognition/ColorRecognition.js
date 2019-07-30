import React from 'react';
import Color from './Color'

class ColorRecognition extends React.Component  {


  fetchSync = () => {
    fetch('http://localhost:3000/postcolors', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.props.imgUrl,
        id: this.props.id,
        colors: this.props.colors
      })
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }
  async fetchAsync () {
    try{
      let response = await fetch('http://localhost:3000/postcolors', 
    {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.props.imgUrl,
            id: this.props.id,
            colors: this.props.colors
          })
        }
        )
      
    let data = await response.json();
    return data;
    //console.log(data)
    } catch{
        console.log('err')
    }
    
  }

  updateColorsTable = (colors) => {
    if (!colors){
      console.log('no colors')
    } else {
    //  this.fetchSync()
      this.fetchAsync()
      // let parsedColors

      // colors.map(color =>{
      //  // let tmp = [color.raw_hex, color.value]
      //   return(
      //   parsedColors = {...parsedColors, color}
      // );
      // })
    //  console.log('parsed: ', colors)
    }
    
}
  render(){
    
    const {id, colors, imgUrl} = this.props
    this.updateColorsTable(colors)
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
                    id = {id}
                    colorCode = {color.raw_hex}
                    value = {color.value}
                    // colorCode={colors[i].raw_hex}
                    // value={colors[i].value}
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