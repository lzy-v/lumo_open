/**
 * @Package: CubeTableView
 * @Date   : Dec 26th, 2021
 * @Author : Xiao Ling   
 *
 *
*/


import React from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { getCube, getRandomInt } from './constants'
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import AppImageView from './AppImageView'
import { COLORS } from './constants'


/******************************************************
    @styles + constants
******************************************************/

// cube table params
const mobile_R = 70;
const desktop_R = 32;
const num_cubes = 50;
const cube_ratio = 2/3;


const useStyles = (isOnMobile, hideBlackBackground) =>  makeStyles((theme: Theme) => createStyles({

    cubeTable: {
        width  : isOnMobile ? `${mobile_R}vw` : `${desktop_R}vw`,
        height : isOnMobile ? `${mobile_R}vw` : `${desktop_R}vw`,
        display: 'grid',
        gridTemplateColumns: 'repeat(30, 1fr)',
        gridTemplateRows: 'repeat(30, 1fr)',
        justifyItems: 'center',
        alignItems: 'center',
    },

    cubeBlock: {
        width  :  isOnMobile ? `${mobile_R/num_cubes}vw` : `${desktop_R/num_cubes}vw`,
        height :  isOnMobile ? `${mobile_R/num_cubes}vw` : `${desktop_R/num_cubes}vw`,
        display: 'flex',
        justifyContent: 'center',        
        alignItems: 'center',
    },

    incompleteTrue: {
        height: isOnMobile ? `${mobile_R/num_cubes*cube_ratio*cube_ratio}vw` : `${desktop_R/num_cubes*cube_ratio}vw`,
        filter: 'brightness(0) invert(1)',
        position: 'absolute'
    },

    incompleteFalse: {
        height: isOnMobile ? `${mobile_R/num_cubes*cube_ratio}vw` : `${desktop_R/num_cubes*cube_ratio}vw`,
        filter: 'invert(15%) sepia(99%) saturate(6825%) hue-rotate(359deg) brightness(97%) contrast(111%)',
        position: 'absolute'
    },

    blurredCubes: {
        height: isOnMobile ? `${mobile_R/num_cubes*cube_ratio}vw` : `${desktop_R/num_cubes*cube_ratio}vw`,
        filter: `brightness(0.7) invert(0.25)  blur(${isOnMobile ? '3px' : '7px'})`,
    },


    cubeTableWithImageContainer : {
        width  : isOnMobile ? `${mobile_R}vw` : `${desktop_R}vw`,
        height : isOnMobile ? `${mobile_R}vw` : `${desktop_R}vw`,
        display: "flex",          
        justifyContent: 'center',        
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative'
    },


    blockOverlay: {
        width : isOnMobile ? `${mobile_R-4.2}vw` : `${desktop_R-4.2}vw`,
        height: isOnMobile ? `${mobile_R-4.2}vw` : `${desktop_R-4.2}vw`,
        position: 'absolute',
        background: hideBlackBackground !== undefined && hideBlackBackground !== null && hideBlackBackground ? COLORS.transparent : 'black',
        display: "flex",          
        justifyContent: 'center',        
        alignItems: 'center',
        flexDirection: 'column',        
    },


}));


function goSetRandomCubes(litThreshold){
    let randomArray = [];
    for (var i = 0; i < 900; i++) {
        randomArray.push({ number: getRandomInt(50) + 1, isLit: Math.random() < litThreshold });
    }
    return randomArray;
}    


function randomCubeArray() {
    return goSetRandomCubes(0.08)
}

const _RANDOM_CUBES_ = randomCubeArray();

/******************************************************
    @View base
******************************************************/


/**
 *
 * @Use: cube table with incomplete cubes
 *       laid out in rune format
 *
 **/
function CubeTableView(props){

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)() 
    const { isBlurred, cubes } = props;

    
    return (
        <div className={classes.cubeTable}>
            {
                cubes.map((elem, idx) => (
                    <div key={idx} className={classes.cubeBlock}>
                        <img
                            className={ isBlurred ? classes.blurredCubes : (elem.isLit ? classes.incompleteTrue : classes.incompleteFalse) }
                            src={getCube(elem.number)} 
                            alt={""}
                        />
                    </div>)
                )
            }
        </div>            
    )
}


/**
 *
 * @use: cube table with animation
 *
 **/
class CubeTable extends React.Component {

    state = {
        cubes: _RANDOM_CUBES_,
        timer: false,
    }

    // @Use: when parent tell child to `animateCubes`
    //       go animate cubes 
    async componentDidUpdate(prevProps) {
        const { animateCubes } = this.props;
        if ( prevProps.animateCubes && animateCubes === false ){            
            clearTimeout(this.state.timer)
        } else if (prevProps.animateCubes === false && animateCubes ) {
            this.loop()
        }
    }

    // @Use: loop and animate
    loop = () => {
        let cubes = goSetRandomCubes(0.15);
        this.setState({ cubes: cubes })
        let timer = setTimeout(() => {
            this.loop();
        },500)
        this.setState({
            timer: timer
        })
    }


    render(){
        return (
            <CubeTableView {...this.props} cubes={this.state.cubes} />
        )
    }
}

/******************************************************
    @View: derived
******************************************************/

/**
 *
 * @Use: blurred out cube to be used as 
 *       preload image
 *
 **/
export function CubeTableShadow(props){
    return (
        <CubeTable {...props} isBlurred={true}/>
    )
}



/**
 *
 * @Use: cube table w/ nft on top
 *
 *
 **/
export function CubeTableWithImage(props){

    const isOnMobile = useCheckMobileScreen(1000);
    const { imgSrc, hideBlackBackground } = props;
    const classes = useStyles(isOnMobile, hideBlackBackground)();

    return (
        <div className={classes.cubeTableWithImageContainer}>
            <CubeTable {...props}  />
            <div className={classes.blockOverlay}>
                <AppImageView 
                    showStatic
                    imgSrc={imgSrc} 
                    width={isOnMobile ? '50vw' : '20vw'}
                    height={isOnMobile ? '50vw' : '20vw'}
                />
            </div>
        </div>

    )
}


export default CubeTable;
export {
    mobile_R,
    desktop_R,
    randomCubeArray,
}

