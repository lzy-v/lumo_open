
/**
 * 
 * @Module: user api
 * @Author: Xiao Ling
 * @Date  : 12/16/2021
 * @TODO  : see escrow contract: https://docs.replit.com/tutorials/33-escrow-contract-with-solidity
 * 
*/


import axios from "axios";

const { 
	illValued,
	trivialString, 	
	trivialProps,
} = require('./utils')


const { 
	  vendorID
	, vendorSecret
	, POST_ENDPOINTS
	, FLOW_NETWORK
} = require('./core');



/******************************************************
	@User stripe
******************************************************/	

/**
 * 
 * @use: check if user has stripe customer id
 * 
 */ 
async function does_user_have_stripe_customer_id({ userID, then }){

	if ( trivialString(userID) ){
		return then({ success: false, has_stripe_account: false, customerID: "" })
	}

	axios.post(POST_ENDPOINTS.does_user_have_stripe_customer_id, {
		userID       : userID,
		vendorID     : vendorID(),
		vendorSecret : vendorSecret,
	}).then(async res => {

		if ( trivialProps(res,'data') || illValued(res.data) ){

			return then({ success: false, has_stripe_account: false, customerID: "" })

		} else if ( trivialProps(res.data,'success') ){

			return then({ success: false, has_stripe_account: false, customerID: "" })

		} else {

			const { success, customerID } = res.data;

			if ( success && !trivialString(customerID) ){

				return then({ success: true, has_stripe_account: true, customerID: customerID })

			} else {


				return then({ success: true, has_stripe_account: false, customerID: "" })
			}

		}

	})			

}



/******************************************************
	@User flow
******************************************************/	


/**
 * 
 * @Use: check if `userID` has flow account
 * 
 */ 
async function has_flow_account({ userID, then }){

	if ( trivialString(userID) ){
		return then({ success: false, message: `bad input`, has_flow_account: false })
	}


	axios.post(POST_ENDPOINTS.doesUserHaveFlowAccount, {
		userID       : userID,
		vendorID     : vendorID(),
		vendorSecret : vendorSecret,
		network      : FLOW_NETWORK(),
	}).then(async res => {

		if ( trivialProps(res,'data') || illValued(res.data) ){
			then({ success: false, message: 'bad request', has_flow_account: false })
		} else {
			const { success, message, hasAccount } = res.data;
			if ( success && hasAccount ){
				return then({ success: true, message: 'has account', has_flow_account: true });
			} else {
				return then({ success: false, message: `failed to get account: ${message}`, has_flow_account: false });
			}
		}
	});

}


/**
 * 
 * @Use: create for `userID` a flow account
 * 
 */ 
async function create_flow_account({ userID, then }){

	if ( trivialString(userID) ){
		return then({ success: false, message: `bad input`, has_flow_account: false })
	}


	axios.post(POST_ENDPOINTS.createUserFlowAddress, {
		userID       : userID,
		vendorID     : vendorID(),
		vendorSecret : vendorSecret,
		network      : FLOW_NETWORK(),
		depositLumo  : true,
	}).then(async res => {

		if ( trivialProps(res,'data') || illValued(res.data) ){
			then({ success: false, message: 'bad request', has_flow_account: false })
		} else {
			const { success, message, flowAddress } = res.data;
			if ( success && !trivialString(flowAddress) ){
				return then({ success: true, message: 'has account', has_flow_account: true });
			} else {
				return then({ success: false, message: `failed to create account: ${message}`, has_flow_account: false });
			}
		}
	});

}


/**
 * 
 * @Use: check if `userID` has lumo balance
 * 
 */ 
async function get_lumo_balance({ userID, then }){

	if ( trivialString(userID) ){
		return then({ success: false, balance: 0 })
	}

	axios.post(POST_ENDPOINTS.read_balance, {
		userID       : userID,
		vendorID     : vendorID(),
		vendorSecret : vendorSecret,
		network      : FLOW_NETWORK(),
	}).then(async res => {
		if ( trivialProps(res,'data') || illValued(res.data) ){
			then({ success: false, message: 'bad request', balance: 0  })
		} else {
			return then(res.data);
		}
	});


}


/******************************************************
	@export
******************************************************/	



export {
	get_lumo_balance,
	has_flow_account,
	create_flow_account,
	does_user_have_stripe_customer_id,
}








