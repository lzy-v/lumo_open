/**
 * @Package: DialogLogin.jsx
 * @Date   : Dec 31st, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *   - https://mui.com/components/dialogs/
 *
*/


import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import { COLORS } from './constants'
import burn_img from './../assets/burn1.jpeg';

/******************************************************
    @View: exported
******************************************************/

const useStyles = (isOnMobile) =>  makeStyles((theme: Theme) => createStyles({

	container: {
		backgroundImage: `url(${burn_img})`,		
	},	

	header : {
		backgroundImage: `url(${burn_img})`,				
		background: 'black',		
        borderBottom  : `2px solid ${COLORS.translucent}`,                
	},

	headerFont : {
        fontFamily: 'NeueMachina-Medium',
        fontSize: `20px`,
        textAlign: 'left',				
        color: 'white',
	},

	prompt : {
        fontFamily: 'NeueMachina-Regular',
        fontSize: `15px`,
        textAlign: 'left',				
        color: 'white',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
	},

    padded: {
        paddingTop: theme.spacing(2),
    },

    error :{
    	height: theme.spacing(2),
    	width: '90%'
    },

}));

const inputProps = {
	fontFamily: 'NeueMachina-Bold',              
	fontSize: '18px',                               
    color: 'black',
}

/******************************************************
    @View: exported
******************************************************/

/**
 *
 *
 * @Use: accept authentication information
 *       use `props.function` to check if 
 *       auth information is valid format 
 *
**/
export default function DialogLogin(props) {

	const { 
		open, 
		handleClose, 
		handleConfirm,
		emailValue, 
		passwordValue, 
		didChangePassword, 
		didChangeEmail,
		emailError,
		passwordError,
		headerValue,
	} = props

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle className={classes.header} >
					<div className={classes.headerFont}>
						{ headerValue ?? "Authenticate" }
					</div>
				</DialogTitle>
				<DialogContent className={classes.container}>
					<div className={classes.prompt}>
						Please sign in with email and password
					</div>
					<div>
						<TextField
						    error						
							autoFocus
							fullWidth
							margin="dense"
							id="email"
							label="Email"
							type="text"
							variant="standard"
							value = {emailValue}
							helperText={emailError}						    
						    inputProps={{style: inputProps }}
						    onChange={didChangeEmail}
						    className={classes.padded}	
						/>
						<TextField
						    error						
							fullWidth
							margin="dense"
							id="password"
							label="Password"
							type="text"
							variant="standard"
							value = {passwordValue}
							helperText={passwordError}
						    inputProps={{style: inputProps }}
			                onChange={didChangePassword}
						    className={classes.padded}	
						/>		
					</div>
				</DialogContent>
				<DialogActions className={classes.header}>
					<Button onClick={handleClose} style={{color:COLORS.translucent2, fontFamily: 'NeueMachina-Medium'}}>
						Cancel
					</Button>
					<Button onClick={handleConfirm} style={{color:'white', fontFamily: 'NeueMachina-Medium'}}>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
