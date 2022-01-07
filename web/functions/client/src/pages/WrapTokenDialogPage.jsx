/**
 * @Package: WrapTokenDialogPage.jsx
 * @Date   : Jan 3rd, 2022
 * @Author : Xiao Ling   
 *
 *
*/


import React, {Component} from 'react';
import DialogSubmissionView from './../components/DialogSubmission';
import { 
    trivialString,  
    trivialProps,
}  from './../model/utils'
import { mint_insert_and_modify_with_opensea } from './../model/api_token';

import withRouter from './../hoc/withRouter';
import withAuth from './../hoc/withAuth';


/**
 *
 * @Use: standalone wrap token page that
 *       wraps an opensea token,
 *       verifies the user owns the token
 *       mints it on flow
 *       and accept other metadata
 * @Actions:
 *      - connect metmask if user is not connected
 *      - fetch opensea token
 *      - mint its wrap on flow
 *
**/
class WrapTokenDialogPage extends Component {

    state = {
        showSnack    : false,
        snackMessage : "",
        animateCubes : false,
        showProgress : false,
        isFullCube   : true,
        preview_url  : "",
        isMinting    : false,
    }


    /******************************************************
        @responders: client
    ******************************************************/ 

    /**
     *
     * @use: close this modal, delete all data
     *
     **/
    _handleClose = () => {
        this.setState({
            animateCubes: false,
            showSnack: false,
            showProgress: false,
            preview_url: "",
            isFullCube: true,
            isMinting: false,
        })
        this.props.handleClose();
        // this.props.handleDidSave();
    }


    /******************************************************
        @responders: db
    ******************************************************/ 

    /** 
     *
     * @use: on did submit token, wrap token 
     *       and mint on flow.
     *       if user is not connected to metamask
     *       then connect to metamask first
     * @Example:
     *    address: 0x7F72528229F85C99D8843C0317eF91F4A2793Edf
     *    tokID:  458
     *    about: "something about this token"
     *
     **/
    handleDidWrap = async ({ address, tokID, about }) => {

        if ( trivialString(address) ){

            this.tellUser({
                message: "Please provide a valid address",
                animate: false
            })

        } else if ( trivialString(tokID) ) {

            this.tellUser({
                message: "Please provide a valid nfty id",
                animate: false
            })

        } else if (this.state.isMinting){

            this.tellUser({
                message: "We're minting right now!",
                animate: true,
            })

        } else {

            this.setState({ isMinting: true });
            await this.goConfirmMetamaskAcct({ address: address, tokID: tokID, about: about });
        }

    }

    /**
     *
     * @use: ensure user has metamask, if not create metamaks
     *       for user, then wrap token
     *
     **/
    goConfirmMetamaskAcct = async ({ address, tokID, about }) => {

        const { user_cache, _hoc_save_metamask } = this.props;

        // 0. check user has metamask
        const authed_user = await user_cache.getAdminUser();

        if ( trivialProps(authed_user,'userID') ){

            return this.tellUser({ message: "Slow down! you're going too fast!", animate: false })

        } else if ( trivialString(authed_user.metamask_pk) ){

            // 0.a: if the user does not have metamask, then save
            await _hoc_save_metamask({ authedUserID: authed_user.userID, then: ({ success, message, pk }) => {

                if ( !success || trivialString(pk) ){

                    this.tellUser({ message: `we failed to connect to your metamask account`, animate: false })

                } else {

                    this.goMintAndWrapToken({ address: address, tokID: tokID, about: about, userID: authed_user.userID  })
                }

            }})

        } else {

            this.goMintAndWrapToken({ address: address, tokID: tokID, about: about , userID: authed_user.userID });

        }

    }

    
    /**
     *
     * @use: check the user owns this token or is on global staging
     *       then mint token, insert into tree, and
     *       save the opensea data
     *
     **/
    goMintAndWrapToken = async ({  address, tokID, about, userID }) => {

        this.tellUser({ message: "Checking the chain for this token", animate: true });
        this.setState({ isMinting: true })

        await mint_insert_and_modify_with_opensea({
            userID                 : userID, 
            openSeaTokID           : tokID,
            openSeaContractAddress : address,
            lumoParentTokID        : "232",
            then_confirm_own_tok   : () => {
                this.setState({
                    showSnack: true,
                    snackMessage: "Verifying ownership"
                })
            },
            then_did_confirm_own_tok: ({ ownToken, token }) => {

                let url = token['image_preview_url'] || token['image_thumbnail_url'] || token['image_original_url'];

                this.setState({
                    showSnack: true,
                    snackMessage: ownToken ? `You do own this token` : `You do not own this token!`,
                    preview_url: url,
                })
            },
            then_confirm_valid_tok: () => {
                this.setState({
                    showSnack: true,
                    snackMessage: "Ok everything looks good so far"
                })
            },
            then_minting: () => {
                this.tellUser({ message: "Minting, this may take a while", animate: true });
            },
            then: async ({ success, message, tok, opensea_token }) => {

                if ( !success ){

                    this.tellUser({
                        message: `Oh no! something went terribly wrong: ${message}`,
                        animate: false,
                    });
                    this.setState({ isMinting: false })


                } else {

                    this.tellUser({
                        message: `MINTED!`,
                        animate: false,
                    });                               
                    this.setState({ isFullCube: false, isMinting: false });

                    // bubble event up and send it out as chat 
                    // message for all to see
                    await this.props.handleDidSaveWrapToken({
                        openSeaAddress: address,
                        openSeaTokID: tokID,
                        token: tok,
                        opensea_token: opensea_token
                    })
                    // this._handleClose();

                    setTimeout(() => {
                        this._handleClose();
                    },10*1000)

                }

            }
        });
    }

    /******************************************************
        @View
    ******************************************************/ 

    // @use: user feedback
    tellUser = ({ message, animate }) => {
        this.setState({ showSnack: true, snackMessage: message, animateCubes: animate  });        
        this.hideSnack();
    }

    hideSnack = () => {
        setTimeout(() => {
            this.setState({ showSnack: false, snackMessage: ""})
        },3000)
    }

    render(){
        return (    
            <DialogSubmissionView
                {...this.props}
                isFullCube   = { this.state.isFullCube }
                preview_url   = {this.state.preview_url}
                showProgress = {this.state.showProgress}
                animateCubes = {this.state.animateCubes}
                showSnack    = {this.state.showSnack}
                snackMessage = {this.state.snackMessage}
                handleMint   = {this.handleDidWrap}
                handleClose  = {this._handleClose}
            />
        )
    }


}


export default withRouter(withAuth(WrapTokenDialogPage));
