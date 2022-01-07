/**
 *
 * @Package: DialogProfile
 * @Date   : 1/1/2022
 * @Author : Xiao Ling   
 * @Docs:
 *
 *
**/


import React, {useState} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';

import AppSnackbar from './AppSnackbar';
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import {CubeTableWithImage} from './CubeTable';
import { ButtonTabD } from './ButtonViews';
import { SubmitTokenInput } from './CreditCardInput';
import { AppTextField } from './ChatTextInput'

import cube1 from './../assets/1-blur.jpeg';
import cube3 from './../assets/3-blur.jpeg';
import logo from './../assets/lumologo_white-small.png';
import { COLORS } from './constants';

/******************************************************
    @style
******************************************************/

let img_ht_num = 48
let row_1 = img_ht_num * 0.05
let row_2 = img_ht_num * 0.35
let row_3 = img_ht_num * 0.08
let row_4 = img_ht_num * 0.30


//@Use: dialog body style
const useStyles = (isOnMobile, editable) => makeStyles((theme: Theme) => createStyles({

    // container

    container : {
        color: 'white',
        width: '100%',
        display: 'flex',
        paddingTop: theme.spacing(4),
        background: 'black',
        backgroundImage: `url(${editable ? cube3 : cube1})`,
    },

    textBorderContainer : {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },

    // row containers

    row_1: {
        height: `${row_1}vh`,
        fontFamily: 'NeueMachina-Medium',
        fontSize: `${row_1*0.7}vh`,
        textAlign: 'left',
        margin: 'auto',        
        display: 'flex',
        flex: 1,        
        borderBottom  : `2px solid ${COLORS.white}`,        
        paddingRight: theme.spacing(3),
    },

    row_2: {

        height: `${row_2}vh`,
        fontSize: `${row_2*0.6}vh`,
        fontFamily: 'NeueMachina-Black',
        textAlign: 'left',        
        margin: 'auto',
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(1),
    },

    row_3: {
        height: `${row_3}vh`,
        fontSize: `${row_3*0.5}vh`,
        fontFamily: 'NeueMachina-Regular',
        textAlign: 'left',        
        margin: 'auto',
        paddingTop: theme.spacing(3),
        display: 'flex',
        flex: 1,
    },    


    row_4 : {
        height: `${row_4}vh`,
        display: 'flex',
        flex: 1,
        borderTop: `2px solid ${COLORS.translucent}`,
        paddingTop: theme.spacing(4),
    },

    row_4_left: {
        height: `${row_4}vh`,
        width : `${img_ht_num*0.3}vh`,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
    },


    row_4_lft_1: {
        width : `${img_ht_num*0.3}vh`,        
        fontSize: `${img_ht_num*0.25/10}vh`,
        fontFamily: 'NeueMachina-Bold',
        textAlign: 'left',        
    },

    row_4_lft_2: {
        paddingTop: theme.spacing(1.5),
        width : `${img_ht_num*0.3}vh`,        
        fontSize: `${row_3*0.7}vh`,
        fontFamily: 'NeueMachina-Medium',
        textAlign: 'left',        
    },

    row_4_lft_3: {
        width : `${img_ht_num*0.3}vh`,        
        fontSize: `${img_ht_num*0.25/10}vh`,
        fontFamily: 'NeueMachina-Ultralight',
        textAlign: 'left',        
        paddingTop: theme.spacing(0.5),
    },

    row_4_right: {
        height: `${row_4}vh`,
        width : `${img_ht_num}vh`,
        fontFamily: 'NeueMachina-Bold',
        fontSize: '13px',        
        textAlign: 'left',       
        lineHeight: 1.3,        
    },

    /// avatar hide
    row_5_alt: {
        height: '12vh',
        minHeight: '140px',
        width: '100%',

        display: 'flex',
        justifyContent: 'center',
        position: 'relative', 

        // for some reason this centers an item
        // filter: `brightness(1.0)`,  
        paddingLeft: theme.spacing(2),
        background: COLORS.black,        
    },

    change_avatar_btn : {
        height: '60px',
        width: '80vw',
        maxWidth: '600px',
    },

    change_avatar_btn_font: {
        fontSize: '25px',        
        fontFamily: 'NeueMachina-Black',
    },

    // avatar show
    row_5: {
        height: editable ? `70vh` : `60vh`,
        width: '100%',

        display: 'flex',
        justifyContent: 'center',
        position: 'relative', 

        // for some reason this centers an item
        filter: `brightness(1.0)`,  
        paddingLeft: theme.spacing(2),
        background: COLORS.black,
    },

    row_5_center : {
        position: 'absolute',
        top: '50%',
        margin:0,
        transform: 'translateY(-50%)'
    },


    row_5_btn : {
        width: '100%',
        height: '10vh',
        display: 'flex',
        justifyContent: 'center',
    },

    boxContainer: {
        display: 'grid',
    },

    boxInner: {
        gridArea: '1 / 1',
    },

    // footer
    row_6 : {
        width: '100%',
        filter: `brightness(0.75)`,  
        paddingLeft: theme.spacing(2),
        background: editable ? COLORS.black : COLORS.transparent,
        borderTop: editable ? `0.5px solid ${COLORS.translucent}` : "",                

    },

    row_bot_header : {
        color: 'white',
        fontFamily: 'NeueMachina-Bold',              
        fontSize: '14px',                               
        position: 'relative',
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },

    icon: {
        width: `20px`,
        height: `20px`,
        paddingRight: theme.spacing(3),
        position: 'relative',
        bottom: '3px'
    },

    row_bot_body : {
        fontFamily: 'NeueMachina-Medium',              
        fontSize: '12px',                               
        color: 'white',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        borderTop: `1px solid ${COLORS.translucent}`,                
    },

    row_bot_body_left : {
        width: '40%',        
    },

    row_bot_body_right:{
        width: '40%',
    },

    row_bot_container: {
        background: 'black'
    },

}));


