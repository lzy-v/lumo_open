/**
 * @Package: UserListView.jsx
 * @Date   : Dec 28th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *
*/


import React from "react";
import { Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from '@mui/material/Box';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { COLORS, lorem, punk } from './constants';


/******************************************************
    @style
******************************************************/

let img_ht_num = 48
let row_1 = img_ht_num * 0.05
let row_2 = img_ht_num * 0.35
let row_3 = img_ht_num * 0.08
let row_4 = img_ht_num * 0.30

const useStyles = makeStyles((theme: Theme) => createStyles({

    paper: {
        // width: "80vw",
        height: "75vh",
        maxWidth: "700px",
        maxHeight: "700px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        backgroundColor: COLORS.transparent, 
        // backgroundColor: 'red',
    },

    container: {
        minHeight: '300px',
        maxWidth: '100%', 
        maxHeight: '100%', 
        borderRadius: '5px',
        overflow: 'auto',
        cursor: 'text',
        backgroundSize: 'cover'      ,
        backgroundColor:'rgba(0,0,0,0.0)',
    },

    messagesBody: {
        width: "calc( 100% - 20px )",
        margin: 10,
        overflowY: "scroll",
        height: "calc( 100% - 80px )",
        backgroundColor: COLORS.transparent,
    },


    row_1: {
        // height: `${row_1}vh`,
        fontFamily: 'NeueMachina-Medium',
        fontSize: `${row_1*0.7}vh`,
        textAlign: 'left',
        margin: 'auto',        
        display: 'flex',
        flex: 1,        
        filter: `brightness(0.75)`,
        borderBottom  : `2px solid ${COLORS.white}`,        
        paddingRight: theme.spacing(3),
        color: 'white',        
    },

    row_2: {

        // height: `${row_2}vh`,
        fontSize: `${row_2*0.6}vh`,
        fontFamily: 'NeueMachina-Black',
        filter: `brightness(1.0)`,
        textAlign: 'left',        
        margin: 'auto',
        // borderBottom  : `2px solid ${COLORS.translucent}`,        
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(1),
        color: 'white',                
    },

    row_3: {
        // height: `${row_3}vh`,
        fontSize: `${row_3*0.5}vh`,
        fontFamily: 'NeueMachina-Regular',
        filter: `brightness(0.75)`,
        textAlign: 'left',        
        margin: 'auto',
        // borderBottom  : `2px solid ${COLORS.translucent}`,        
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        display: 'flex',
        color: 'white',                
        flex: 1,
    },    


    row_4 : {
        // height: `${row_4}vh`,
        display: 'flex',
        flex: 1,
        // borderTop: `2px solid ${COLORS.translucent}`,
        borderBottom: `2px solid ${COLORS.translucent}`,
        paddingTop: theme.spacing(4),
        color: 'white',                        
    },

    row_4_left: {
        height: `${row_4}vh`,
        width : `${img_ht_num*0.3}vh`,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',              
        fontFamily: 'NeueMachina-Light',    
        fontSize: `${row_4*0.07}vw`              
    },    

    row_4_right: {
        height: `${row_4}vh`,
        width : `${img_ht_num}vh`,
        fontFamily: 'NeueMachina-Light',
        fontSize: `${row_4*0.07}vw`,                      
        filter: 'brightness(0.75)',
        textAlign: 'left',        
        color: 'white',                        
    },    

    row_k : {
        fontSize: `${row_3*0.5}vh`,
        fontFamily: 'NeueMachina-Regular',
        alignItems: "center",
        paddingTop: theme.spacing(3),
        display: 'flex',
        color: 'white',                
        flex: 1,
    },

    fromAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },    
}));


/******************************************************
    @views
******************************************************/




/**
 *
 * @Use: render different row
 *
 *
 **/
function RowItem(props){

    const classes = useStyles();

    const { rowKind } = props;

    switch (rowKind){
        case 0:
            return (
                <div className = {classes.row_1}>
                    <div>Level #010101110</div>
                    <Box sx={{ flexGrow: 1 }} />
                    <div>Minted 1.12.2022</div>
                </div>
            )
        case 1:
            return (
                <div className = {classes.row_2}>
                   KISSA
                </div>                       
            )

        case 2:
            return (
                <div className = {classes.row_3}>
                    <div>Ancestor</div>
                    <Box sx={{ flexGrow: 1 }} />
                    <div> Zuri </div>
                </div>     
            )

        case 3:
            return (
                <div className = {classes.row_3}>
                    <div> Descendents </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <div> 2,189 </div>
                </div>                 
            )

        case 4:
            return (
                <div className = {classes.row_3}>
                    <div>Depth:</div>
                    <Box sx={{ flexGrow: 1 }} />
                    <div> 9 </div>
                </div>     
            )

        case 5:
            return (
                <div className={classes.row_4}>
                    <div className={classes.row_4_left}>
                        <div className={classes.row_4_lft_1}> AMOUNT STAKED </div>
                        <div className={classes.row_4_lft_2}> 12.4 LMO </div>
                    </div>  

                    <Box sx={{ flexGrow: 1 }} />

                    <div className={classes.row_4_right}>
                        {lorem.generateSentences(3)}
                    </div>
                </div>                
            )

        default:
            return (

                <div className = {classes.row_k}>
                    <div style={{paddingRight:'20px' }}>
                        <Avatar 
                            alt={'displayName'} 
                            className={classes.fromAvatar} 
                            src={punk}
                        />
                    </div>
                    <div>{lorem.generateWords(1)}</div>
                    <Box sx={{ flexGrow: 1 }} />
                    <div> {getRandomArbitrary(1.2,19.5)} LUMO </div>
                </div>     
                              
            )


    }
}

function getRandomArbitrary(min, max) {
    return Math.round((Math.random() * (max - min) + min),4);
}


/**
 *
 * @Use: render chat window
 * @Doc: https://github.com/mattmezza/react-beautiful-chat/blob/master/src/components/MessageList.js
 *       https://codesandbox.io/s/material-ui-chat-drh4l?file=/src/TextInput.js
 * 
 */
    /**
        @TODO: you have to differentially apply blur so that it's more blurred out on top
    */
 
export default function UserListView(props) {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Paper elevation={0} className={classes.paper} zDepth={2}>
                <Paper elevation={0} className={classes.messagesBody}>


                    {[0,1,2,3,4,5,6,7,8,9,10,11].map((k) => {
                        return (
                            <RowItem {...props} rowKind={k}/>
                        )
                    })}
                </Paper>
            </Paper>
        </div>
    );
}










