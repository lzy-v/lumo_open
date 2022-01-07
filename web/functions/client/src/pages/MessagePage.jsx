/**
 *
 *
 * @Package: MessagePage.jsx
 * @Date   : Dec 28th, 2021
 * @Author : Xiao Ling   
 * @Docs   : https://firebase.google.com/docs/firestore/query-data/listen
 *
 *
**/


import React, {Component} from "react";

import ChatView from './../components/Chat';
import LoginPage from './LoginPage';
import ProfileDialogPage from './ProfileDialogPage';
import WrapTokenDialogPage from './WrapTokenDialogPage';
import DialogInstruction from './../components/DialogInstruction';

import withRouter from './../hoc/withRouter';
import withAuth from './../hoc/withAuth';

import { 
    trivialString,  
    trivialProps,
    illValued,
}  from './../model/utils';
import { PUBLIC_TOK_ID, URL_STUB } from './../model/core'

import parse_command, { Command_Kind } from './../model/Parser';



/**
 *
 * @Use: standalone chat page with authentication
 *       built in so that the user can authenticate
 *       on any chat page, and submit NFT if needed
 *       This is a component that is shared across
 *       all pages
 * @Actions:
 *      - Sign up with metamask or google
 *      - chat
 *          <stake n>     => stake n lumo
 *          *<stake m>*   => privately stake m lumo
 *          <metamask>    => connect to metamask
 *          xxx@email.com => login via email if the user is not already logged in
 *
**/
class MessagePage extends Component {

    state = {

        isAuthed: false,
        reloadChat: 0,
        did_sync: false,

        showHelpDialog: false,

        // message view settigns
        showProgress: false,
        showSnack: false,
        snackMessage: "",

        // auth values
        showLogin: false,
        emailValue: "",

        // profile page
        showProfileDialogPage: false,
        dialogUserID: "",

        // wrap tok page
        showWrapTokenDialog: false,

        current_tok_id: "",

    }

    /******************************************************
        @load data and respond to delegate
    ******************************************************/ 

    /**
     *
     * @Use: on mount, try load data
     *
     **/
    async componentDidMount(){    
        await this.sync_chat_data();
    }

    /***
     *
     * @Use: when new token loaded, reached load chat here
     * @Doc: https://reactjs.org/docs/react-component.html
     * 
    **/
    async componentDidUpdate(prevProps) {    
        // const { current_tok_id } = this.state;
        // let current_url_loc = this.parse_tok_id();
        // if ( current_tok_id !== current_url_loc ){
        //     await this.sync_chat_data();
        //     setTimeout(async () => {
        //         await this.sync_chat_data();
        //     },400)
    }    


    /**
     *
     * @use: update chat data and authed user property
     *
     **/
    sync_chat_data = async () => {

        const { message_cache } = this.props;
        message_cache.delegate = this;
        let current_url_loc = this.parse_tok_id();

        if ( !trivialString(current_url_loc) ){
            await message_cache.syncTok({ tokID: current_url_loc });
        }
        this.setState({ did_sync: true, current_tok_id: current_url_loc });
    }
    /*
     *
     * @Use: get datasource based on tokenID
     *       and auth state
     *
     **/
    get_data_source = () => {
        
        const { message_cache, user_cache }  = this.props;
        const current_url_loc = this.parse_tok_id();
        
        var head = [];
        var tail = [];

        if ( trivialString(user_cache.adminUserID) ){
            head = message_cache.getAdminMessage();
        }

        if ( trivialString(current_url_loc) ){
            tail = message_cache.read_public_chat({ limit: 100 });
        } else {
            tail = message_cache.read_private_chat({ tokID: current_url_loc, limit: 100 });
        }

        let res = tail.concat(head);

        return res;
    }

    /**
     *
     * @Use: when new chat comes in, push into dataSource
     * @Important: this is refenced by `message_cache` model
     *             using delegate pattern
     *
     **/
    didLogChat = (chat) => {
        var { reloadChat } = this.state;
        this.setState({ reloadChat: reloadChat + 1  })
    }

    /**
     *
     * @Use: when the user press enter, immediately
     *       append value into his chat
     *
     **/
    didWriteChat = (chat) => {
        return;
    }


    /**
     *
     * @Use: parse current location from url
     *
    **/
    parse_tok_id = () => {
        const { pathname } = this.props.location
        let url = pathname.replace('/','')
        let url_bits = url.split('/')
        if ( url_bits.length === 1 && url_bits[0] === "" ){
            return PUBLIC_TOK_ID;
        } else if (url_bits.length === 2 && url_bits[0] === 'room' ){
            return url_bits[1];
        } else {
            return ""
        }
    }        

    /******************************************************
        @User responders: dialogs
    ******************************************************/ 

    /**
     *
     * @use: on close login, validate signup data,
     *       print error in needed 
     * 
    **/
    closeLogin = async () => {
        this.setState({ showLogin: false })
    }

