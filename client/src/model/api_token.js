
/**
 * 
 * @Module: nonfungible token API
 * @Author: Xiao Ling
 * @Date  : 12/16/2021
 * @TODO  : see escrow contract: https://docs.replit.com/tutorials/33-escrow-contract-with-solidity
 * 
*/


import axios from "axios";

const { 
	illValued,
	trivialString, 	
	trivialNum,
	trivialProps,
} = require('./utils')


const { 
	  vendorID
	, vendorSecret
	, POST_ENDPOINTS
	, FLOW_NETWORK
	// , DbPaths
} = require('./core');



/******************************************************
	@Read
******************************************************/	

/**
 * 
 * @Use: fetch token from db
 * 
 */ 
async function fetchNonfungible({ tokID, then }){

	if ( trivialString(tokID) ){
		return then({})
	}

	axios.post(POST_ENDPOINTS.get_token_with_flow_account, {
		tokID   : tokID,
		vendorID: vendorID(),
		vendorSecret: vendorSecret,
	}).then(async res => {

		if ( !trivialProps(res,'data') && !trivialProps(res.data, 'tok') && !trivialProps(res.data.tok, 'tokID') ){
			then(res.data.tok)
		} else {
			then({})
		}
	})
	.catch(e => {
		then({})
	})
}



/******************************************************
	@Buy/sell web3	
******************************************************/	

/**
 * 
 * @Use: get current lumo price
 * 
 */ 
async function getLumoPrice({ then }){
	then({ success: true, message: 'hard-coded price', price_in_cents: 25 });
} 

/**
 * 
 * @Use: buy lumo token 
 * 
 */
async function buyLumo({ user, number_of_lumo, then }){

	if (illValued(then)){
		return;
	}

	if ( trivialProps(user,'userID') || trivialString(user.userID) || trivialNum(number_of_lumo) || number_of_lumo <= 0 ){
		return then({ success: false, message: `malformed inputs` })
	}

	axios.post(POST_ENDPOINTS.buy_lumo, {
		userID         : user.userID   ,
		vendorID       : vendorID()    ,
		vendorSecret   : vendorSecret  ,
		number_of_lumo : number_of_lumo,
		network        : FLOW_NETWORK(),
	}).then(async res => {

		if ( trivialProps(res,'data') || illValued(res.data) ){

			then({ success: false, message: 'bad request', paymentId: "" })

		} else {

			const { success, message, paymentId } = res.data;
			then({ success: success, message: message, paymentId: paymentId })


		}
	})
	.catch(async e => {

		then({ success: false, message: `post error: ${e}`, paymentId: "" })
	})


}


/******************************************************
	@STAKE NFT routine
******************************************************/	


/**
 * 
 * @use: user stake `amount`into tok
 * 
 */ 
async function stake({ 
	token,
	userCache, 
	amount, 
	then, 

	// intermedite hooks
	then_validate_account,
	then_go_buy,
	then_go_send,
}){

	if (trivialNum(amount) || trivialProps(userCache,'getAdminUser')){
		return then({ success: false, hasLumo: false, hasStripe: false, lumoBalance:0, message: `malformed inputs`, tx: {} })
	}

	if (trivialProps(token,'tokID')){
		return then({ success: false, hasLumo: false, hasStripe: false, lumoBalance:0, message: `malformed inputs`, tx: {} })		
	}

	// get adminuser
	let adminUser = await userCache.getAdminUser();

	if ( trivialProps(adminUser,'userID') ){
		return then({ success: false, hasLumo: false, hasStripe: false, lumoBalance:0, message: `no admin user found`, tx: {} })			
	}

	then_validate_account();

	// check if the user has a flow account, if not then create one and 
	// airdrop lumo token into the wallet
	await adminUser.create_flow_account_if_no_account({ then: async (response) => {

		if ( response['success'] && response['has_flow_account'] ){

			// 1. post to see if user has enough lumo.
			await adminUser.get_lumo_balance({  force: false, then: async ({ success, message, balance }) => {

				// 2. if enough balance, then post stake
				if (  success && balance >= amount ){

					then_go_send()

					await _go_stake({ token: token, adminUser: adminUser, balance: balance, amount: amount, then: res => {
						return then(res)
					}})

				} else {

					then_go_buy();

					// 3. else buy lumo using stripe and then stake
					await buyLumo({
						user: adminUser,
						number_of_lumo: 10*(amount - balance),
						then: async ({ success, message }) => {

							if (!success){

								return then({ 
									success    : success, 
									hasLumo    : false, 
									hasStripe  : true, 
									lumoBalance: balance,  
									message    : `Insufficient Lumo funds and failed to buy more: ${message}`, 
									tx         : {} 
								})

							} else {

								then_go_send();

								await _go_stake({ 
									token: token,
									adminUser: adminUser, 
									balance: balance, 
									amount: amount, then: res => {
										return then(res)
									}})
							}

						}

					})
				}

			}})

		} else {


			return then({ success: false, hasLumo: false, hasStripe: false, lumoBalance: 0, message: `failed to create flow account: ${response.message}`, tx: {} })
		}


	}})

}

