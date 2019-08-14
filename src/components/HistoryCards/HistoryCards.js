import React from 'react';
import Cards from './Cards'

class HistoryCards extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      responsedata : []
    }
  }
componentDidMount(){
  const {id} = this.props.location.state
//  fetch('http://localhost:3000/history', {
  fetch('https://warm-forest-93262.herokuapp.com/history', { 
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
  fetchHistoryData = (id) => {
    fetch('https://warm-forest-93262.herokuapp.com/history', { 
  //  fetch('http://localhost:3000/history', {
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

    console.log('history13: ', this.state.responsedata)
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

export default HistoryCards;