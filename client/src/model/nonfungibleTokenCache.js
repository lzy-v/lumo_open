/** 
 * @Module: nonfungible token cache
 * @Author: Xiao Ling
 * @Date  : 12/16/2021
*/

import NonFungibleTokenModel from './nonfungibleToken';

const { 
	illValued,
	trivialString, 	
	trivialProps,
} = require('./utils');


class NonFungibleTokenCache {


	constructor(){
		this.dataSource = {};
		this.delegate = null;
	}

	/**
	 * 
	 * @Use: sync w/ app's latest data
	 * 
	 */ 
	async sync(){
		return;
	}

	/**
	 * 
	 * @Use: read existing tok from dataSource
	 * 
	 */ 
	read({ tokID }){
		if (trivialString(tokID)){
			return null;
		} else {
			return this.dataSource[tokID]
		}
	}


	/**
	 * 
	 * @use: get token `tokID` from store;
	 *       if not in store, get from db
	 *       if `_terminal`, do not get neighbors
	 * 
	 */ 
	async get({ tokID, peek }){

		if ( trivialString(tokID) ){

			return null;

		} else {

			let tok = this.dataSource[tokID]

			if (!trivialProps(tok,'tokID')){

				return tok;

			} else {

				// create this nft and store
				let tok = new NonFungibleTokenModel(tokID);
				await tok.sync({ then: async (t) => { 
					// get parent and children NFT
					if ( !illValued(peek) && peek === true ){
						await this._getNeighbors(t);
					}
				}});
				this.dataSource[tokID] = tok;

				return tok;
			}
		}
	}

	/**
	 * 
	 * @Use: get this `tok`'s parent + children NFT
	 * 
	 */
	async _getNeighbors(tok){
		const tok_00 = tok['tokID_00'];
		const tok_10 = tok['tokID_10'];
		const tok_11 = tok['tokID_11'];
		await this.get({ tokID: tok_00, peek: false })
		await this.get({ tokID: tok_10, peek: false })
		await this.get({ tokID: tok_11, peek: false })
	}

}


export default NonFungibleTokenCache;