/**
 * 
 * @Use: go stake this leaf w/ lumo tokens
 * 
 */ 
async function _go_stake({ token, adminUser, balance, amount, then }){

	let { tokID, treeID } = token;

	let url = balance < 0 ? POST_ENDPOINTS.un_stake_leaf : POST_ENDPOINTS.stake_leaf

	axios.post( url, {
		vendorID     : vendorID(),
		vendorSecret : vendorSecret,
		userID       : adminUser.userID,
		tokID        : tokID,
		treeID       : treeID,
		amt_in_lumo  : amount, 
		network      : FLOW_NETWORK(),
	}).then(async res => {

		if ( trivialProps(res,'data') || illValued(res.data) ){

			then({ success: false, hasLumo: false, hasStripe: false, lumoBalance: balance, message:`Failed to POST`, tx: {} })

		} else {

			const { success, message } = res.data;

			if ( success ){

				then({ success: true, hasLumo: true, hasStripe: true, lumoBalance: balance, message: `Success ${message}`, tx: {} })
				await adminUser.get_lumo_balance({ force: true, then: res => { return }})

			} else {

				then({ success: false, hasLumo: true, hasStripe: false, lumoBalance: balance, message:`Failed to stake: ${message}`, tx: {} })

			}
		}
	});
}



/******************************************************
	@Mint NFT routine
******************************************************/	


/**
 * 
 * @Use: complete routine for submitting leaf to tree
 * 
 */ 
async function mint_leaf_and_submit_into_tree({ userID, parentTokID, then_confirm_valid_tok, then_minting, then_submit_parent, then }){

	if (trivialString(userID) || trivialString(parentTokID)){
		return then({ success: false, message: `malformed inputs`, tok: {} })
	}

	then_confirm_valid_tok();

	// 1. check that parentTokID exist and does not have two children
	await fetchNonfungible({ tokID: parentTokID, then: async (parentTok) => {

		if ( trivialProps(parentTok, 'tokID') ){
			return then({ success: false, message: `parentTok ${parentTokID} dne`, tok: {} })
		}

		const {  tokID_10, tokID_11 } = parentTok;

		console.log('... ', parentTok, tokID_11, tokID_10)

		if ( !trivialString(tokID_11) && !trivialString(tokID_11) ){
			return then({ success: false, message: `parentTok already has children ${tokID_11} & ${tokID_10}`, tok: {} })
		}

		// 2. mint
		await _mint_nft({ 
			userID: userID ,
			then_minting: () => { then_minting() },
			then: async ({success, message, tok}) => {

				if ( !success || trivialProps(tok, 'tokID') ){
					return then({ success: success, message: message, tok: tok })
				}

				// 3. submit parentTokID as prospective parent
				then_submit_parent();

				axios.post(POST_ENDPOINTS.modify_orphan_leaf_with_parent, {
					userID       : userID,
					tokID        : tok.tokID,
					parentTokID  : parentTokID,
					vendorID     : vendorID()    ,
					vendorSecret : vendorSecret  ,
					network      : FLOW_NETWORK(),
				}).then(async res => {

				if ( trivialProps(res,'data') || illValued(res.data) ){

					then({ success: false, message: `minted nft but failed to label parent`, tok: tok })

				} else {

					if ( illValued(res.data.success) || res.data.success === false  ){

						return then({ success: false, message: `failed to label parent: ${res.data.message}`, tok: tok })

					} else {

						return then({ success: true, message: `minted token ${tok.tokID} as child of ${parentTokID}`, tok: tok })
					}

				}
			})
			.catch(async e => {

				then({ success: false, message: `post error: ${e}`, tok: {} })
			})

			}
		})

	}})

	
}


/**
 * 
 * @Use: mint nonfungible
 * 
 */ 
async function _mint_nft({ userID, then, then_minting }){

	if (illValued(then)){
		return;
	}

	if ( trivialString(userID) ){
		return then({ success: false, message: `malformed inputs`, tok: {} })
	}

	then_minting()

	axios.post(POST_ENDPOINTS.mint_orphan_leaf_with_flow_address, {
		userID         : userID   ,
		vendorID       : vendorID()    ,
		vendorSecret   : vendorSecret  ,
		network        : FLOW_NETWORK(),
	}).then(async res => {

		if ( trivialProps(res,'data') || illValued(res.data) ){

			then({ success: false, message: 'bad request', tok: {} });

		} else {

			const { success, message, tok } = res.data;
			then({ success: success, message: message, tok: tok });

		}
	});	

}




/******************************************************
	@export
******************************************************/	



export {

	//nft
	stake,
    fetchNonfungible,
	mint_leaf_and_submit_into_tree,

	// lumo
	buyLumo,
	getLumoPrice,

}











