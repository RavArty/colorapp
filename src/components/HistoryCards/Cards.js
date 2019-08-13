import React from 'react';
import Color from '../ColorRecognition/Color'
import ColorList from './ColorsList'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Cards.scss'
//import { Circle } from 'react-shapes'

const useStyles = makeStyles({
  card: {
		width: 350,
    // maxWidth: 445,
  },
  media: {
    height: 240,
  },
});

const Cards = (props) => {

	const classes = useStyles();

		const { colors, imgurl, values } = props
		const colorsCombine = []
		let singleValue = []
	//	console.log('colors12: ', colors)
	//	console.log('values23: ', values)
		 for (let i = 0; i < colors.length; i++){
		 	singleValue.push(colors[i])
		 	singleValue.push(values[i])
		 	colorsCombine.push(singleValue)	
		 	singleValue = []
		 }
		 console.log('colorsCombine: ', colorsCombine)
		//console.log(colors)
		return(
			<div className='header-cards'>
			<Card className={classes.card}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={imgurl}
					/>
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
						{colorsCombine.map((color, i) =>{
											return(
											<Color
												key={i}
												colorCode = {color[0]}
												value = {color[1]}
											/>
										);
										})}
							
						</Typography>
					</CardContent>
				</CardActionArea>
				
    	</Card>
			</div>
	);
	
	
}

export default Cards;