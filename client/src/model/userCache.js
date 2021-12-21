/** 
 * @Module: user cache
 * @Author: Xiao Ling
 * @Date  : 12/16/2021
*/

import UserModel from './userModel';

const { 
	trivialString, 	
	trivialProps,
} = require('./utils');


class UserModelCache {


	constructor(){
		this.dataSource = {};
		this.adminUserID = ""
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
	 * @Use: set this pages's user account as `to`
	 * 
	 */ 
	async setAdminUser({ to }){
		if (!trivialString(to)){
			this.adminUserID = to
			await this.get({ userID: to });
		}
	}

	/**
	 * 
	 * @Use: get this admin user's account 
	 * 
	 */ 
	async getAdminUser(){
		if (trivialString(this.adminUserID)){
			return null;
		} else {
			let user = await this.get({ userID: this.adminUserID });
			return user;
		}
	}

	/**
	 * 
	 * @Use: read existing user from dataSource
	 * 
	 */ 
	read({ userID }){
		if (trivialString(userID)){
			return null;
		} else {
			return this.dataSource[userID]
		}
	}


	/**
	 * 
	 * @use: get useren `userID` from store;
	 *       if not in store, get from db
	 *       if `_terminal`, do not get neighbors
	 * 
	 */ 
	async get({ userID }){

		if ( trivialString(userID) ){

			return null;

		} else {

			let user = this.dataSource[userID]

			if (!trivialProps(user,'userID')){

				return user;

			} else {

				// create this nft and store
				let user = new UserModel(userID)
				await user.sync({ then: b => { return }});
				this.dataSource[userID] = user;
				return user;
			}
		}
	}


}


export default UserModelCache;
