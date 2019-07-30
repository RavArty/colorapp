import React from 'react';

const Card = (props) =>{
	return(
		<div className='tc bg-light-green dib br3 pa3 ma2 grow shadow-5'>
			{/* <img alt='robots' src={`${props.imgurl}?200x200`} /> */}
			<img alt='' src={props.imgurl} width='500px' height='auto'/>
		</div>
	);
}

export default Card;