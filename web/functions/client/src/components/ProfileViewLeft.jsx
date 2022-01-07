/**
 *
 * @Package: ProfileView
 * @Date   : Dec 27th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *
 *
**/


import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import cube1 from './../assets/1.jpg';
import cube2 from './../assets/2.jpg';
import cube3 from './../assets/3.jpg';
import cube4 from './../assets/4.jpg';
import cube5 from './../assets/5.jpg';
import cube6 from './../assets/6.jpg';

import {CubeTableShadow, CubeTableWithImage} from './CubeTable';
import CreditCardInput, { SubmitTokenInput } from './CreditCardInput';
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import { WrapTokenViewBase } from './WrapTokenView';
import { ButtonTabB } from './ButtonViews';
import {  getRandomArbitrary  } from './constants'


/******************************************************
    @style
******************************************************/

const mobile_R = 70;
const desktop_R = 32;


const useStyles = (isOnMobile) => makeStyles((theme: Theme) => createStyles({

    container : {
        height: 'calc(100vh - 200px)', 
        display: "flex",          
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    cubeTablePadding : {
        paddingTop: theme.spacing(3),
    },


    box : {
        width: isOnMobile ? `${mobile_R}vw` : `${desktop_R}vw`,
        textAlign: 'center',
        alignItems: 'center',
        display: 'grid'
    },

    boxInner: {
        gridArea: '1 / 1',
    },


    padding_top :{
        paddingTop: theme.spacing(3),
        paddingBottom: isOnMobile ?  theme.spacing(0.1) : theme.spacing(1) 
    },

}));


/******************************************************
    @view: left
******************************************************/


/**
 *
 * @Use: display a table of incomplete cubes
 * @Ref:
 *
 *
 **/
function LeftViewBase(props) {

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)() 

    const { showInputContractForm, showCreditCardForm, onConfirmCreditCard } = props;

    return (
        <div className={classes.container}>

            <div className={classes.cubeTablePadding}>

                <Box className={classes.box}>

                    {/* submit your own token */}
                    <div className={classes.boxInner}>
                        <Fade in={showInputContractForm} timeout={600} unmountOnExit>
                            <div>
                                <SubmitTokenInput notConnected={false} {...props} />
                            </div>
                        </Fade>
                    </div>

                    {/* credit card */}
                    <div className={classes.boxInner}>
                        <Fade in={showCreditCardForm} timeout={600} unmountOnExit>
                            <div>
                                <CreditCardInput {...props} onConfirm={onConfirmCreditCard} />
                            </div>
                        </Fade>
                    </div>               

                    {/* main display  */}
                    <div className={classes.boxInner}>
                        <Fade in={!showInputContractForm && !showCreditCardForm} timeout={600} unmountOnExit>
                            <div>
                                <CubeTableWithImage {...props}/>
                            </div>
                        </Fade>
                    </div>
                </Box>
            </div>

            <Fade in={!showCreditCardForm} timeout={600} unmountOnExit>
                <div className={classes.padding_top}>               
                    <ButtonTabB {...props}/>
                </div>
            </Fade>

        </div>
    )
}



/**
 *
 * @Use: option of showing preload view, submitted tok view, or warp tok view
 *
 **/
function ProfileViewLeftBase(props) {

    const isOnMobile = useCheckMobileScreen(1000);
    const classes = useStyles(isOnMobile)();    
    const { showSub, showWrapToken, onWrapNewTok, showInputContractForm } = props;

    return (
        <Box className={classes.container}>
            <Box className={classes.box}>
                <div className={classes.boxInner}>
                    <Fade in={!showSub && !showWrapToken} timeout={1600} unmountOnExit>
                        <div><CubeTableShadow {...props} /></div>
                    </Fade>
                </div>
                <div className={classes.boxInner}>
                    <Fade in={showSub && !showWrapToken} timeout={800} unmountOnExit>
                        <div>
                            <LeftViewBase {...props}/>
                        </div>
                    </Fade>
                </div>
                <div className={classes.boxInner}>
                    <Fade in={!showSub && showWrapToken} timeout={800} unmountOnExit>
                        <div>
                            <WrapTokenViewBase 
                                {...props}
                                onTapMintBtn={onWrapNewTok} 
                                showInputContractForm={showInputContractForm} 
                            />
                        </div>
                    </Fade>
                </div>              
            </Box>
        </Box>
    )

}





/******************************************************
    @export
******************************************************/


/**
 *
 * @Use: nonfungible view with perspective container
 *       this element tracks mouse pose and change 
 *       perspective per mouse position
 * 
 */ 
export default class ProfileViewLeft extends React.Component {

    state = {
        showSub: false,
        showInputField: false,
        showCreditCardForm: false,
        showWrapToken: false,
        showInputContractForm: false,
        btnLabel: 'Mint',

        current_img_src: cube1,
        all_imgs: [ cube1, cube2, cube3, cube4, cube5, cube6 ],
    }

    async componentDidMount(){      
        setTimeout(() => {
            this.setState({ showSub: true })
        },800)
    }

    onTapStakeBtn = () => {
        const { showCreditCardForm } = this.state;
        this.setState({
            btnLabel: !showCreditCardForm ? 'Done' : 'Wrap',
            showCreditCardForm: !showCreditCardForm
        })
    }

    onTapNextBtn = () => {

        let idx = getRandomArbitrary(0,5)
        let head = this.state.all_imgs[idx]
        console.log(idx, head)
        this.setState({ current_img_src: head })

    }

    onTapPrevBtn = () => {

        let idx = getRandomArbitrary(0,5)
        let head = this.state.all_imgs[idx]
        this.setState({ current_img_src: head })

    }

    onWrapNewTok = () => {
        const { showInputContractForm } = this.state;
        this.setState({
            showInputContractForm: !this.state.showInputContractForm            
        })
        if (showInputContractForm){
            setTimeout(() => {
                this.setState({
                    showWrapToken: false,
                    showSub: true
                })              
            }, 1000)
        }
    }

    onTapSubmitBtn = () => {
        this.setState({
            showWrapToken: true,
            showSub: false, 
        })
    }

    onConfirmCreditCard = () => {
        const { showCreditCardForm } = this.state;
        this.setState({
            btnLabel: !showCreditCardForm ? 'Done' : 'Mint',
            showCreditCardForm: !showCreditCardForm
        })      
    }

    render(){
        return (
            <ProfileViewLeftBase
                {...this.props}
                onWrapNewTok = {this.onWrapNewTok}
                showInputContractForm = {this.state.showInputContractForm}
                btnLabel = {this.state.btnLabel}
                onTapStakeBtn = {this.onTapStakeBtn}
                onTapPrevBtn = {this.onTapPrevBtn}
                onTapNextBtn = {this.onTapNextBtn}
                onTapSubmitBtn = {this.onTapSubmitBtn}
                onConfirmCreditCard = {this.onConfirmCreditCard}
                imgSrc = {this.state.current_img_src}               
                showCreditCardForm    = {this.state.showCreditCardForm}
                showInputContractForm = {this.state.showInputContractForm}
                showInputField = {this.state.showInputField}
                showWrapToken = {this.state.showWrapToken}
                showSub = {this.state.showSub}
            />
        )
    }
}




export { ProfileViewLeftBase }





