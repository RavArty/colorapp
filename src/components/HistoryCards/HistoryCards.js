import React from 'react';
import Card from './Card'

class HistoryCards extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      responsedata : []
    }
  }
componentDidMount(){
  const {id} = this.props
  fetch('http://localhost:3000/history', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log('historyresp:', response)
      this.setState({responsedata: response})
    })
    .catch(error => console.log(error))
}
  fetchHistoryData = (id) => {
    fetch('http://localhost:3000/history', {
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
 //   const {id} = this.props.location.state
 //   this.fetchHistoryData(id)
 //   console.log('history: ', this.state.responsedata)
    return(
    <div>
      {
			this.state.responsedata.map((img, i) =>{
				return( 
					<Card 
						key={i} 
						imgurl={this.state.responsedata[i].imgurl} 
					/>
				);
			})	
	    }
    </div>
  ) 
  }
  
  
}

export default HistoryCards;