const inputPropsAbout = {
    color: 'white',
    fontFamily: 'NeueMachina-Bold',
    fontSize: '13px',        
}

const inputPropsName = {
    fontSize: `${row_2*0.5}vh`,
    fontFamily: 'NeueMachina-Black',    
    color: 'white'
}


// @use: style for dialog only
const useDialogStyles = (isOnMobile) => makeStyles((theme: Theme) => createStyles({

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



/******************************************************
    @view: main
******************************************************/

/**
 *
 * @use: popup profile view
 *
 **/
function DialogProfileView(props){

   const { 
        editable,
        nameValue,
        bioValue,
        defaultName,
        defaultAbout,
        didChangeName,
        didChangeBio,
        connectedToMetamask,
        goConnectToMetamask,
        showProgress,
        showOpeanSea,
        setShowOpenSea,
        profileAvatar,
    } = props

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile, editable)();    

    const [showAvatar, setShowAvatar] = useState(false);

    function onTapChangeAvatar(){
        setShowAvatar(true)
    }

    return (
        <Box className={classes.container}>

            <div className={classes.textBorderContainer}>
                <div className = {classes.row_1}>
                    <div>Level #00</div>
                    <Box sx={{ flexGrow: 1 }} />
                    <div>Joined 1.23.2022</div>
                </div>

                { !editable 
                    ?
                    <div className = {classes.row_2}>
                        {nameValue}
                    </div>                
                    :
                    <div className={classes.row_2}>
                        <AppTextField
                            standard
                            autoFocus
                            hiddenLabel
                            defaultValue={defaultName}
                            value = {nameValue}
                            onChange={didChangeName}                            
                            className={classes.row_2}                            
                            inputProps={{style: inputPropsName}}
                            id="filled-hidden-label-name"                            
                        />
                    </div>
                }

                <div className = {classes.row_3}>
                    <div>Wrapped:</div>
                    <Box sx={{ flexGrow: 1 }} />
                    <div> 23 </div>
                </div>     

                <div className = {classes.row_3}>
                    <div> Descendents </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <div> 1,234,532 </div>
                </div>     

                <div className = {classes.row_3}>
                    <div>Max Depth:</div>
                    <Box sx={{ flexGrow: 1 }} />
                    <div> 34 </div>
                </div>     

                <div className={classes.row_4}>
                    <div className={classes.row_4_left}>
                        <div className={classes.row_4_lft_1}> AMOUNT STAKED </div>
                        <div className={classes.row_4_lft_2}> 12.4 LMO </div>
                    </div>  

                    <Box sx={{ flexGrow: 1 }} />

                    { !editable 
                        ?
                        <div className={classes.row_4_right}>
                            {bioValue}
                        </div>
                        :
                        <div className={classes.row_4_right}>
                            <AppTextField
                                standard
                                hiddenLabel
                                multiline
                                rows={3}
                                defaultValue={defaultAbout}
                                value = {bioValue}
                                onChange={didChangeBio}
                                className={classes.row_4_right}                            
                                inputProps={{style: inputPropsAbout}}
                                id="filled-hidden-label-about"                                
                            />
                        </div>
                    }

                </div>

                    
                    { showAvatar || !editable ? 

                        <Stack direction="row" className = {classes.row_5}>
                            <div className={classes.row_5_center}>
                                <UserProfileAvatar 
                                    {...props} 
                                    editable={editable}
                                    imgSrc={profileAvatar}
                                    showOpeanSea={showOpeanSea}                                    
                                    notConnected = {!connectedToMetamask}
                                    submit = {goConnectToMetamask}
                                />

                                { !editable || showOpeanSea ? <></> :
                                    <div className={classes.row_5_btn}>
                                        <ButtonTabD 
                                            {...props}
                                            btnLabel={'Change'} 
                                            onTapSubmitBtn = {setShowOpenSea}
                                        /> 
                                    </div>
                                }
                            </div>
                        </Stack>    

                        :
                        <div className = {classes.row_5_alt}>

                            <Stack direction="row" alignItems="center">

                                <Button 
                                    variant="outlined" 
                                    color="error" 
                                    sx={ { borderRadius: `30px` } }
                                    onClick = {onTapChangeAvatar}
                                    className={classes.change_avatar_btn}
                                >   
                                    <div className={classes.change_avatar_btn_font}>
                                        Change Avatar
                                    </div>
                                </Button>           


                            </Stack>


                        </div>                             
                    }


                {/* progress bar*/}
                { showProgress ? <LinearProgress color="error" /> : <></> }

                {/* auth certificate */}
                <FooterInstruction {...props}/>

                {/* error messge toast*/}
                <AppSnackbar
                    {...props}
                    vertical={"bottom"}
                    horizontal={"middle"}
                />                
            </div>          
        </Box>
    )

}


/******************************************************
    @view: accessory
******************************************************/


/**
 *
 * @use: user profile image
 *
 **/
function UserProfileAvatar(props){

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile, false)() 
    const { showOpeanSea, editable } = props;

    return (
        <Box className={classes.boxContainer}>

            {/* submit your own token */}
            <div className={classes.boxInner}>
                <Fade in={showOpeanSea && editable} timeout={600} unmountOnExit>
                    <div>
                        <SubmitTokenInput {...props} />
                    </div>
                </Fade>
            </div>   

            {/* main display  */}
            <div className={classes.boxInner}>
                <Fade in={!showOpeanSea || !editable} timeout={600} unmountOnExit>
                    <div>
                        <CubeTableWithImage {...props} hideBlackBackground={false}/>
                    </div>
                </Fade>
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
    const classes = useStyles(isOnMobile,props.editable)();    

    return (
        <Stack className={classes.row_6} >


                <Stack direction="row" className={classes.row_bot_header}>
                    <div>
                        CERTIFICATE OF IDENTITY
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <img className={classes.icon} src={logo} alt="" />
                </Stack >

                <Stack direction="row" className={classes.row_bot_body}>

                    <div className={classes.row_bot_body_left}>
                        Eiusmod sit amet aliquip irure eu esse aliqua consequat sunt cupidatat. Enim laboris culpa dolor voluptate in ipsum nulla incididunt ullamco laborum.
                    </div>

                    <Box sx={{ flexGrow: 1 }} />

                    <div className={classes.row_bot_body_right}>    
                        <div style={{textAlign: 'right'}}>
                            PK: 0xd2590Aea87...a72045471 <br/><br/>
                            Member 3 of 1.2m
                        </div>
                    </div>

                </Stack>


        </Stack>

    )

}


/******************************************************
    @view: exported
******************************************************/


/**
 *
 * @Use: wrap around any children with scroll action
 *
 **/
export default function DialogProfile(props) {

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useDialogStyles(isOnMobile)();    
    const { open, handleClose, handleSave } = props

    return (
        <Dialog
            fullWidth                   
            maxWidth="md"  
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >

            <DialogContent className={classes.container}>
                <DialogProfileView {...props}/>
            </DialogContent>

            {/* footer */}
            <DialogActions className={classes.titleBar}>
                <Button onClick={handleClose} className={classes.footerText}>
                    <div className={classes.footerText} style={{filter:'brightness(0.7)'}}>
                        Close
                    </div>
                </Button>

                <Button onClick={handleSave} className={classes.footerText}>
                    <div className={classes.footerText}>
                        Save
                    </div>
                </Button>
            </DialogActions>
        </Dialog>

    );
}

export { FooterInstruction }

