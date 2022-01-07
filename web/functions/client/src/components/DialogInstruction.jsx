/**
 * @Package: InstructionDialog.jsx
 * @Date   : Dec 29th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *   - https://mui.com/components/dialogs/
 *
*/

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import { COLORS, lorem } from './constants'
import matchbox from './../assets/matchbox.png'
import burn_img from './../assets/burn1.jpeg';

/******************************************************
	@Style
******************************************************/


let dialog_ht = 80
const img_ht = `${dialog_ht}vh`
let row_1 = dialog_ht * 0.035
let row_2 = dialog_ht * 0.15
let row_mid = dialog_ht * 0.40
let row_bot = dialog_ht * 0.25

const useStyles = (isOnMobile) => makeStyles((theme: Theme) => createStyles({

	container: {
		backgroundImage: `url(${burn_img})`,
        background: 'black',
	},

    // text container

    textContainer : {
        color: 'white',
        height: img_ht,
        display: 'flex',
    },

    textBorderContainer : {
        width: '100%',
    },

    row_1: {
        height: `${row_1}vh`,
        fontFamily: 'NeueMachina-Medium',
        fontSize: `${row_1*0.7}vh`,
        textAlign: 'left',
        borderBottom  : `2px solid ${COLORS.translucent}`,        
        paddingRight: theme.spacing(3),
    },

    row_2: {
        height: `${row_2}vh`,
        margin: 'auto',
        paddingTop: theme.spacing(3),
    },

    row_2_text: {
        fontSize: `${row_2*0.4}vh`,
        fontFamily: 'NeueMachina-Bold',
        color: 'black',
        textAlign: 'left',        
    },

    row_mid : {
        height: `${row_mid}vh`,
        paddingTop: theme.spacing(2),
        display: 'flex',
        flex: 1,
    },

    row_mid_left: {
        height: `${row_mid}vh`,
        width : `${dialog_ht*0.3}vh`,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
    },

    matchbox : {
        position: 'relative',
        top: `-${row_mid*0.15}vh`,
        width: `${dialog_ht*0.25}vh`
    },


    row_mid_right: {
        height: `${row_mid}vh`,
        width : `${dialog_ht*0.5}vh`,
    },    

    row_mid_rt_1: {
        width : `${dialog_ht*0.3}vh`,        
        fontSize: `${dialog_ht*0.25/10}vh`,
        fontFamily: 'NeueMachina-Bold',
        textAlign: 'left',      
        paddingTop: theme.spacing(3),
    },

    row_mid_rt_2: {
        fontSize: `${dialog_ht*0.25/12}vh`,
        fontFamily: 'NeueMachina-Medium',
        textAlign: 'left',        
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        borderBottom: `1.0px solid ${COLORS.translucent2}`,        
    },

    row_mid_rt_3: {
        width : `${dialog_ht*0.3}vh`,        
        fontSize: `${dialog_ht*0.25/10}vh`,
        fontFamily: 'NeueMachina-Ultralight',
        textAlign: 'left',        
        paddingTop: theme.spacing(0.5),
    },

    row_bot: {
        height: `${row_bot}vh`,
        width: `100%`,
    	background: 'black',
        display: 'flex',
        flexDirection: 'row',
    },    

    row_bot_col : {
    	width: `33%`,
        height: `${row_bot}vh`,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    row_bot_col_top : {
        fontSize: `${row_bot/4}vh`,
        fontFamily: 'NeueMachina-Bold',        
        textDecoration: 'underline'
    },

    row_bot_container: {
    	background: 'black'
    },

    row_bot_col_bot : {
        width: '50%',
        fontSize: `${row_bot/12}vh`,
        fontFamily: 'NeueMachina-Ultralight',        
        textAlign: 'center',
        paddingTop: theme.spacing(1),
    },    

}));



/******************************************************
	@views: dialog
******************************************************/


/**
 *
 * @use: faq text
 *
 **/
function Instruction(props){

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    

    return (
        <Box className={classes.textContainer}>
            <div className={classes.textBorderContainer}>

                <div className = {classes.row_1}>
                    FAQ
                </div>

                <div className = {classes.row_2}>
	                <div className = {classes.row_2_text}>
						* BURN TO BUILD
	                </div>
	                <div className = {classes.row_2_text}>
						* INVITE TO CREATE
	                </div>
                </div>                

                <div className = {classes.row_mid}>

                    <div className={classes.row_mid_left}>
	                    <Box 
		                    component='img'
							src={matchbox} 
							alt="" 
							className={classes.matchbox}
						/>
                    </div>

                    <Box sx={{ flexGrow: 1 }} />
                    
                    <div className={classes.row_mid_right}> 
                        <div className={classes.row_mid_rt_1} style={{color: 'black'}}> * WHAT IS A BURN </div>
                        <div className={classes.row_mid_rt_2}>
							{lorem.generateSentences(10)}
                        </div>

                    </div>
                </div>    
            </div>
        </Box>
    )
}


/**
 *
 * @use: footer instruction
 *
 **/
function FooterInstruction(props){

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    

    const Column = (props) => {
    	return (
			<div className={classes.row_bot_col} {...props}>
				<div className={classes.row_bot_col_top}>
					{props.top}
				</div>
				<div className={classes.row_bot_col_bot}>
					{props.bottom}
				</div>
			</div>
    	)
    }

    return (
		<div className={classes.row_bot} >
			<Column top={'01'} bottom={'CREATE YOUR BURN EVENT'}/>
			<Column top={'02'} bottom={'PUBLISH YOUR __ DATE'}/>
			<Column top={'03'} bottom={'ACCEPT NEW MEMBERS'}/>
		</div>			
    )
}


export default function DialogInstruction(props) {

	const { open, handleClose } = props
    const isOnMobile = useCheckMobileScreen(100);
    const classes = useStyles(isOnMobile)();    

	return (
		<Dialog onClose={handleClose} open={open} classes={{paper: classes.container}}>
			<DialogContent className={classes.container}>
				<Instruction/>
			</DialogContent>
	       <DialogActions className={classes.row_bot_container} >
	       		<FooterInstruction/>
	       </DialogActions>			
		</Dialog>
	);
}

export { FooterInstruction }