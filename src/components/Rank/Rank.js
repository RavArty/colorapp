import React from 'react';
import Typography from '@material-ui/core/Typography';

class Rank extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { name, entries } = this.props
    return (
    <div>
      <Typography variant="h4">
        {`Hi ${name}, upload any image...`}
      </Typography>
      {/* <div className='black f3 mt5'>
        {`Hi ${name}, upload any image...`}
      </div> */}
      <Typography variant="h4">
        {`Uploaded images: ${entries}`}
      </Typography>
      {/* <div className='black f1'>
        {entries}
      </div> */}
    </div>
  );
  }
  
}

export default Rank;