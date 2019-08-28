import React from 'react';
import Cards from './Cards'
import { connect } from 'react-redux'
import {createStructuredSelector} from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import * as Constants from '../../constants'

//Dispaly all uploaded images; only for registered users
class HistoryCards extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      responsedata : []
    }
  }
componentDidMount(){
  const {id} = this.props.currentUser
  fetch(Constants.historyURL, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id
      })
    })
    .then(response => response.json())
    .then(response => {
      this.setState({responsedata: response})
    })
    .catch(error => console.log(error))
}
  render(){

    return(
    <div>
      {
			this.state.responsedata.map((img, i) =>{
				return( 
					<Cards
						key={i} 
            imgurl={this.state.responsedata[i].imgurl} 
            colors = {this.state.responsedata[i].colors}
            values = {this.state.responsedata[i].colorvalues}
            
					/>
				);
			})	
	    }
    </div>
  ) 
  }
  
  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(HistoryCards)