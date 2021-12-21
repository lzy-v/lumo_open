/**
 * @Package: SubmitNonFungiblePage.jsx
 * @Date   : Dec 15th, 2021
 * @Author : Xiao Ling   
 *
*/


import './../../assets/App.css';
import React, { Component } from 'react';
import Button from '@mui/material/Button';

import { 
	illValued,
	trivialString, 	
	trivialProps,
}  from './../../model/utils';

import withRouter from './../../hoc/withRouter';
import withAuth from './../../hoc/withAuth';

import { mint_leaf_and_submit_into_tree } from './../../model/api_token';

import { 
    doesUserOwnThisToken,
    save_nft_as_profile_image,
    user_did_send_openSea_token_to_Lumo_address,
} from './../../model/api_opensea';



/**
 * 
 * @Use: Submit nonfungible token
 * @API consumed:
 * 	- get_token_with_flow_account
 * 
 * @Web-db API consumed:
 *  -  
 * 
*/ 
class SubmitNonFungibleTokenPage extends Component {

    state = {
        parent_tok : {},
        orphan_toks: {},
    }

    /******************************************************
        @load
    ******************************************************/

    /***
     *
     * @Use: when `nft_cache` inherited from parent loads, or when new URL reached load nft here
     *       fetch all toks associated with this frontier
     * @Doc: https://reactjs.org/docs/react-component.html
     * 
    **/
    async componentDidUpdate(prevProps) {

        let current_url_loc  = this._parse_loc();
        let current_tok_id   = trivialProps(this.state.parent_tok,'tokID') ? "" : this.state.parent_tok.tokID;
        let did_update_props = prevProps.nft_cache === null && !trivialProps(this.props.nft_cache,'dataSource');

        if ( did_update_props || current_tok_id !== current_url_loc  ){ 
            await this.sync_frontier_data();
        }

    }


    /**
     *
     * @Use: load `nft` from cache
     *       populate the view
     *       if nft is from opensea
     *       populate with opensea data
    **/
    sync_frontier_data = async () => {

        if ( !trivialProps(this.props,'nft_cache') && !trivialProps(this.props.nft_cache, 'dataSource') && this._valid_loc() ){

            let tokID = this._parse_loc();
            let tok = await this.props.nft_cache.get({ tokID: tokID, peek: true });

            console.log('-----------------------------------');
            console.log("Loaded parent token with tokID: ", tokID);
            console.log('-----------------------------------');

            await tok.sync({ then: (data) => {

                if ( trivialProps(data,'tokID') ){
                    return;
                } else {
                    this.setState({ parent_tok: tok });
                }

            }});
        }
    }


    /******************************************************
        @Submit with OpenSea
    ******************************************************/

    /**
     * 
     * @Use: save nft as profile image
     * 
     */ 
    saveNftAsProfileImage = async () => {

        if ( trivialProps(this.props,'user_cache') || trivialProps(this.props.user_cache, 'getAdminUser') ){
            return;
        }

        let adminUser = await this.props.user_cache.getAdminUser();

        if ( trivialProps(adminUser, 'userID') ){
            return;
        }

        await save_nft_as_profile_image({
            userID: adminUser.userID,
            tokID: '18',
            contractAddress: '0x4880728b4CAF1E61da588c6532aF67946BC3957b',
            then: ({ success, message }) => {

                console.log("@: save_nft_as_profile_image: ", success, message)

            }
        })
    }

    /**
     * 
     * @Use: submit to open sea hardcoded with tokid and all
     * 
     */ 
    initiateSubmissionWithOpenSea = async () => {

        let tid = '18';
        let address = '0x4880728b4CAF1E61da588c6532aF67946BC3957b';

        let adminUser = await this.props.user_cache.getAdminUser();
        let parent_tok = await this._parse_loc()

        if ( trivialProps(adminUser, 'userID') || trivialString(parent_tok) ){
            return;
        }

        await doesUserOwnThisToken({
            tokID: tid, 
            contractAddress: address,
            then: async ({ success, ownToken, message, data }) => {

                if ( success && ownToken ){

                    const { owner, image_preview_url, image_thumbnail_url, image_url, image_original_url } = data;

                    /**
                     * @TODO: note this needs to be moved outside 
                     *        of this function, called after user has submitted
                     */ 
                    // log the fact that the user has sent the token
                    await user_did_send_openSea_token_to_Lumo_address({

                        // lumo tok data
                        userID      : adminUser.userID, 
                        parentTokID : parent_tok,

                        // web3
                        eth_tokID : tid, 
                        user_pk   : owner.address ?? "" , 
                        contractAddress: address, 

                        // opensea
                        image_preview_url     : image_preview_url ?? "",
                        image_thumbnail_url   : image_thumbnail_url ?? "",
                        image_url             : image_url ?? "",
                        image_original_url    : image_original_url ?? "",
                        openSeaCreatorAddress : "" ,
                        openSeaOwnerAddressAtTimeOfWrap: "",

                        then: async({ success, message }) => {

                            console.log('user_did_send_openSea_token_to_Lumo_address: ', success, message)
                        }

                    })                    

                } else {

                    console.log('user does not own token: ', ownToken, message, data);
                }

            }
        })
    }

    /******************************************************
        @submit with item to mint
    ******************************************************/

    /**
     * 
     * @Use: submit new item for minting
     *       and staking into the tree
     * 
     */ 
    submitOriginalWork = async () => {

        await mint_leaf_and_submit_into_tree({
            userID: this.props.userID,
            parentTokID: this.state.parent_tok.tokID,
            then_confirm_valid_tok: () => {
                console.log('...then_confirm_valid_tok')
            },
            then_minting: async () => {
                console.log(".... minting")
            }, 
            then_submit_parent: async () => {
                console.log(".... submit parent")                
            }, 
            then: async ({ success, message, tok }) => {

                console.log(`did mint token: `, success, message, tok)

            }
        })

    }

    /******************************************************
        @Utils
    ******************************************************/

    /**
     *
     * @Use: assert we are in a valid location
     *
    **/
    _valid_loc = () => {
        return !illValued(this.props.location)  
            && !trivialProps(this.props.location, 'pathname')
            && !trivialString(this.props.location.pathname)
    }


    /**
     *
     * @Use: parse current location from url
     *
    **/
    _parse_loc = () => {
        if (this._valid_loc()){
            const { pathname } = this.props.location
            let paths_names = pathname.split('/')            
            let id = paths_names[paths_names.length-1]
            return id
        } else {
            return ""
        }
    }

    /**
     *
     * @Use: check the token is mal-formed;
     *
    **/
    _bad_token = () => {

        return illValued    (this.state.parent_tok)
            || trivialProps (this.state.parent_tok, 'tokID') 
            || trivialString(this.state.parent_tok.tokID)

    }

    _bad_nav = () => {
        return trivialProps(this.props,'navigate')
    }

    /******************************************************
        @View
    ******************************************************/

    render() {
        return (
            <div className="App">
              <header className="App-header">
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    Submit new Nonfungible for parent: {this.state.parent_tok.tokID}
                </a>
                <br/>
                <Button variant="contained" onClick={this.initiateSubmissionWithOpenSea}> submit with Metamask </Button>
                <br/>
                <Button variant="contained" onClick={this.submitOriginalWork}> submit original work </Button>
                <br/>
                <Button variant="contained" onClick={this.saveNftAsProfileImage}> saveNftAsProfileImage </Button>

              </header>

            </div>
        );
    }


}


export default withRouter(withAuth(SubmitNonFungibleTokenPage));


































