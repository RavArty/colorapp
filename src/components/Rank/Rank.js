import React from 'react';

class Rank extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { name, entries } = this.props
    return (
    <div>
      <div className='black f3 mt5'>
        {`Hi ${name}, upload any image...`}
      </div>
      {/* <div className='black f1'>
        {entries}
      </div> */}
    </div>
  );
  }
  
}

export default Rank;