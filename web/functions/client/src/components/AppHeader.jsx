/**
 * @Package: Header
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


import React, {Component, useState, useEffect} from 'react'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from "@material-ui/core/Avatar";


import { COLORS } from './constants'
import lumoname_logo from './../assets/lumonamewhite-small.png'
import lumologo from './../assets/lumologo_white-small.png';
import lumored from './../assets/lumored.jpeg';
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import DialogInstruction from './DialogInstruction';
import DialogCreditCard from './DialogCreditCard';
import DialogSubmission from './DialogSubmission';
import withRouter from './../hoc/withRouter';
import withAuth from './../hoc/withAuth';


/******************************************************
    @styles
******************************************************/


const useStyles = (isOnMobile) => makeStyles((theme: Theme) => createStyles({

    logo: {
        maxWidth: 160,
        minWidth: 100,
        filter: COLORS.offwhite_filter,
        cursor: 'pointer',              
    },

    logoDiagram: {
        height: '50px',
        opacity: 0.9,
        paddingBottom: theme.spacing(1),
        filter: COLORS.offwhite_filter,
        cursor: 'pointer',              
    },
   
    logoContainer: {
      display: 'grid',
    },

    logoContainerInner: {
        gridArea: '1 / 1',
    },

    header: {
        paddingLeft  : theme.spacing(3),
        paddingRight : theme.spacing(3),
        paddingTop   : theme.spacing(3),
        background   : COLORS.offBlack,
        maxHeight: isOnMobile ? '80px' : '100px',
    },

    headerLine: {
        borderBottom: `0.8px solid ${COLORS.translucent}`,
        marginLeft:theme.spacing(2),
        marginRight:theme.spacing(2),
    },

    statsText : {
        color: 'white',
        fontFamily: 'NeueMachina-Light',        
        fontSize: '15px',
        filter: COLORS.offwhite_filter,        
        paddingTop: theme.spacing(2),
    },

}));

const header_grad = {
    background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0,0,0,0.5))'    
}




/******************************************************
    @View components
******************************************************/

/**
 *
 * @Use:logo for lumo, either text or logo png
 *
 **/
 function LumoLogo(props){

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    
    const { onClickLogo } = props;

    return (
        <div className={classes.logoContainer}>

            <div className={classes.logoContainerInner} onClick={onClickLogo}>
                <div className={classes.logoContainer} style={{paddingTop: '10px', opacity: isOnMobile ? 1 : 0}}> 
                    <div className={classes.logoContainerInner}>
                        <img src={lumologo} alt="..." className={classes.logoDiagram} style={{filter:'blur(8px)'}}/>
                    </div>
                    <div className={classes.logoContainerInner}>
                        <img src={lumologo} alt="..." className={classes.logoDiagram}/>
                    </div>
                </div>
            </div>

            <div className={classes.logoContainerInner} onClick={onClickLogo}>

                <div className={classes.logoContainer} style={{paddingTop: '15px', opacity: isOnMobile ? 0 : 1}}> 
                    <div className={classes.logoContainerInner}>
                        <img src={lumoname_logo} alt="..." className={classes.logo} style={{filter:'blur(8px)'}}/>
                    </div>
                    <div className={classes.logoContainerInner}>
                        <img src={lumoname_logo} alt="..." className={classes.logo}/>
                    </div>
                </div>            

            </div>
        </div>

    )
}




/**
 *
 * @Use: stats text
 *
 **/
function StatText(props){

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();

    const TextView = props => {
        return (
            <div className={classes.statsText} style={props.blur_style ?? {}}> {props.value} </div>
        )
    }

    return (
        <div className={classes.logoContainer}>
            <div className={classes.logoContainerInner}>
                <TextView {...props} blur_style={{filter:'blur(5px)'}}/>                
            </div>
            <div className={classes.logoContainerInner}>
                <TextView {...props} blur_style={{}}/>
            </div>
        </div>        
    )
}




/******************************************************
    @View base
******************************************************/


/**
 *
 * @Use: app header
 * @Doc: https://mui.com/components/app-bar/ 
 *
 */
function AppHeaderView(props) {

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();
    const { 
        handleOnClickAvatar,
        handleOnClickRight,
        handleOnClickMiddle,
    } = props;

    const menuId = 'primary-search-account-menu';
    const photoURL = lumored;

    // header backgroudn to gradient
    const [style, setStyle] = useState({ background: COLORS.offBlack })
    const [showUnderline, setUnderline] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setStyle(header_grad)
            setUnderline(true)
        }, 2000);
    }, []); 

    return (
        <AppBar 
            position="static"
            elevation={0}  
            position="static" 
            color="transparent"
            className={classes.header}
            style={ style }
        >
            <Toolbar>

                <LumoLogo {...props}/>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <StatText {...props} value={'23 _'} />
                    </IconButton>

                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={handleOnClickMiddle}
                    >
                        <StatText {...props} value={'4 _'} />
                    </IconButton>

                    <IconButton
                        size="large"
                        aria-label=""
                        color="inherit"
                        onClick={handleOnClickRight}                            
                    >
                        <StatText {...props} value={'23k _'} />
                    </IconButton>

                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleOnClickAvatar}
                        color="inherit"
                    >
                        <Avatar alt={''} src={photoURL}/>
                    </IconButton>
                </Box>                    
            </Toolbar>  
            <div className={classes.headerLine} style={{opacity: showUnderline ? 1 :0}}/>
        </AppBar>
    );
}


/******************************************************
    @View with internal state
******************************************************/ 


/**
 *
 * @use: app header with built in nav 
 *       modal popup, and auth awareness
 *
 **/
class AppHeaderBase extends Component {

    state = {
        showInstructionDialog: false,
        openCreditDialog: false,
        showSubmissionDialog: false,
    }


    handleOnClickAvatar = () => {
        this.setState({
            showInstructionDialog: true
        })
    }

    handleOnClickMiddle = () => {
        this.setState({
            showSubmissionDialog: true
        })
    }

    closeInstructionDialog = () => {
        this.setState({
            showInstructionDialog: false
        })
    }

    closeCreditDialog = () => {
        this.setState({
            openCreditDialog: false
        })
    }

    handleOnClickRight = () => {
        this.setState({ 
            openCreditDialog: true
        })
    }

    closeSubDialog = () => {
        this.setState({
            showSubmissionDialog: false
        })
    }

    render(){
        return (
            <div>
                <AppHeaderView 
                    {...this.props} 
                    handleOnClickRight ={this.handleOnClickRight}
                    handleOnClickAvatar={this.handleOnClickAvatar}
                    handleOnClickMiddle={this.handleOnClickMiddle}
                />
                <DialogInstruction 
                    {...this.props}
                    open={this.state.showInstructionDialog}
                    handleClose={this.closeInstructionDialog}
                />
                <DialogCreditCard
                    {...this.props}
                    open={this.state.openCreditDialog}
                    handleClose={this.closeCreditDialog}
                />
                <DialogSubmission
                    {...this.props}
                    open={this.state.showSubmissionDialog}
                    handleClose={this.closeSubDialog}
                />                
            </div>
        )
    }
}


const AppHeader = withRouter(withAuth(AppHeaderBase))


/******************************************************
    @export
******************************************************/ 


export { LumoLogo, AppHeader }



