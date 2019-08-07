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
  console.log('history mount: ', this.props.location.state.id)
  const {id} = this.props.location.state
  fetch('http://localhost:3000/history', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id
      })
    })
    .then(response => response.json())
    .then(response => {
  //    console.log('historyresp:', response)
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
 //   console.log('history: ', this.state.responsedata[0])
    return(
    <div>
      {
			this.state.responsedata.map((img, i) =>{
				return( 
					<Card 
						key={i} 
            imgurl={this.state.responsedata[i].imgurl} 
            colors = {this.state.responsedata[i].colors}
            
					/>
				);
			})	
	    }
    </div>
  ) 
  }
  
  
}

export default HistoryCards;