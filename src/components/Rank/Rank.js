import React from 'react';

class Rank extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { name } = this.props
    return (
    <div>
      <div className='black f3'>
        {`Hi ${name}, upload any image...`}
      </div>
      {/* <div className='black f1'>
        {this.state.entries}
      </div> */}
    </div>
  );
  }
  
}

export default Rank;