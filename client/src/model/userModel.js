
/**
 * 
 * @Module: User model
 * @Author: Xiao Ling
 * @Date  : 12/16/2021
 * @TODO  : see escrow contract: https://docs.replit.com/tutorials/33-escrow-contract-with-solidity
 * 
*/



const { 
	illValued,
	trivialString, 	
	// trivialProps,
} = require('./utils')


const {
	get_lumo_balance,
	create_flow_account,
	has_flow_account,
	does_user_have_stripe_customer_id
} = require('./api_user');
 

/**
 * 
 * @Use: sync user data on web2 and web3
 * 
 */ 
export default class UserModel {

	constructor(userID){

		if ( illValued(userID) || trivialString(userID) ){
			return;
		}

		this.userID   = userID;
		this.data     = {};
		this.delegate = null;

		// payment conditions
		this.did_sync_stripe    = false;
		this.has_stripe_account = false;
		this.stripe_customerID  = ""

		// lumo condition
		this.did_sync_lumo   = false;
		this.lumo_balance    = 0.0;
		this.valid_flow_account = false;

	}

	/******************************************************
		@Load
	******************************************************/

	/**
	 * 
	 * @Use: sync token with lumo/core db
	 * 
	 */ 
	async sync({ then }){

		await this._sync_stripe({ then: b => { return } });
		await this.get_lumo_balance({ then: v => { return }});
		await this.has_flow_account({ userID: this.userID, then: v => { return } })
	}


	/**
	 * 
	 * @use: check user's stripe id
	 * 
	 */ 
	async _sync_stripe({ then }){

		if ( trivialString(this.userID) ){
			return then({ success: false, has_stripe_account: false, customerID: "" })
		}

		await does_user_have_stripe_customer_id({ userID: this.userID,
			then: async ({ success, has_stripe_account, customerID }) => {

				this.did_sync_stripe = true;
				this.has_stripe_account = !trivialString(customerID) && success

				then({ success: success, has_stripe_account: has_stripe_account, customerID: customerID })
			}
		})

	}


	/******************************************************
		@query web3
	******************************************************/	

	/**
	 * 
	 * @Use: check if user has flow account, if no
	 *       then create one for the user
	 * 
	 */ 
	async create_flow_account_if_no_account({ then }){

		if (this.valid_flow_account){
			return then({ success: true, has_flow_account: true, message: `user already has flow account` })
		}

		await has_flow_account({ userID: this.userID, then: async ({success, message, has_flow_account}) => {

			// console.log('1. ', success, message, has_flow_account)

			 if (success && has_flow_account){
			 	return then({ success: true, message: message, has_flow_account: true })
			 }

			 await create_flow_account({ userID: this.userID, then: async (res) => {

			 	if ( res.success && res.has_flow_account){

			 		return then(res)

			 	} else {

			 		var _res = res;
			 		let xs = res.message
			 		_res['message'] = `failed to create flow account: ${xs}`
			 		return then(_res);
			 	}

			 }})

		}})
	}


	/**
	 * 
	 * @Use: check if user has flow account
	 * 
	 */ 
	async has_flow_account({ then }){
		await has_flow_account({
			userID: this.userID,
			then: ({ success, message, has_flow_account }) => {
				this.valid_flow_account = has_flow_account
				then({ success: success, message: message, has_flow_account: has_flow_account })
			}
		})
	}


	/**
	 * 
	 * @Use: read lumo balance from server
	 * 
	 */ 
	async get_lumo_balance({ force, then }){

		if ( trivialString(this.userID) ){

			then({ success: false, message: 'no userID', balance: 0 });

		} else if ( this.did_sync_lumo && ( illValued(force) || force === false ) ){

			then({ success: true, balance: this.lumo_balance, message: 'reading from cache' })

		} else {
			await get_lumo_balance({ userID: this.userID, then: res => { 				
				const { balance } = res;
				this.did_sync_lumo = true;
				this.lumo_balance = balance ?? 0
				then(res) 
			}})
		}
	}



	/******************************************************
		@query web2
	******************************************************/

	/**
	 * 
	 * @Use: check if user has stripe account
	 * 
	 * 
	 */ 
	async has_stripe({ then }){	

		if ( this.did_sync_stripe ){
			return then({ success: true, has_stripe_account: this.has_stripe_account, customerID: this.stripe_customerID });
		} else {
			await this._sync_stripe({ then: b => then(b) })
		}

	}

	

}



























 








