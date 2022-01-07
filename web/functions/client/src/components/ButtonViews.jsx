/**
 * @Package: ButtonViews
 * @Date   : Dec 27th, 2021
 * @Author : Xiao Ling   
 *
 *
*/


import React from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';


/******************************************************
	@styles
******************************************************/

const mobile_R = 70;
const desktop_R = 32;


const useStyles = (isOnMobile) => makeStyles((theme: Theme) => createStyles({


    mintButton :{
        height: '50px',
        width : isOnMobile ? `${mobile_R/3-3}vw` : `${desktop_R/3-3}vw`,
    },

    wrappedToken: {
        width : isOnMobile ? '50vw' : '20vw',
        height: isOnMobile ? '50vw' : '20vw',
        position: 'absolute',
    },


}));


/******************************************************
	@View
******************************************************/



/**
 *
 * @Use: buttons for navigating submissions
 *
 *
 **/
function ButtonTabA(props){

	const isOnMobile = useCheckMobileScreen(1000);
	const classes = useStyles(isOnMobile)() 

	const { onTapStakeBtn,
			btnLabel ,
			onTapPrevBtn,
			onTapNextBtn,
			onTapSubmitBtn,
		} = props;

	return (
		<Stack direction="row" alignItems="center" spacing={2}>

			<IconButton color="error" aria-label="upload picture" component="span" onClick={onTapPrevBtn}>
				<ChevronLeftIcon />
			</IconButton>		

			<Button 
				variant="outlined" 
				color="error" 
				className={classes.mintButton} 
				sx={ { borderRadius: `30px 1px 1px 30px` } }
				onClick = {onTapStakeBtn}
			>
				<h4 style={{fontFamily: 'NeueMachina-Black'}}>
					{btnLabel}
				</h4>
			</Button>        

			<Button 
				variant="outlined" 
				color="error" 
				className={classes.mintButton} 
				sx={ { borderRadius: `1px 30px 30px 1px` } }
				onClick = {onTapSubmitBtn}
			>
				<h4 style={{fontFamily: 'NeueMachina-Black'}}>
					Submit
				</h4>
			</Button>        	


			<IconButton color="error" aria-label="upload picture" component="span" onClick={onTapNextBtn}>
				<ChevronRightIcon />
			</IconButton>		


		</Stack>
	)	
}


/**
 *
 * @Use: buttons for navigating submissions
 *
 *
 **/
function ButtonTabB(props){

	const { onTapPrevBtn, onTapSubmitBtn, onTapNextBtn } = props;

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)() 


	return (
		<Stack direction="row" alignItems="center" spacing={2}>

			<IconButton color="error" aria-label="upload picture" component="span" onClick={onTapPrevBtn}>
				<ChevronLeftIcon />
			</IconButton>		

			<Button 
				variant="outlined" 
				color="error" 
				className={classes.mintButton} 
				sx={ { borderRadius: `30px 30px` } }
				onClick = {onTapSubmitBtn}
			>
				<h4 style={{fontFamily: 'NeueMachina-Black'}}>
					Submit
				</h4>
			</Button>        				

			<IconButton color="error" aria-label="upload picture" component="span" onClick={onTapNextBtn}>
				<ChevronRightIcon />
			</IconButton>		


		</Stack>
	)	
}



/**
 *
 * @Use: buttons for navigating submissions
 *
 *
 **/
function ButtonTabC(props){

	const { onTapPrevBtn, onTapNextBtn } = props;

	return (
		<Stack direction="row" alignItems="center" spacing={2}>

			<IconButton color="error" aria-label="upload picture" component="span" onClick={onTapPrevBtn}>
				<ChevronLeftIcon />
			</IconButton>		

			<IconButton color="error" aria-label="upload picture" component="span" onClick={onTapNextBtn}>
				<ChevronRightIcon />
			</IconButton>		


		</Stack>
	)	
}


/**
 *
 * @Use: buttons for navigating submissions
 *
 *
 **/
function ButtonTabD(props){

	const { onTapSubmitBtn, btnLabel } = props;
    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();

	return (
		<Stack direction="row" alignItems="center" spacing={2}>

			<Button 
				variant="outlined" 
				color="error" 
				className={classes.mintButton} 
				sx={ { borderRadius: `30px` } }
				onClick = {onTapSubmitBtn}
			>
				<h4 style={{fontFamily: 'NeueMachina-Black'}}>
					{btnLabel}
				</h4>
			</Button>        	


		</Stack>
	)	
}



export { ButtonTabA, ButtonTabB, ButtonTabC, ButtonTabD  }




