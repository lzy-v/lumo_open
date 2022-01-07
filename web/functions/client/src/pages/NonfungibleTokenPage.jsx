/**
 *
 *
 * @Package: NonfungibleTokenPage.jsx
 * @Date   : Jan 5th, 2022
 * @Author : Xiao Ling   
 * @Docs:
 *
 *
**/


import React, {Component} from "react";

import MessagePage from './MessagePage';
import { ParentageSubmissionView } from './../components/ParentageView';
import NonfungibleView   from './../components/NonfungibleView';
import AppBodyTemplate from './../components/AppBodyTemplate';

import { 
    illValued,
    trivialString,  
    trivialProps,
}  from './../model/utils';
import { URL_STUB } from './../model/core'

import NonFungibleTokenModel from './../model/nonfungibleToken';

import withRouter from './../hoc/withRouter';
import withAuth from './../hoc/withAuth';



/**
 *
 * @Use: NonfungibleView
 * @Actions:
 *      - Sign up with metamask or google
 *      - chat for this token specificall
 *      - stake
 *      - navigate
 *
**/
class NonfungibleTokenPage extends Component {

    state = {
        tokID    : "",
        did_refresh: 0,
        current_token: NonFungibleTokenModel.mempty(),
    }

    /******************************************************
        @Mount
    ******************************************************/

    /**
     *
     * @Use: on mount, try load data
     *
     **/
    async componentDidMount(){
        let current_url_loc  = this._parse_loc();
        this.setState({ tokID: current_url_loc }, async () => {
            await this.sync_token_data(current_url_loc);        
        })
   }    

    /***
     *
     * @Use: when `nft_cache` inherited from parent loads, or when new URL reached,
     *       load nft here. note this is needed when the user navigate here
     *       via this this.props.navigate fn
     * @Doc: https://reactjs.org/docs/react-component.html
     * 
    **/
    async componentDidUpdate(prevProps) {
        const { tokID } = this.state;
        let current_url_loc  = this._parse_loc();
        if ( current_url_loc !== tokID ){
            this.setState({  tokID: current_url_loc }, async () => {
                await this.sync_token_data(current_url_loc);
            })
        }
    }


    /**
     *
     * @Use: load `nft` from cache
     *       populate the view
     *       if nft is from opensea
     *       populate with opensea data
    **/
    sync_token_data = async (current_url_loc) => {

        const { nft_cache } = this.props;
        let tok = await nft_cache.get({ tokID: current_url_loc, peek: true })
        tok.delegate = this;

        this.setState({ current_token: tok, tokID: current_url_loc });
        await tok.sync({ then: (res) => { return }});

    }


    /**
     *
     * @Use: token.delegate callback functions
     *       thisfunction is called each time the token isupdated
     * 
     **/
    didUpdateToken = async () => {
        this.setState({ did_refresh: this.state.did_refresh + 1 })
    }

    /**
     *
     * @use: on did show bck, fetch
     *       any metadata associated
     *       with this nfty
     **/
    did_show_back = async () => {
        const { current_token } = this.state;
        await current_token.syncMetaData();
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
            let url = pathname.replace('/','')
            let url_bits = url.split('/')
            if (url_bits.length === 2 && url_bits[0] === URL_STUB.room ){
                return url_bits[1]
            } else {
                return ""
            }
        } else {
            return ""
        }
    }


    _bad_nav = () => {
        return trivialProps(this.props,'navigate')
    }

    /******************************************************
        @view
    ******************************************************/


    render(){
        return (
            <AppBodyTemplate
                {...this.props}
                pinRightSideViewToBottom            
                showChatOnMobile = {false}
                RightSideView  = {() => <MessagePage {...this.props}/>}         
                LeftCenterView = {() => 
                    <NonfungibleView 
                        {...this.props}
                        did_show_back = {this.did_show_back}
                        did_refresh ={this.state.did_refresh}
                        image_url   ={this.state.current_token.getFullURL()}
                        project_name={this.state.current_token.getTokenName()}
                        creator_name={this.state.current_token.getCreatorName()}
                        mint_date   ={this.state.current_token.getMintDate()}
                    />
                }
                TopLeftView    = {() => <ParentageSubmissionView {...this.props}/>}
                LeftBottomView = {() => <></>}
            />
        )        
    }
}

export default withRouter(withAuth(NonfungibleTokenPage));




