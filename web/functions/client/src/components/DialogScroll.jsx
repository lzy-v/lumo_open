/**
 *
 * @Package: ScrollDialoge
 * @Date   : Dec 28th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *
**/

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';



const useStyles = (isOnMobile) => makeStyles((theme: Theme) => createStyles({

    // text container
    container : {
    	background: 'black',
    },

    titleBar : {
    	background: 'black',
    	color: 'white',
        fontFamily: 'NeueMachina-Regular',
    }, 

    footerText: {
    	color: 'white',
        fontFamily: 'NeueMachina-Bold',
    },

}));


/**
 *
 * @Use: wrap around any children with scroll action
 *
 **/
export default function ScrollDialog(props) {

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    
	const [scroll] = React.useState('paper');

	const { open, handleClose, ChildView } = props

	// const descriptionElementRef = React.useRef(null);
	// 	React.useEffect(() => {
	// 		if (open) {
	// 		  const { current: descriptionElement } = descriptionElementRef;
	// 		  if (descriptionElement !== null) {
	// 			descriptionElement.focus();
	// 		  }
	// 	}
	// }, [open]);

	return (
		<Dialog
            fullWidth          			
            maxWidth="md"  
			open={open}
			onClose={handleClose}
			scroll={scroll}
			aria-labelledby="scroll-dialog-title"
			aria-describedby="scroll-dialog-description"
		>

			<DialogContent className={classes.container}>
				<ChildView {...props}/>
			</DialogContent>

			{/* footer */}
			<DialogActions className={classes.titleBar}>
				<Button onClick={handleClose} className={classes.footerText}>
					<div className={classes.footerText}>
						Done
					</div>
				</Button>
			</DialogActions>
		</Dialog>

	);
}

