import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

class Rank extends React.Component {
 

  render(){
    const { currentUser, entries } = this.props
    let name = undefined
    if(currentUser){
      name = currentUser.displayName
    }
    return (
    <div>
      <Typography variant="h4">
        {`Hi ${name}, upload any image...`}
      </Typography>
      <Typography variant="h4">
        {`Uploaded images: ${entries}`}
      </Typography>
    </div>
  );
  }
  
}

const mapStateToProps = ({ user: { currentUser }, user: {entries}}) => ({
  currentUser,
  entries
});

export default connect(mapStateToProps)(Rank);