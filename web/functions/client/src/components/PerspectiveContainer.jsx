/**
 * @Package: Perspective container
 * @Date   : Dec 25th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *   - transform perspective: https://armandocanals.com/posts/CSS-transform-rotating-a-3D-object-perspective-based-on-mouse-position.html
 *   - get mouse pose: https://codedaily.io/tutorials/Create-a-useMousePosition-Hook-with-useEffect-and-useState-in-React
 *
 *
*/


import React, {Component, useState, useEffect, useRef} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from '@mui/material/Box';


import { COLORS } from './constants';
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';

/******************************************************
    @style
******************************************************/


const useStyles = (isOnMobile) => makeStyles((theme: Theme) => createStyles({

    container: {
        height: `calc(100vh - 230px)`,
        width: `calc(100vh-230px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // background: 'red',
        // border: `3.0px solid ${COLORS.translucent}`,
    },

    box : {
        height: '48vh',
        width: '48vh',
        background: COLORS.translucent, // 'red',
        borderRadius: '30px',
        textAlign: 'center',
        alignItems: 'center',
        
        // all perspective logic
        transform: `perspective(48vh) rotateX(2deg) rotateY(3deg)`

    }

}));

/******************************************************
    @mouse pose 
******************************************************/

/**
 *
 * @Use: use mouse pose
 * @Doc: https://codedaily.io/tutorials/Create-a-useMousePosition-Hook-with-useEffect-and-useState-in-React
 *
 **/
const useMousePosition = () => {

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", setFromEvent);

        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    }, []);

    return position;
};

function transforms(x, y, el) {

    let constrain = 20;
    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height / 2)) / constrain;
    let calcY = (x - box.x - (box.width / 2)) / constrain;

    return "perspective(100px) "
    + "   rotateX("+ calcX +"deg) "
    + "   rotateY("+ calcY +"deg) ";
};

// @use: compute transformation:
function goTransform({ pose, ref }){

    let box = ref.current //.getBoundingClientRect();
    // console.log('>>', pose.x, pose.y, ref)

    return { x: pose.x, y: pose.y, box: box }
}

/**

let constrain = 20;
let mouseOverContainer = document.getElementById("ex1");
let ex1Layer = document.getElementById("ex1-layer");

function transforms(x, y, el) {
    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height / 2)) / constrain;
    let calcY = (x - box.x - (box.width / 2)) / constrain;

    return "perspective(100px) "
    + "   rotateX("+ calcX +"deg) "
    + "   rotateY("+ calcY +"deg) ";
};

function transformElement(el, xyEl) {
    el.style.transform  = transforms.apply(null, xyEl);
}

mouseOverContainer.onmousemove = function(e) {
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([ex1Layer]);

    window.requestAnimationFrame(function(){
    transformElement(ex1Layer, position);
    });
};

*/


/******************************************************
    @views
******************************************************/

/**
 *
 * @Use: perspective container
 *       this div tracks mouse pose and change 
 *       perspective
 * 
 */ 
export default function PerspectiveContainer(props) {

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    

    // persepctive shift
    const pose = useMousePosition();
    const inputRef = useRef();
    // const transform = goTransform({ pose: pose, ref: inputRef })

    return (
        <Box className={classes.container}>
            <Box ref={inputRef} className={classes.box}>
                <h4 style={{color:'white'}}> { pose.x }, {pose.y } </h4>
            </Box>
        </Box>
    )

}














