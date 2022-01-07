/**
 *
 *
 * @Package: NonFungibleTokenPage.jsx
 * @Date   : Dec 15th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *   - chat style: https://codesandbox.io/s/material-ui-chat-drh4l?file=/src/App.js
 *   - chat full: https://github.com/Wolox/react-chat-widget
 *   - the console used: https://github.com/linuswillner/react-console-emulator
 *   - other console: https://github.com/webscopeio/react-console
 *
 *
*/


import React from 'react'

// Lumo modules
import { ParentageLeafView, ParentageOrphanView, ParentageSubmissionView, ParenteProfileView } from './ParentageView';
import {ChatExample} from './Chat';
import OrphansView from './OrphansView';
import CreditCardInput from './CreditCardInput';
import NonfungibleView from './NonfungibleView';
import ProfileViewLeft from './ProfileViewLeft';
import ProfileViewRight from './ProfileViewRight';
import useCheckMobileScreen from './../hoc/useCheckMobileScreen';
import AppBodyTemplate from './AppBodyTemplate';



/******************************************************
	@views: NFT page
******************************************************/



/**
 *
 * @Use: one fungible token view
 * 
 *
 **/
function NonFungibleTokenView(props){
	return (
		<AppBodyTemplate
			{...props}
			showChatOnMobile 
			RightSideView  = {() => <ChatExample {...props}/>}
			LeftCenterView = {() => <NonfungibleView {...props}/>}
			LeftBottomView = {() => <></>}						
			TopLeftView = {() => <ParentageLeafView {...props}/>}
		/>
	)   
}


/******************************************************
	@Views: orphan adoption page
******************************************************/

/**
 *
 * @use: submit new nonfungible token view
 * 
 *
 **/
function NonFungibleTokenInsertionView(props){
	return (
		<AppBodyTemplate
			{...props}
			showChatOnMobile
			RightSideView  = {() => <ChatExample {...props}/>}
			LeftCenterView = {() => <OrphansView {...props}/>}
			LeftBottomView = {() => <></>}          
			TopLeftView = {() => <ParentageOrphanView {...props}/>}			
		/>
	)   
}

	



/******************************************************
	@Views: profile
******************************************************/

/**
 *
 * @use: submit new nonfungible token view
 * 
 *
 **/
function UserProfileView(props){
	
	const isOnMobile = useCheckMobileScreen(1000);

	return (
		<AppBodyTemplate
			{...props}
			showChatOnMobile = {false}
			LeftCenterView = {() => <ProfileViewLeft {...props}/>}
			RightSideView  = {() => <ProfileViewRight {...props}/>}			
			LeftBottomView = {() => <></>}
			TopLeftView = {() => isOnMobile ? <ParenteProfileView {...props}/> : <></>}
		/>
	)   
}



/******************************************************
	@Views: submission page with credit card input
******************************************************/


/**
 *
 * @use: submit new nonfungible token view
 * 
 *
 **/
function NonFungibleTokenCreditCardInputView(props){
	return (
		<AppBodyTemplate
			{...props}
			showChatOnMobile = {false}
			RightSideView  = {() => <ChatExample {...props}/>}			
			LeftCenterView = {() => <CreditCardInput {...props}/>}
			LeftBottomView = {() => <></>}
			TopLeftView = {() => <ParentageSubmissionView {...props}/>}
		/>
	)   
}


/******************************************************
	@Export
******************************************************/


export { 
	UserProfileView,
	NonFungibleTokenView, 
	NonFungibleTokenInsertionView,
	NonFungibleTokenCreditCardInputView,
}








