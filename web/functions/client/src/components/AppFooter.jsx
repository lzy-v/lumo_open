/**
 * @Package: Footer
 * @Date   : Dec 22nd, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *   - chat style: https://codesandbox.io/s/material-ui-chat-drh4l?file=/src/App.js
 *   - chat full: https://github.com/Wolox/react-chat-widget
 *   - the console used: https://github.com/linuswillner/react-console-emulator
 *   - other console: https://github.com/webscopeio/react-console
 *   - mui lib: https://mui.com/components/text-fields/
 *
*/


import React, {useState} from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Stack from '@mui/material/Stack';


import { COLORS, getCube } from './constants'
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import { randomCubeArray } from './CubeTable';


/******************************************************
    @styles
******************************************************/


const useStyles = (isOnMobile, num_cubes) => makeStyles((theme: Theme) => createStyles({

    footer : {
        position: 'absolute',
        bottom: '0px',
        width: '96vw',
        height: '90px',
        borderTop  : `0.8px solid ${COLORS.translucent}`,
        display: "flex",          
        justifyContent: 'center',

    },

    cubeTable: {
        width: '96vw',
        height: '50px',
        justifyItems: 'center',
        alignItems  : 'center',
        paddingTop  : theme.spacing(1.5),
        marginBottom: theme.spacing(2),
        // background: 'blue',
    },

    cubeRow : {
        width: '96vw',        
        marginTop: theme.spacing(0.4),
    },

    cubeBlock: {
        width : '20px',
        display: 'flex',
        alignItems  : 'center',
        justifyItems: 'center',
        justifyContent: 'center',
    },

    cubeStyle: {
        height: '8px',
        display: 'flex',
        alignItems  : 'center',
        justifyItems: 'center',
        filter:  'brightness(0) invert(15%)',
    },

}));


/******************************************************
    @View: cube table
******************************************************/


const RAND_A = randomCubeArray(150);
const RAND_B = randomCubeArray(150);

/**
 *
 * @Use: rows of cubes
 *
 **/
function CubeRows(props){

    const [width] = useState(window.innerWidth);
    const isOnMobile = useCheckMobileScreen(1000);

    const classes = useStyles(isOnMobile, 0)();    
    const num = width < 700 ? 50 : 90;

    const RowCube = (props) => {

        function pickCube(xs,  idx){
            if (idx < xs.length){
                return xs[idx].number
            } else {
                return xs[3].number
            }
        }

        return (
            <Stack direction={'row'} className={classes.cubeRow}>
                {Array(num).fill().map((_,idx) => (
                    <div key={idx} className={classes.cubeBlock}>
                        <img
                            className={ classes.cubeStyle }
                            src={getCube(pickCube(props.xs, idx))} 
                            alt={""}
                        />                
                    </div>
                ))
                }
            </Stack>
        )
    }

    return (
        <Stack direction={'column'} spacing={0} className={classes.cubeTable}>
            <RowCube {...props} xs={RAND_A}/>
            <RowCube {...props} xs={RAND_B}/>
        </Stack>

    )

}


/******************************************************
    @View: exported
******************************************************/


/**
 *
 * @Use: app footer
 *
 *
 **/
export default function AppFooter(props) {

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    

    return (
      <div className={classes.footer}> 
        <div style={{display:'flex', justifyContent: 'center', alignItems:'center'}}>
            <CubeRows {...props}/>
        </div>
      </div>    

    )
}