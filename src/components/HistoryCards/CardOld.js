import React from 'react';
import Color from '../ColorRecognition/Color'

import { Circle } from 'react-shapes'

class Card extends React.Component {

	render(){
		const { colors, imgurl } = this.props

		return(
			<div className='tc bg-light-green dib br3 pa3 ma2 grow shadow-5'>
				<img alt='' src={imgurl} width='500px' height='auto'/>
				<div className = 'mw8 pa2 center br4 shadow-3'>
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