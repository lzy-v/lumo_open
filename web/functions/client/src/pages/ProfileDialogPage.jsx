/**
 * @Package: ProfileDialogPage.jsx
 * @Date   : Jan 1st, 2022
 * @Author : Xiao Ling   
 *
 *
*/


import React, {Component} from 'react';
import DialogProfileView from './../components/DialogProfile';
import { 
    trivialString,  
    trivialProps,
    illValued,
}  from './../model/utils'
import {  GLOBAL_STAGING } from './../model/core'

import { save_nft_as_profile_image } from './../model/api_opensea';

import withRouter from './../hoc/withRouter';
import withAuth from './../hoc/withAuth';


/**
 *
 * @use: profile component that either shows the user
 *       profile, or show authed user profile
 *       with textinput forms for inputting user texts
 *
 *
**/
class ProfileDialogPage extends Component {

    state = {
        nameValue: "",
        bioValue: "",
        editable: true,
        showSnackbar: false,
        snackMessage: "",
        showProgress: false,
        showOpenSea: false,
        connectedToMetamask: false,
        profileAvatar: "",
    }


    /**
     *
     * @Use: when `currentUserID` updates,
     *       fetch all of user's profile data
     *
     **/
    async componentDidUpdate(prevProps) {
        const { currentUserID } = this.props;
        if ( prevProps.currentUserID === currentUserID ){
            return 
        } else {
            if (!trivialString(currentUserID)){
                await this.goLoadData();
                setTimeout(async () => {
                    if (this.props.currentUserID === currentUserID){
                        await this.goLoadData()
                    }
                },1000)
            }
        }
    }


    goLoadData = async () => {
        
        const { user_cache, currentUserID } = this.props;

        let user = await user_cache.get({ userID: currentUserID })
        let admin_user = await user_cache.getAdminUser();

        if ( trivialProps(user,'userID') ){
            return;
        }

        this.setState({
            nameValue: user.name,
            bioValue: user.bio,
            profileAvatar: user.profile_image_preview_url,
            connectedToMetamask: !trivialString(user.metamask_pk),
            editable: currentUserID === (admin_user.userID ?? "")
        })
    }


    /******************************************************
        @responders: client
    ******************************************************/ 


    /**
     * @use: change user name
     *
     **/
    changeName = (e) => {   
        this.setState({
            nameValue: e.target.value ?? ""
        })
    }

    /**
     * @use: change about str
     *
     **/
    changeBio = (e) => {
        this.setState({
            bioValue: e.target.value ?? ""
        })  
    }

    /**
     *
     * @use: show opensea input token info view
     *
     **/
    setShowOpenSea = () => {
        this.setState({ showOpenSea: true })
    }

    /**
     *
     * @use: close this dialog
     *
     **/
    handleClose = () => {
        if ( this.props.handleClose ){
            this.props.handleClose();
        } else {
            alert("Oh no! An error occcured")
        }
    }



    /******************************************************
        @responders: db
    ******************************************************/ 


    /**
     *
     * @Use: save changes in necesary
     * 
     **/
    handleSave = async () => {

        const { user_cache } = this.props;

        if ( trivialProps(user_cache, 'getAdminUser')) {

            this.handleClose();

        } else {

            let authed_user = await user_cache.getAdminUser();
            
            if ( !trivialProps(authed_user,'setUserNameAndBio') ){
                authed_user.setUserNameAndBio({ 
                    name: this.state.nameValue,
                    bio: this.state.bioValue
                })
            }            

            this.handleClose();

        }
    }


    /******************************************************
        @responders: metamask + openseas
    ******************************************************/ 

    /**
     *
     * @Use: either wrap token or connect to metmask
     *
     **/
    goMintOrConnectToMetamask = async (tok) => {

        const { user_cache } = this.props;
        let authed_user = await user_cache.getAdminUser();

        if ( trivialProps(authed_user, 'userID') ){
            return alert("Slow down! You're going too fast")
        }

        if ( trivialString(authed_user.metamask_pk) ){

            await this.goConnectToMetamask() 

        } else {

            await this.wrapOpenSea(tok)
        }
    }


