
/**
 * 
 * @Module: nonfungible token model
 * @Author: Xiao Ling
 * @Date  : 12/16/2021
 * @TODO  : see escrow contract: https://docs.replit.com/tutorials/33-escrow-contract-with-solidity
 * 
*/



const { 
	swiftNow,
	illValued,
	trivialString, 	
	trivialNum,
	trivialProps,
} = require('./utils');

 const { stake, fetchNonfungible, fetch_nft_from_opensea } = require('./api_token');


export default class NonFungibleTokenModel {

	constructor(tokID){

		if ( illValued(tokID) || trivialString(tokID) ){
			return;
		}

		this.tokID = tokID;
		this.data  = {};
		this.didSync = false;
		this.delegate = null;
	}

	/******************************************************
		@Load from db
	******************************************************/

	/**
	 * 
	 * @Use: sync token with lumo/core db
	 * 
	**/ 
	async sync({ then }){

		await fetchNonfungible({ tokID: this.tokID, then: async (tok) => {

			this.didSync = true;
			this.data  = tok;
			then(tok)

		}})

	}

	/**
	 * 
	 * @use: read chat from db
	 * 
	 */ 
	async syncChat(){
		let e = new Error("chat not implemented")
		throw e;
	}



	/**
	 * 
	 * @Use: fetch preview_url from openseas if the token
	 *       is from open_sea
	 * 
	 */ 
	async sync_nft_from_opensea(){

        let tid = '18';
        let address = '0x4880728b4CAF1E61da588c6532aF67946BC3957b';

		await fetch_nft_from_opensea({
			tokID: tid,
			contractAddress: address, 
			then:  async ({ success, message, data }) => {

				const e = new Error('@ERROR: sync from opensea not implemented')
				throw e

			}
		})
	}


	/******************************************************
		@Read	
	******************************************************/

	getParent = () => {
		if (trivialProps(this.data, 'tokID')){
			return ""
		} else {
			return this.data.tokID_00
		}
	}

	getLeftChild = () => {
		if (trivialProps(this.data, 'tokID')){
			return ""
		} else {
			return this.data.tokID_10
		}
	}

	getRightChild = () => {
		if (trivialProps(this.data, 'tokID')){
			return ""
		} else {
			return this.data.tokID_11
		}
	}


	/******************************************************
		@Write web2
	******************************************************/

	/**
	 * 
	 * @Use: put chat 
	 * 
	 */ 
	async put_chat({ userID, message }){
		if (trivialString(userID) || trivialString(this.tokID)){
			return;
		}
		let blob = {
			userID: userID,
			message: message,
			tokID  : this.tokID,
			timeStamp: swiftNow()
		}
		return blob;
	}


	/******************************************************
		@Buy/sell web3	
	******************************************************/	

	/**
	 * 
	 * @use: buy this `tok` for `price_in_cents`
	 * 
	 */ 
	async buy({ userCache, price_in_cents, then }){

		if (trivialNum(price_in_cents) || trivialProps(userCache,'getAdminUser')){
			return then({ success: false, hasLumo: false, hasStripe: false, lumoBalance:0, message: `malformed inputs`, tx: {} })
		}

	}

	/******************************************************
		@Stake web3	
	******************************************************/	

	/**
	 * 
	 * @use: user stake `amount`into tok
	 * 
	 */ 
	async stake({ 
		userCache, 
		amount, 
		then, 

		// intermedite hooks
		then_validate_account,
		then_go_buy,
		then_go_send,
	}){

		await stake({
			token: this.data,
			userCache: userCache, 
			amount: amount,
			then: async res => {
				then(res)
			}, 
			then_validate_account: () => {
				then_validate_account();
			},
			then_go_buy: () => {
				then_go_buy();
			},
			then_go_send: () => {
				then_go_send()
			}
		})

	}


}

























 








