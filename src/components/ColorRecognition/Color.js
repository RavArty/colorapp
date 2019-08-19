import React from 'react';
import { Circle } from 'react-shapes'

class Color extends React.Component {

  render(){
    console.log('colors: ', this.props.colorCode)
    return (
    <div >
      <div className = 'mw8 pa2 center br4 shadow-3'>
        {`${this.props.colorCode}, ${Number(this.props.value * 100).toFixed(2)}%  `}
        &nbsp;<Circle r={10} fill={{color: this.props.colorCode}} />
        
      </div>
      <div className='pb2'></div>
    </div>
  );
  }
  
}

export default Color;