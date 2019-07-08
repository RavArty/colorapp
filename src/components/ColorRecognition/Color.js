import React from 'react';
import { Circle } from 'react-shapes'

const Color = (props) => {

  return (
    <div >
      <div className = 'mw8 pa2 center br4 shadow-3'>
        {`${props.colorCode}, ${Number(props.value * 100).toFixed(2)}%  `}
        <Circle r={10} fill={{color: props.colorCode}} />
      </div>
      <div className='pb2'></div>
    </div>
  );
}

export default Color;