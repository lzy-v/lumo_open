/**
 *
 *
 * @Package: HomePage.jsx
 * @Date   : Dec 28th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *
 *
**/


import React, {Component} from "react";

import MessagePage from './MessagePage';
import { ParentageSubmissionView } from './../components/ParentageView';
import WrapTokenView   from './../components/WrapTokenView';
import AppBodyTemplate from './../components/AppBodyTemplate';
import {PUBLIC_TOK_ID} from './../model/core'

/**
 *
 * @Use: Home page
 * @Actions:
 *      - Sign up with metamask or google
 *      - chat
 *      - wrap NFT
 *      - 
 *
**/
export default class HomePage extends Component {


    render(){
        return (
            <AppBodyTemplate
                {...this.props}
                pinRightSideViewToBottom            
                showChatOnMobile = {false}
                RightSideView  = {() => <MessagePage tokid={PUBLIC_TOK_ID} {...this.props}/>}         
                LeftCenterView = {() => <WrapTokenView {...this.props}/>}
                TopLeftView    = {() => <ParentageSubmissionView {...this.props}/>}
                LeftBottomView = {() => <></>}
            />
        )        
    }
}

