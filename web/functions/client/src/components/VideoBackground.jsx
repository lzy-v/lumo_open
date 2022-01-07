/**
 * @Package: VideoBackground
 * @Date   : Dec 22nd, 2021
 * @Author : Xiao Ling   
 * @Doc: https://frontend-digest.com/responsive-and-progressive-video-loading-in-react-e8753315af51
 *       render from one img: https://codepen.io/anatravas/pen/vyOwOZ
 *       convert on console: https://medium.com/@patdugan/converting-a-mov-to-a-gif-6bb055e54230
 *
 *
*/


import React, {useState} from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { COLORS } from './constants'
import tattoo_vid from './../assets/tattoo_short.mov';
// import gif from './../assets/animation.gif';

/******************************************************
    @styles
******************************************************/

const EASE = 800

const useStyles = makeStyles((theme: Theme) => createStyles({
    /**
     * 
     * @Use: full screen video
     * @Doc:  https://css-tricks.com/full-page-background-video-styles/
     *        https://stackoverflow.com/questions/36230522/adding-a-background-video-with-react/36230644
     *        https://frontend-digest.com/responsive-and-progressive-video-loading-in-react-e8753315af51
     * 
    **/
    bg_video: {
      objectFit: `cover`,
      width : `100vw`,
      height: `100vh`,
      position: `fixed`,
      top: `0`,
      left: `0`,
      zIndex:  `-100`,
      opacity: `1.0`,
      background: COLORS.offBlack,
      transition: `opacity ${EASE}ms ease 0ms`,
    },

    overLayContainer: {
        display: 'grid',
    },

    overLayContainerInner: {
        gridArea: '1 / 1',
    },      

    black : {
        width : `100vw`,
        height: `100vh`,
        position: `fixed`,
        top: `0`,
        left: `0`,
        background: COLORS.offBlack,
        transition: `opacity 0ms ease ${EASE}ms`,
    }, 

}));


/******************************************************
    @View
******************************************************/


export function VideoBackgroundViewSimple(props){

    const classes = useStyles();    

    return (
        <video className={classes.bg_video} autoPlay loop muted>
            <source src={tattoo_vid} type='video/mp4'/>
        </video>               
    )
} 

/**
 *
 * @Use: video background view where video appears after n seconds
 *
 **/
export default function VideoBackgroundStateView(props){

    const classes = useStyles();    
    const [ showVideo, setVideo ] = useState(false)
    const { delay } = props

    function showStatic(){
        setTimeout(() => {
            setVideo(true)
        }, delay)        
    }

    return (
        <div>
            <div className={classes.overLayContainer}>
                <div className={classes.overLayContainerInner}>
                    <video
                        autoPlay
                        loop
                        muted
                        src={tattoo_vid}
                        className={classes.bg_video}
                        onLoadedData={showStatic}
                        style={{ opacity: showVideo ? 1.0 : 0.0 }}
                    />
                </div>
                <div className={classes.overLayContainerInner}>
                    <div className={classes.black} style={{opacity: showVideo ? 0.0 : 1.0 }} />
                </div>                
            </div>
        </div>
    )
}


