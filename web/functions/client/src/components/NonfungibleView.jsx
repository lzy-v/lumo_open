/**
 *
 * @Package: NonfungibleView
 * @Date   : Dec 26th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *   - transform perspective: https://armandocanals.com/posts/CSS-transform-rotating-a-3D-object-perspective-based-on-mouse-position.html
 *   - get mouse pose: https://codedaily.io/tutorials/Create-a-useMousePosition-Hook-with-useEffect-and-useState-in-React
 *   - lazy load: https://www.npmjs.com/package/react-lazy-load-image-component
 *
*/


import React, {useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import AppImageView from './AppImageView'
import StakerTable from './StakerTable'
import { COLORS } from './constants';

/******************************************************
    @style
******************************************************/


let img_ht_num = 52
const container_ht = `${img_ht_num+2}vh`
const img_ht = `${img_ht_num}vh`
let row_1 = img_ht_num * 0.05
let row_2 = img_ht_num * 0.25
let row_3 = img_ht_num * 0.08
let row_4 = img_ht_num * 0.40



const useStyles = (isOnMobile) => makeStyles((theme: Theme) => createStyles({

    container: {
        height: `calc(100vh - 230px)`,
        width: `calc(100vh-230px)`,
        display: "flex",          
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',                
        // border: `2.0px solid ${COLORS.translucent}`,        
    },

    boxOuter : {
        height: container_ht,
        width: `calc(100vh-230px)`,
        display: 'grid',
    },  

    boxInner: {
        gridArea:  '1 / 1',
    },


    // text container

    textContainer : {
        color: 'white',
        height: `${img_ht_num-1}vh`,
        width : img_ht,
        display: 'flex',
        marginTop: '-20px',
    },

    textBorderContainer : {
        width: '100%',
        height: '100%',
        padding: theme.spacing(2),
        borderRadius: '1px 60px 1px 60px',
        border: `0.8px solid ${COLORS.translucent}`,
        background: 'black',
    },

    row_1: {
        height: `${row_1}vh`,
        fontFamily: 'NeueMachina-Medium',
        fontSize: `${row_1*0.7}vh`,
        textAlign: 'left',
        filter: `brightness(0.75)`,
        borderBottom  : `2px solid ${COLORS.translucent}`,        
        paddingRight: theme.spacing(3),
    },

    row_2: {

        height: `${row_2}vh`,
        fontSize: `${row_2*0.5}vh`,
        fontFamily: 'NeueMachina-Black',
        filter: `brightness(1.0)`,
        textAlign: 'left',        
        margin: 'auto',
        borderBottom  : `2px solid ${COLORS.translucent}`,        
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(1),
        overflowWrap: 'anywhere',
    },

    row_3: {
        height: `${row_3}vh`,
        fontSize: `${row_3*0.6}vh`,
        fontFamily: 'NeueMachina-Medium',
        filter: `brightness(0.75)`,
        textAlign: 'left',        
        margin: 'auto',
        borderBottom  : `2px solid ${COLORS.translucent}`,        
        paddingTop: theme.spacing(3),
        display: 'flex',
        flex: 1,
    },    

    row_4 : {
        height: `${row_4}vh`,
        paddingTop: theme.spacing(2),
        display: 'flex',
        flex: 1,
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
        width : `${img_ht_num*0.5}vh`,
    },    

    mintButton :{
        height: '50px',
        width : isOnMobile ? '60vw' : `${img_ht_num}vh`,
    },    


}));


const img_style = {
    borderRadius: '1px',
    // border: `0.8px solid ${COLORS.translucent}`,        
}

const preview_blur_on = {
    width: img_ht,
    height: img_ht,
    filter: 'blur(8px)',
    borderRadius: '20px',
    background: COLORS.transparentDark3,
    zIndex: '-1'
}


/******************************************************
    @view: back
******************************************************/

/**
 *
 * @use: card back text layout
 *
 **/
function CardText(props){

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    
    const { project_name, mint_date, creator_name } = props;

    return (
        <Box className={classes.textContainer}>
            <div className={classes.textBorderContainer}>
                <div className = {classes.row_1}>
                    PROJECT NAME: 
                </div>

                <div className = {classes.row_2}>
                    {project_name}
                </div>                

                <div className = {classes.row_3}>
                    <div>MINTED:</div>
                    <Box sx={{ flexGrow: 1 }} />
                    <div> {mint_date} </div>
                </div>     

                <div className = {classes.row_4}>

                    <div className={classes.row_4_left}>

                        <div className={classes.row_4_lft_1}> AMOUNT STAKED </div>
                        <div className={classes.row_4_lft_2}> 12.4 LMO </div>

                        <Box sx={{ flexGrow: 1 }} />

                        <div className={classes.row_4_lft_1}> Creator </div>
                        <div className={classes.row_4_lft_3}> {creator_name} </div>

                    </div>

                    <Box sx={{ flexGrow: 1 }} />
                    
                    <div className={classes.row_4_right}> 

                        <div className={classes.row_4_lft_1}> STAKERS </div>

                        <div style={{paddingTop:'5px'}}>
                            <StakerTable  {...props} width={`${img_ht_num*0.5}vh`} height={`${row_4}vh`} />
                        </div>

                    </div>
                </div>     

            </div>
        </Box>
    )
}



/******************************************************
    @exported main view
******************************************************/

/**
 *
 * @use: main view to display nonfungible token
 *       it includes the image and the metada
 *
 **/
export default function NonfungibleView(props) {

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    

    const { image_url, did_show_back } = props;
    const [ showBack, setShowBack ] = useState(false)
    const [ imageLoaded, setImageLoaded ] = useState(false)

    function imageDidLoad(){
        setImageLoaded(true)
    }

    function onTapShowBack(){
        setShowBack(!showBack)
        if (typeof did_show_back === 'function'){
            did_show_back()
        }
    }


    return (
        <Box className={classes.container}>

            <div className={classes.boxOuter}>

                <div className={classes.boxInner}>
                    {  imageLoaded ? <div/> : <div style={preview_blur_on}/> }
                </div>

                <div className={classes.boxInner}>
                    { showBack ? <CardText {...props}/> :
                        <AppImageView 
                            imgSrc={image_url}
                            width={img_ht}
                            height={img_ht}
                            style={img_style}
                            imageDidLoad = {imageDidLoad}
                        />    
                    }
                </div>
            </div>

            <Button 
                variant="outlined" 
                color="error" 
                className={classes.mintButton} 
                sx={ { borderRadius: 30 } }
                onClick = {onTapShowBack}
            >
                <h4 style={{fontFamily: 'NeueMachina-Black'}}>
                    {showBack ? "LESS" : "MORE"}
                </h4>
            </Button>

        </Box>
    )
}



