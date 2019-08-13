import React from 'react';
import Color from '../ColorRecognition/Color'

import { Circle } from 'react-shapes'

class Card extends React.Component {

	render(){
		const { colors, imgurl } = this.props
		console.log('history cards: ', colors)
		// const allItems = []
		// var item = []
		// for (let color in colors){
		// 	for (let [key, value] of Object.entries(color)) {
		// //	items.push(`${key}: ${value}`)
		// //	console.log('key:', `${key}`);
		// 	item = value.match(/[^\s"']+|"([^"]*)"/gmi)
		// }
		// allItems.push(item)
		// }
		// console.log('allitems: ' + allItems)
	//	console.log('items:', items[0].raw_hex)
	//	console.log('card colors: ', colors[0])
		return(
			<div className='tc bg-light-green dib br3 pa3 ma2 grow shadow-5'>
				{/* <img alt='robots' src={`${props.imgurl}?200x200`} /> */}
				<img alt='' src={imgurl} width='500px' height='auto'/>
				<div className = 'mw8 pa2 center br4 shadow-3'>
					{/* {`${props.colorCode}, ${Number(props.value * 100).toFixed(2)}%  `} */}
					<Circle r={10} />
							{colors.map((color, i) =>{
											return(
											<Color
												key={i}
												colorCode = {color}
												value = {colors[i]}
											/>
										);
										})}
				</div>
			</div>
	);
	}
	
}

export default Card;