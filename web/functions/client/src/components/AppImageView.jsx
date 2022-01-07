/**
 * @Package: AppImageView
 * @Date   : Dec 27th, 2021
 * @Author : Xiao Ling   
 * @Doc: https://stackoverflow.com/questions/43115246/how-to-detect-when-a-image-is-loaded-that-is-provided-via-props-and-change-sta
 *
*/


import React, {useState} from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import gif from './../assets/static2.gif';



const useStyles = (isOnMobile, width,height) =>  makeStyles((theme: Theme) => createStyles({

    container: {
        width: width,
        height: width,
        alignItems: 'center',
    },

    imgContainer : {
        width: width,
    }

}));




/**
 *
 * @use: AppImageView that shows the image
 *       when its loaded, otherwise it shows 
 *       a preview
 *
 **/
export default function AppImageView(props){

    const isOnMobile = useCheckMobileScreen(1000);

    const { imgSrc, width, height, showStatic, style, imageDidLoad } = props;
    const classes = useStyles(isOnMobile, width, height)() 

    const [ loaded, setLoaded  ] = useState(false);

    function onImageLoad(){
        if (typeof imageDidLoad === 'function'){
            imageDidLoad();
        }
        setLoaded(true);        
    }

    return (
        <div className={classes.container} style={style ?? {}}>
            { loaded || !showStatic ? <div/> :
                <img className={classes.imgContainer} src={gif} alt=""/>
            }
            <img
                alt={""}
                src={imgSrc}
                className={classes.imgContainer}
                onLoad={onImageLoad}
                style = {loaded ? {} : {display: 'none'}}
            />  
        </div>
    )

}



















