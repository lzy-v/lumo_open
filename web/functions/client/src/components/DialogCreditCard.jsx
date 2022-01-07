/**
 * @Package: DialogCreditCard.jsx
 * @Date   : Dec 29th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *   - https://mui.com/components/dialogs/
 *
*/


import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import { COLORS, lorem } from './constants'
import burn_img from './../assets/burn1.jpeg';

/******************************************************
    @View: exported
******************************************************/

const useStyles = (isOnMobile) =>  makeStyles((theme: Theme) => createStyles({

	container: {
		backgroundImage: `url(${burn_img})`,		
		background: 'black',
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

}));

const inputProps = {
	fontFamily: 'NeueMachina-Bold',              
	fontSize: '18px',                               
    color: 'black',
}

/******************************************************
    @View: exported
******************************************************/

export default function DialogCreditCard(props) {

	const { open, handleClose } = props
    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle className={classes.header} >
					<div className={classes.headerFont}>
						Payment Information
					</div>
				</DialogTitle>
				<DialogContent className={classes.container}>
					<div className={classes.prompt}>
						{lorem.generateSentences(3)}						
					</div>
					<div>
						<TextField
						    error						
							autoFocus
							fullWidth
							margin="dense"
							id="card number"
							label="Card Number"
							type="text"
							variant="standard"
						    className={classes.padded}	
						    inputProps={{style: inputProps }}
						/>
						<div style={{ display: 'flex', flexDirection: 'row'}}>
							<TextField
							    error
								margin="dense"
								id="month"
								label="Expiration month"
								type="text"
								variant="standard"						    
							    className={classes.padded}	
							    inputProps={{style: inputProps }}
							/>
		                    <Box sx={{ flexGrow: 1 }} />
							<TextField
					    		error
								id="year"
								margin="dense"								
								label="Expiration year"
								type="text"
								variant="standard"						    
							    className={classes.padded}	
							    inputProps={{style: inputProps }}
							/>
		                    <Box sx={{ flexGrow: 1 }} />							
							<TextField
					    		error
								id="cvv"
								label="CVV"
								type="text"
								margin="dense"								
								variant="standard"						    
							    className={classes.padded}	
							    inputProps={{style: inputProps }}
							/>		   
		                    <Box sx={{ flexGrow: 1 }} />														                 
						</div>				
					</div>
				</DialogContent>
				<DialogActions className={classes.header}>
					<Button onClick={handleClose} style={{color:COLORS.translucent2, fontFamily: 'NeueMachina-Medium'}}>
						Cancel
					</Button>
					<Button onClick={handleClose} style={{color:'white', fontFamily: 'NeueMachina-Medium'}}>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