    /**
     *
     * @Use: if the user is already signed in,
     *      then save metamask information
     *
     **/
    goConnectToMetamask = async () => {

        const { 
            user_cache,
            _hoc_save_metamask, 
        } = this.props;

        this.setState({ showProgress: true });

        if ( illValued(_hoc_save_metamask) || trivialProps(user_cache, 'getAdminUser') ){

            let msg = "Slow down! You're going too fast"
            this.setState({ showProgress: false, showSnackbar: true, snackMessage: msg })
            this.hideSnack();            

        } else {

            let user = await user_cache.getAdminUser();

            if ( trivialProps(user, 'userID') ){
                let msg = "Slow down! You're going too fast"
                this.setState({ showProgress: false, showSnackbar: true, snackMessage: msg })
                this.hideSnack();                            
                return;
            }

            await _hoc_save_metamask({
                authedUserID: user.userID,
                then: ({ success, message }) => {

                    let msg = success ? "Connected to metamask!" : JSON.stringify(message)

                    this.setState({
                        showProgress: false,
                        showSnackbar: true,
                        snackMessage: msg, 
                        connectedToMetamask: true   
                    })
                    this.hideSnack();
                }
            });

        }

    }


    /**
     *
     * @Use: query opensea nonfungible and wrap
     *
     **/
    wrapOpenSea = async ({ address, tokID }) => {

        const { user_cache } = this.props;
        let authed_user = await user_cache.getAdminUser();
        this.setState({ showSnackbar: false })

        if ( trivialProps(authed_user, 'userID') ){
            return alert("Slow down! You're going too fast")
        }        

        if (trivialString(address) || trivialString(tokID)){
            let msg = "Please enter contract address and token ID"
            this.setState({ showSnackbar: true, snackMessage: msg })
            return;
        }

        this.setState({ showProgress: true });

        // let _address = '0x2931B181Ae9Dc8F8109eC41C42480933F411ef94';
        // let tid = '246';

        await save_nft_as_profile_image({
            tokID: tokID,
            contractAddress: address,
            userID: authed_user.userID,

            _force_: GLOBAL_STAGING,  // @TODO: remove this in production

            then: async ({ success, message, preview_url }) => {

                if (!success){

                    this.setState({
                        showProgress: false,
                        showSnackbar: true,
                        snackMessage: message
                    })

                } else {    

                    this.setState({
                        showSnackbar: true,
                        showProgress: false,
                        showOpenSea: false,                     
                        profileAvatar: preview_url ?? "",
                        snackMessage: "We set this token as your profile avatar!"
                    })

                }
            }

        })


        this.hideSnack();

    }

    /******************************************************
        @View
    ******************************************************/ 

    hideSnack = () => {
        setTimeout(() => {
            this.setState({ showSnackbar: false, snackMessage: "" })
        },3000) 
    }


    render(){
        return (
            <DialogProfileView 
                {...this.props}
                defaultName   = {"Name"}
                defaultAbout  = {"About me"}
                editable      = {this.state.editable}
                nameValue     = {this.state.nameValue}
                bioValue      = {this.state.bioValue}
                showSnack     = {this.state.showSnackbar}
                snackMessage  = {this.state.snackMessage}                
                showProgress  = {this.state.showProgress}
                showOpeanSea  = {this.state.showOpenSea}
                profileAvatar = {this.state.profileAvatar}
                didChangeName = {this.changeName}
                didChangeBio  = {this.changeBio}
                handleClose   = {this.handleClose}
                handleSave    = {this.handleSave}
                setShowOpenSea = {this.setShowOpenSea}
                connectedToMetamask = {this.state.connectedToMetamask}
                goConnectToMetamask = {this.goMintOrConnectToMetamask}
            /> 
        )
    }
}

export default withRouter(withAuth(ProfileDialogPage));
