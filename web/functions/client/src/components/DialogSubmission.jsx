/**
 * @Package: DialogSubmission.jsx
 * @Date   : Dec 29th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *   - https://mui.com/components/dialogs/
 *
*/

import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Paper } from "@material-ui/core";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {CubeTableWithImage} from './CubeTable';
import AppSnackbar from './AppSnackbar';
import { FooterInstruction } from './DialogProfile'

import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import { COLORS } from './constants'
import burn_img from './../assets/burn1.jpeg';
import cube1 from './../assets/1.jpg';
import './cornerBorder.css';



/******************************************************
    @Style
******************************************************/


let dialog_ht = 80
let header_row = dialog_ht * 0.04
let content_row = dialog_ht - header_row // dialog_ht * 0.90

const inputProps = {
    fontFamily: 'NeueMachina-Bold',              
    fontSize: '18px',                               
    color: 'black',
}

const btnProps = {
    fontFamily: 'NeueMachina-Black',              
    fontSize: '18px',                               
    color: COLORS.white,
}


const useStyles = (isOnMobile) => makeStyles((theme: Theme) => createStyles({

    container: {
        background: 'black',
    },

    textContainer : {
        color: 'white',
        height: `${dialog_ht}vh`,
        display: 'flex',
    },

    textBorderContainer : {
        width: '100%',
    },

    // header

    header_row: {
        height: `${header_row}vh`,
        fontFamily: 'NeueMachina-Bold',
        fontSize: `${header_row*0.6}vh`,
        textAlign: 'left',
        borderBottom  : `2px solid ${COLORS.translucent}`,        
        paddingRight: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',        
    },

    // instructionleft

    content_row : {
        height: `${content_row}vh`,
        paddingTop: theme.spacing(2),
        display: 'flex',
        flex: 1,
    },

    content_row_text: {
        height: `${content_row}vh`,
        width : isOnMobile ? '100%' : '50%',
        padding: theme.spacing(2),
        backgroundImage: `url(${burn_img})`,        
        background: COLORS.red_1, 
    },   

    prompt : {
        fontFamily: 'NeueMachina-Regular',
        fontSize: `15px`,
        textAlign: 'left',              
        color: 'white',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        marginBottom: theme.spacing(3),
        borderBottom: `2px solid ${COLORS.translucent}`,        
        width: `95%`
    },


    // instruction right
    content_row_cube: {
        width : '50%',
        alignItems: 'center',
        position: 'relative',
        background: 'black',
        marginBottom: theme.spacing(4),
    },    


    center_child : {
        position: 'absolute',
        top: '50%',
        margin:0,
        transform: 'translateY(-50%)'
    },


    cube_padding : {
        height: theme.spacing(3)
    },

    padded: {
        paddingTop: theme.spacing(2),
        width: `95%`,
    },    

    mintButton :{
        height: '50px',
        width: '50%',
        borderColor: 'white'
    },


    row_bot_container: {
        background: 'black'
    },

}));




/******************************************************
    @views: dialog
******************************************************/


/**
 *
 * @Use: input form for address, tokId,
 *       about section and the mint button
 *
 **/
