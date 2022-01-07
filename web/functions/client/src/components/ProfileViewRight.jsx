/**
 *
 * @Package: ProfileViewRight
 * @Date   : Dec 27th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *
 *
**/


import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import { COLORS, lorem } from './constants';
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';


/******************************************************
    @style
******************************************************/

let img_ht_num = 48
let row_1 = img_ht_num * 0.05
let row_2 = img_ht_num * 0.35
let row_3 = img_ht_num * 0.08
let row_4 = img_ht_num * 0.30

const useStyles = (isOnMobile) => makeStyles((theme: Theme) => createStyles({

    // text container

    textContainer : {
        color: 'white',
        width: '100%',
        height: `calc(100vh - 300px)`,
        display: 'flex',
        paddingTop: theme.spacing(4),
        paddingRight: theme.spacing(2),
    },

    textBorderContainer : {
        width: '100%',
        height: '100%',
        padding: theme.spacing(2),
    },

    row_1: {
        height: `${row_1}vh`,
        fontFamily: 'NeueMachina-Medium',
        fontSize: `${row_1*0.7}vh`,
        textAlign: 'left',
        margin: 'auto',        
        display: 'flex',
        flex: 1,        
        filter: `brightness(0.75)`,
        borderBottom  : `2px solid ${COLORS.white}`,        
        paddingRight: theme.spacing(3),
    },

    row_2: {

        height: `${row_2}vh`,
        fontSize: `${row_2*0.6}vh`,
        fontFamily: 'NeueMachina-Black',
        filter: `brightness(1.0)`,
        textAlign: 'left',        
        margin: 'auto',
        // borderBottom  : `2px solid ${COLORS.translucent}`,        
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(1),
    },

    row_3: {
        height: `${row_3}vh`,
        fontSize: `${row_3*0.5}vh`,
        fontFamily: 'NeueMachina-Regular',
        filter: `brightness(0.75)`,
        textAlign: 'left',        
        margin: 'auto',
        // borderBottom  : `2px solid ${COLORS.translucent}`,        
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
        filter: `brightness(0.75)`,
        textAlign: 'left',        
    },

    row_4_lft_2: {
        paddingTop: theme.spacing(1.5),
        width : `${img_ht_num*0.3}vh`,        
        fontSize: `${row_3*0.7}vh`,
        fontFamily: 'NeueMachina-Medium',
        filter: `brightness(0.75)`,
        textAlign: 'left',        
    },

    row_4_lft_3: {
        width : `${img_ht_num*0.3}vh`,        
        fontSize: `${img_ht_num*0.25/10}vh`,
        fontFamily: 'NeueMachina-Ultralight',
        filter: `brightness(0.75)`,
        textAlign: 'left',        
        paddingTop: theme.spacing(0.5),
    },

    row_4_right: {
        height: `${row_4}vh`,
        width : `${img_ht_num}vh`,
        fontFamily: 'NeueMachina-Regular',
        fontSize: '13px',        
        filter: 'brightness(0.75)',
        textAlign: 'left',        
        lineHeight: 1.5,
        
    },    


}));




/******************************************************
    @view: right
******************************************************/

/**
 *
 * @use: card back text layout
 *
 **/
function ProfileViewRight(props){

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    

    return (
        <Box className={classes.textContainer}>
            <div className={classes.textBorderContainer}>
                <div className = {classes.row_1}>
                    <div>Level #00</div>
                    <Box sx={{ flexGrow: 1 }} />
                    <div>Joined 1.23.2022</div>
                </div>

                <div className = {classes.row_2}>
                    Mike Wazowski
                </div>                

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
                        {/*
                        <Box sx={{ flexGrow: 1 }} />
                        <div className={classes.row_4_lft_1}> Stake Leader </div>
                        <div className={classes.row_4_lft_3}> 0xfg7dg...b47D </div>
                        */}                        
                    </div>  

                    <Box sx={{ flexGrow: 1 }} />

                    <div className={classes.row_4_right}>
                        {lorem.generateSentences(5)}
                    </div>
                </div>
            </div>
        </Box>
    )
}





/******************************************************
    @views
******************************************************/


export default ProfileViewRight;






