/**
 * @Package: constants.jsx
 * @Date   : Dec 22nd, 2021
 * @Author : Xiao Ling   
 *
 *
*/


import { LoremIpsum } from "lorem-ipsum";


/******************************************************
		@styles + contants
******************************************************/

const punk  = 'https://d7hftxdivxxvm.cloudfront.net/?resize_to=width&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FGwUiJa9FiNbnQkAboOSBlA%2Flarger.jpg&width=1200&quality=80'


const nifty_url = {
	preview: 'https://lh3.googleusercontent.com/gqvYS24xfrhIr1ougYdgvA9LQxNXTzBbs-JvTZA2Y872GkOKd9WK8lJ5uuZM6Qsy6PsPDPJiorp3f718t6Mb-mG_bXzr-fREtOAYhQ=s250',
	thumb: 'https://lh3.googleusercontent.com/gqvYS24xfrhIr1ougYdgvA9LQxNXTzBbs-JvTZA2Y872GkOKd9WK8lJ5uuZM6Qsy6PsPDPJiorp3f718t6Mb-mG_bXzr-fREtOAYhQ=s128',
	full: 'https://lh3.googleusercontent.com/gqvYS24xfrhIr1ougYdgvA9LQxNXTzBbs-JvTZA2Y872GkOKd9WK8lJ5uuZM6Qsy6PsPDPJiorp3f718t6Mb-mG_bXzr-fREtOAYhQ',
}

const translucent = 'rgba(255,255,255,0.1)';
const transparent = 'rgba(0,0,0,0.0)';
const white = `rgba(255,255,255,1.0)`

const COLORS = {
		white      : white,
		offwhite   : `rgba(255,255,255,0.75)`,
		offwhite_2 : `rgba(152,147,133,1)`,
		offwhite_filter: 'brightness(10%) invert(90%) sepia(10%)',
		
		black      : 'rgba(0,0,0,1.0)',
		offBlack   : `rgba(7,8,7,255)`,

		translucent: translucent,
		translucent2: 'rgba(255,255,255,0.25)',
		translucent3: 'rgba(255,255,255,0.50)',
		translucent4: 'rgba(255,255,255,0.75)',

		transparentDark1: 'rgba(0,0,0,0.75)',
		transparentDark2: 'rgba(0,0,0,0.50)',
		transparentDark3: 'rgba(0,0,0,0.25)',

		transparent: transparent,
		red        : 'red',
		red_1      : 'rgb(55,0,0)',
}

const lorem = new LoremIpsum({
		sentencesPerParagraph: {
				max: 8,
				min: 4
		},
		wordsPerSentence: {
				max: 16,
				min: 4
		}
});


function getCube(n){
	let k = Math.min(n,225)
	return require(`./../assets/incomplete_cubes/IncompleteCube${k}.png`)
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}    



const orphanData = [
	{
		img: 'https://lh3.googleusercontent.com/gqvYS24xfrhIr1ougYdgvA9LQxNXTzBbs-JvTZA2Y872GkOKd9WK8lJ5uuZM6Qsy6PsPDPJiorp3f718t6Mb-mG_bXzr-fREtOAYhQ',
		title: 'Breakfast',
		author: '@bkristastucchio',
		featured: true,
	},
	{
		img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
		title: 'Burger',
		author: '@rollelflex_graphy726',
	},
	{
		img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
		title: 'Camera',
		author: '@helloimnik',
	},
	{
		img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
		title: 'Coffee',
		author: '@nolanissac',
	},
	{
		img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
		title: 'Hats',
		author: '@hjrc33',
	},
	{
		img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
		title: 'Honey',
		author: '@arwinneil',
		featured: true,
	},
	{
		img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
		title: 'Basketball',
		author: '@tjdragotta',
	},
	{
		img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
		title: 'Fern',
		author: '@katie_wasserman',
	},
	{
		img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
		title: 'Mushrooms',
		author: '@silverdalex',
	},
	{
		img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
		title: 'Tomato basil',
		author: '@shelleypauls',
	},
	{
		img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
		title: 'Sea star',
		author: '@peterlaster',
	},
	{
		img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
		title: 'Bike',
		author: '@southside_customs',
	},
];

function getRandomArbitrary(min, max) {
 	return Math.round(Math.random() * (max - min) + min);
}



export {
		lorem,
		COLORS,
		punk,
		orphanData,
		getCube,
		getRandomInt,
		nifty_url,
		getRandomArbitrary
}