function InstructionLeft(props){

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    

    const { 
        addressValue, 
        tokIDValue, 
        aboutValue, 
        changeAddressValue,
        changeTokIDValue,
        changeAboutValue,
        goMint,
        showProgress,
        animateCubes,
    } = props;

    return (
        <Paper className={classes.content_row_text} >
            <Box
                component="form"
                autoComplete="off"
                sx={{ input: { color: COLORS.offwhite } }}
            >        
            <Stack
                component="form"
                sx={{width: '100%'}}
                spacing={1}
                noValidate
                autoComplete="off"
            >
                <div className={classes.prompt}>
                    The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.)
                    that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless 
                    filler text can be very useful when the focus is meant to be on design, not content.
                </div>

                <Stack spacing={2}>
                    <TextField
                        error
                        hiddenLabel
                        autoFocus
                        id="filled-hidden-label-address"
                        variant="standard"
                        label="Contract Address"
                        size="small"
                        className={classes.padded}
                        inputProps={{style: inputProps}}
                        value = {addressValue}
                        onChange={(e) => { changeAddressValue(e.target.value ?? "")   }}
                    />
                    <TextField
                        error
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        variant="standard"
                        label="Token ID"
                        className={classes.padded}                            
                        inputProps={{style: inputProps}}
                        value = {tokIDValue}
                        onChange={(e) => { changeTokIDValue(e.target.value ?? "") }}                            
                    />
                    <TextField
                        error
                        multiline
                        rows={4}
                        hiddenLabel
                        id="filled-hidden-label-about"
                        variant="standard"
                        label="Tell us the kind of community you'd like to build around this nfty"
                        className={classes.padded}                            
                        inputProps={{style: inputProps}}
                        value = {aboutValue}
                        onChange={(e) => { changeAboutValue(e.target.value ?? "") }}
                    />  
                    <div style={{height:'20px'}}/>
                    { animateCubes 
                        ? 
                        <div className={classes.prompt} style={{borderBottom:'0.1px transparent'}}> Minting ... </div>
                        : 
                        <Button 
                            variant="outlined" 
                            color="error" 
                            className={classes.mintButton} 
                            sx={ { borderRadius: 30 } }
                            onClick = {goMint}
                            style = {btnProps}
                        >
                            Mint
                        </Button>                  
                    }
                   { showProgress ? <LinearProgress color="error" style={{width:'50%'}} /> : <></> }     
                </Stack>
            </Stack>

            </Box>
        </Paper>
    )    
}


/**
 *
 * @Use: main content view
 *
 *                       
 **/
function ContentView(props){

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)(); 

    const { handleMint, handleClose, animateCubes, preview_url, isFullCube } = props;

    const [addressValue, changeAddressValue] = useState("");
    const [tokIDValue, changeTokIDValue] = useState("");
    const [aboutValue, changeAboutValue] = useState("");

    function goMint(){
        handleMint({  tokID: tokIDValue, address: addressValue, about: aboutValue });
    }

    return (
        <Box className={classes.textContainer}>
            <div className={classes.textBorderContainer}>

                <div className = {classes.header_row}>
                    <div>
                        MINT
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton aria-label="close" onClick={handleClose}>
                        <CloseIcon sx={{color:COLORS.translucent3}}/>
                    </IconButton>
                </div>

                <div className = {classes.content_row}>                    
                
                    <InstructionLeft 
                        {...props}
                        addressValue={addressValue}
                        tokIDValue={tokIDValue}
                        aboutValue={aboutValue}
                        changeAddressValue = {changeAddressValue}
                        changeTokIDValue = {changeTokIDValue}
                        changeAboutValue = {changeAboutValue}
                        goMint={goMint}
                    />

                    <Box sx={{ flexGrow: 1 }} />
                    
                    {isOnMobile ? <></> :

                        <Stack spacing={1} className={classes.content_row_cube}>
                            <div className={classes.center_child}>
                                <div className={'box-corner'}>
                                     <CubeTableWithImage
                                        {...props}                                        
                                        hideBlackBackground = {isFullCube}
                                        imgSrc={ preview_url === "" ? cube1 : preview_url }
                                        animateCubes={animateCubes}
                                    />    
                                </div>
                            </div>
                       </Stack>
                   }
                </div>    
            </div>

            {/* toast */}
            <AppSnackbar
                {...props}
                vertical={"bottom"}
                horizontal={"center"}
            />
        </Box>
    )
}


/******************************************************
    @export view
******************************************************/


/**
 *
 * @use: wrap main content in dialog view
 *       with footer actions
 *
 **/
export default function DialogSubmissionView(props) {

    const { open, handleClose } = props
    const isOnMobile = useCheckMobileScreen(100);
    const classes = useStyles(isOnMobile)();    

    return (
        <Dialog
            fullWidth
            maxWidth="xl"            
            open={open}
            onClose={handleClose}
            classes={{paper: classes.container}}
        >
            <DialogContent className={classes.container}>
                <ContentView {...props}/>
            </DialogContent>
           <DialogActions className={classes.row_bot_container} >
                <FooterInstruction {...props}/>
           </DialogActions>         
        </Dialog>
    );
}



