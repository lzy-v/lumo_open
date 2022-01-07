/**
 *
 *
 * @Package: AppBodyTemplate
 * @Date   : Dec 28th, 2021
 * @Author : Xiao Ling   
 *
 *
*/


import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fade from '@mui/material/Fade';

// Lumo modules
import AppFooter from './AppFooter';
import { AppHeader } from './AppHeader';
import VideoBackground from './VideoBackground';
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import { COLORS } from './constants'


/******************************************************
	@styles
******************************************************/


// gradient style 
const bg_gradient = {
	// background: `-webkit-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))`,
	// background: `radial-gradient(ellipse at top rgba(0, 0, 0, 0.5), rgba(0,0,0,0.9))`,		
	background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0,0,0,0.9))`,		
}


const useStyles = makeStyles((theme) => ({

	bodyContainer: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		background: COLORS.offBlack,
	},

	// left container block

	leftContainer : {
		display: "flex",          
		justifyContent: 'center',
		height: `calc(100vh - 180px)`,
		paddingTop: theme.spacing(8),
		// background: 'red',
	},

	leftContainerInner: {
		display: "flex",
		alignItems: "center",		
	},  

	leftContainerBottomLeft : {
		position: 'fixed',
		left: theme.spacing(6),
		bottom: 120,
	},

	leftContainerTopLeft : {
		position: 'fixed',
		left: theme.spacing(6),
		top: 120,
	},

	// right container block
	rightContainer: {
		// textAlign:'center',
		// background: 'blue',
	},


}));




/******************************************************
	@Base views
******************************************************/

/**
 *
 * @Use: app template view w/ progressive
 *       loading of different elemnents
 *
 **/
export default function AppBodyTemplateView(props){

	const classes    = useStyles();
	const isOnMobile = useCheckMobileScreen(1000);
	const header_footer_ht = 0; // 200;

	const { LeftCenterView, 
			LeftBottomView, 
			TopLeftView,
			RightSideView ,
		} = props;


	const _center_left = (props.centerLeft !== null) ? props.centerLeft : false

	// animate style and appearence of items
	const DELAY_BG = 300;
	const VIDEO_BG_DELAY = DELAY_BG*10;
	const [showRight, setRight] = useState(false);
    const [style, setStyle] = useState({background: COLORS.offBlack });

	useEffect(() => {
		setTimeout(() => {
			setStyle(bg_gradient)
		},DELAY_BG)
		setTimeout(() => {
			setRight(true)
		},DELAY_BG*2)
	}, []);	

	const navigate = useNavigate();


	function onClickLogo(){
		navigate('/')
	}


	// const RightScreenView = (props) => {
	// 	return (
	// 		<div className={ classes.rightContainer}>
	// 	        <Fade in={showRight} unmountOnExit>		
	// 	        	<div><RightSideView {...props} /></div>
	// 			</Fade>
	// 		</div>  			
	// 	)
	// }


	const SplitScreen = () => {
		return (
			<Grid container spacing={0}>
				<Grid 
					item xs={12} md={6} 
					className={classes.leftContainer}
				>   
					<div className={classes.leftContainerInner}>
						<LeftCenterView {...props}/>
					</div>
					<div className={classes.leftContainerBottomLeft}>
						<LeftBottomView {...props}/>
					</div>
					<div className={classes.leftContainerTopLeft}>
						<TopLeftView {...props}/>
					</div>
				</Grid>
				<Grid 
					item xs={12} md={6} 
					className={classes.rightContainer}
					style={{height: `calc(100vh - ${header_footer_ht}px)`, zIndex: isOnMobile ? -100: 1}}
				>
					{
						(!isOnMobile)
						?  <RightSideView {...props}/>
						:  <div className={classes.rightContainer}/>														
					}		
				</Grid>
			  </Grid>

		)
	}

	const SingleScreen = () => {
		return (
			<Grid container spacing={0}>
				<Grid 
					item xs={12} md={12} 
					className={classes.leftContainer}
					style={{height: `calc(100vh - ${header_footer_ht}px)`}}
				>   
					<div className={classes.leftContainerInner}>
						<LeftCenterView {...props}/>
					</div>
				</Grid>
			</Grid>
		)
	}


	return (
		<>
			<VideoBackground delay={VIDEO_BG_DELAY} />			
			<AppHeader {...props} onClickLogo={onClickLogo} />
			<div className={ classes.bodyContainer } style={style}>
				{ _center_left ?  <SingleScreen/> : <SplitScreen/> }
				<AppFooter {...props}/>
			</div>
		</>

	)   
}