    closeProfileDialogPage = () => {
        this.setState({ showProfileDialogPage: false, dialogUserID: "" })
    }

    closeWrapTokenDialog = () => {
        this.setState({ showWrapTokenDialog: false })
    }

    /** 
     * 
     * @use: on click image, go to room
     *
     **/
    handleClickImage = (item) => {

        if ( trivialProps(item,'preview_tokID') || trivialString(item.preview_tokID)  ){
            return null;
        }

        const { preview_tokID } = item;
        this.props.navigate(`/${URL_STUB.room}/${preview_tokID}`)
    }


    /**
     *
     * @Use: navigate to profile for `userID`
     *       load the user first
     *
     **/
    go_to_profile = async ({ userID }) => {
        
        this.setState({ showProgress: true });

        const { user_cache } = this.props;
        let user = await user_cache.get({ userID: userID ?? "" })
        let authed_user = await user_cache.getAdminUser()

        if ( trivialProps(user, 'userID') ){
            this.setState({
                showSnack: true,
                showProgress: false,
                snackMessage: "We cannot find this profile!"
            })
        }  else if (  trivialProps(authed_user, 'userID') ){
            this.setState({
                showSnack: true,
                showProgress: false,
                snackMessage: "Please sign in first"
            })            
        } else {
            this.setState({
                dialogUserID: user.userID,
                showProfileDialogPage: true, 
                showProgress: false, 
                showSnack: false, 
                snackMessage: "",
            })
        }
    }



    /******************************************************
        @User responders: messaging
    ******************************************************/ 

    /**
     *
     * @Use: parse chat, either call command
     *       or put chat into db
     *
     **/
    didPressEnter = async (inputed_text) => {

        const { user_cache } = this.props;

        let { cmd, str, amt } = parse_command(inputed_text);

        switch (cmd){

            case Command_Kind.AUTH_METAMASK:
                if ( user_cache.isAuthed() ){
                    await this.connect_metamask();
                    return true;
                } else {
                    await this.auth_with_metamask();
                    return true;
                }

            case Command_Kind.AUTH_EMAIL:
                if ( user_cache.isAuthed() ){
                    return await this._go_write_chat(inputed_text);
                } else {                    
                    this.setState({ emailValue: str, showLogin: true })
                    return true;
                }

            case Command_Kind.STAKE:
                alert(`staking ${amt}`)
                return true;

            case Command_Kind.WRAP_TOK:
                this.setState({ showWrapTokenDialog: true })
                return true;

            case Command_Kind.HELP:
                this.setState({ showHelpDialog: true })
                return true;

            case Command_Kind.BAD_COMMAND:
                if (user_cache.isAuthed()){
                    this.setState({ showSnack: true, snackMessage: `We do not recognize this command!`})
                    this.hideSnack();
                    return true;
                } else {
                    this.setState({ emailValue: str, showLogin: true })
                    return true;
                }

            default:
                if (user_cache.isAuthed()){
                    return await this._go_write_chat(inputed_text);
                } else {
                    this.setState({ emailValue: str, showLogin: true })
                    return true;
                }
        }

    }

    _go_write_chat = async (inputed_text) => {

        const tokid = this.parse_tok_id();
        const { message_cache } = this.props;

        if ( trivialString(inputed_text.trim()) ){

            return true;

        } else if ( !trivialProps(message_cache, 'write_chat') ){

            let { success, message } = await message_cache.write_chat({ tokID: tokid, text: inputed_text });
            if (!success){
                this.setState({ showSnack: true, snackMessage: message });

            }
            return true;

        } else {

            let msg = "You're going too fast! Slow down!"
            this.setState({ showProgress: false, showSnack: true, snackMessage: msg })
            this.hideSnack();


        }        
    }


    /******************************************************
        @wrap token responders
    ******************************************************/ 

    /**
     *
     * @Use: on did wrap token, send out message
     *       and tweet staing I have minted a wrapped token
     *
    **/
    handleDidSaveWrapToken = async ({ openSeaAddress, openSeaTokID, token, opensea_token }) => {

        const tokid = this.parse_tok_id();
        const { message_cache, user_cache } = this.props;
        let authed_user = await user_cache.getAdminUser();

        if (trivialProps(message_cache,'write_chat')  || trivialString(authed_user.userID) ){

            return;

        } else {

            let mint_message = `${authed_user.name} just minted a new token from ${openSeaAddress}.`

            var blob = {
                tokID                       : tokid ?? "",
                text                        : mint_message,
                openSea_image_preview_url   : opensea_token['image_preview_url'] ?? "",
                openSea_image_thumbnail_url : opensea_token['image_thumbnail_url'] ?? "",
                openSea_image_url           : opensea_token["image_url"] ?? "",
                preview_tokID               : token['tokID'] ?? "",
            }

            await message_cache.write_chat(blob);

            // rewrite again in public chat
            if ( tokid !== PUBLIC_TOK_ID ){
                blob['tokID'] = PUBLIC_TOK_ID;
                await message_cache.write_chat(blob);
            }
        }
    }

    /******************************************************
        @Auth responders
    ******************************************************/ 

    /**
     * 
     * @Use: - create firebase auth account
     *       - create lumo/core account + flow account
     *       - deposit lumo into the user's wallet
     *       - mint genisis NFT and submit to the next level 
     *       - on the tree
     * 
    **/ 
    auth_with_metamask = async () => {

        this.setState({ showProgress: true })

        if ( !trivialProps(this.props,'_hoc_sign_up_with_metamask') ){

            await this.props._hoc_sign_up_with_metamask({  then: ({ success, message, pk, uid }) => {

                let msg = success ? "Connected to metamask!" : JSON.stringify(message)
                this.setState({ showProgress: false, showSnack: true, snackMessage: msg })
                this.hideSnack();

            }});

        } else {

            let msg = `Oh no! An error occured on our end!`
            this.setState({ showProgress: false, showSnack: true, snackMessage: msg })
            this.hideSnack();

        }   
    }

    /**
     *
     * @Use: if the user is already signed in,
     *      then save metamask information
     *
     **/
    connect_metamask = async () => {

        const { _hoc_save_metamask, user_cache } = this.props;
        let userID = user_cache.adminUserID;

        this.setState({ showProgress: true });

        if ( illValued(_hoc_save_metamask) || trivialString(userID) ){

            let msg = "Slow down! You're going too fast"
            this.setState({ showProgress: false, showSnack: true, snackMessage: msg })
            this.hideSnack();

        } else {
            await _hoc_save_metamask({
                authedUserID: userID,
                then: ({ success, message }) => {

                    let msg = success ? "Connected to metamask!" : JSON.stringify(message)

                    this.setState({
                        showProgress: false,
                        showSnack: true,
                        snackMessage: msg                    
                    })
                    this.hideSnack();
                }
            })
        }
    }

    /**
     * 
     * @Use: - create firebase auth account
     *       - create lumo/core account + flow account
     *       - deposit lumo into the user's wallet
     *       - mint genisis NFT and submit to the next level 
     *       - on the tree
     * 
    **/ 
    auth_with_email = async ({ email, password }) => {

        const { _hoc_sign_up } = this.props;
        this.setState({ showProgress: true })        

        if ( illValued(_hoc_sign_up) ){

            let msg = "Slow down! You're going too fast"
            this.setState({ showProgress: false, showSnack: true, snackMessage: msg });
            this.hideSnack();

        } else {
            await this.props._hoc_sign_up({ email: email, password: password, then: ({ success, message, uid }) => {

                let msg = success ? "You're all set!" : JSON.stringify(message)

                this.setState({
                    showProgress: false,
                    showSnack: true,
                    snackMessage: msg                    
                })
                this.hideSnack();
            }});
        }
    }

    // @use: hide snack after 3 seconds
    hideSnack = () => {
        setTimeout(() => {
            this.setState({ showSnack: false, snackMessage: "" })
        },3000) 
    }


    /******************************************************
        @Stake responders
    ******************************************************/ 

    /**
     *
     * @use: stake `amt`
     *
     **/
    stake = async ({ amt }) => {
        return;
    }


    /******************************************************
        @View     
    ******************************************************/ 


    render(){
        return (    
            <>
                <ChatView 
                    {...this.props}                 
                    did_sync     = {this.state.did_sync}
                    showSnack    = {this.state.showSnack}
                    snackMessage = {this.state.snackMessage}
                    showProgress = {this.state.showProgress}
                    reloadChat   = {this.state.reloadChat}
                    dataSource   = {this.get_data_source()} 
                    adminUserID  = {this.props.user_cache.adminUserID}
                    didPressEnter = {this.didPressEnter}
                    handleTapIcon = {this.go_to_profile}
                    handleClickImage = {this.handleClickImage}
                    isAuthed     = {!trivialString(this.props.user_cache.adminUserID)}
                />
                <LoginPage
                    {...this.props}
                    defaultEmail={this.state.emailValue}
                    open={this.state.showLogin}
                    handleClose={this.closeLogin}
                    onConfirm = {this.auth_with_email}
                />      
                <ProfileDialogPage
                    {...this.props}
                    currentUserID = {this.state.dialogUserID}
                    open={this.state.showProfileDialogPage}
                    handleClose={this.closeProfileDialogPage}
                />      
                <WrapTokenDialogPage
                    {...this.props}
                    open={this.state.showWrapTokenDialog}
                    handleClose={this.closeWrapTokenDialog}                    
                    handleDidSaveWrapToken={this.handleDidSaveWrapToken}
                />
                <DialogInstruction 
                    {...this.props}
                    open={this.state.showHelpDialog}
                    handleClose={() => this.setState({ showHelpDialog: false})}
                />                
            </>            
        )        
    }
}



export default withRouter(withAuth(MessagePage));
