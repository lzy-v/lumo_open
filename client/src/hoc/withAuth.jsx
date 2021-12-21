/**
 * @Package: authentication hoc
 * @Date   : Dec 18th, 2021
 * @Author : Xiao Ling   
 * @Documentation: 
 *   - https://v5.reactrouter.com/web/api/Hooks
 *   - https://www.npmjs.com/package/@metamask/detect-provider      
 *
*/

import React, { Component } from 'react'

import { 
  illValued,
  trivialString,  
}  from './../model/utils';

import { authenticate_user, signOut } from './../model/api_auth'
import { queryMetaMask } from './../model/api_opensea'


export default function withAuth(WrappedComponent){


	return class extends Component {

		/******************************************************
			@Sign up email: web2
		******************************************************/

		/**
		 * 
		 * @Use: - create firebase auth account
		 *       - create lumo/core account + flow account
		 *       - deposit lumo into the user's wallet
		 *       - mint genisis NFT and submit to the next level 
		 *       - on the tree
		 * 
		 */ 
		signUp = async ({ email, then }) => {
			console.log("go sign up not implemented")
			await signOut();
			// await this.goauth({ email: email, pk: "", then: then });
		}

		// go authenticate
		goauth = async ({ email, pk, then }) => {

			if ( illValued(then) || trivialString(email) ){

				then({ success: false, message: `malformed email`, pk: pk ?? "",  uid: "" })

			} else {

				await authenticate_user({ 
					name : email,
					email: email,
					pk   : pk ?? "",
					then: ({success, message, uid}) => {

						then({ success: success, message: message, pk: pk ?? "", uid: uid })

					}});
			}

		}

		/******************************************************
			@Signup metamask: web3
		******************************************************/

		/**
		 *
		 * @Use: connect metamask and sign up using
		 *       eth pk as arb. email stub
		 *
		 **/
		signUpWithMetamask = async ({ then }) => {

			await queryMetaMask({ then: async ({ success, message, pk }) => {

				if (!success || trivialString(pk)){
					then({ success: false, message: message, uid: "", pk: "" })
				} else {
					let EMAIL = `${pk}_metamask@lumo.land`;
					await this.goauth({ email: EMAIL, pk: pk, then: (res) => {  then(res) } })
				}

			}});
		}		


		/******************************************************
			@View
		******************************************************/


		render(){
			return (
				<WrappedComponent
					{...this.props}
					_hoc_signUp = {this.signUp}
					_hoc_queryMetaMask = {this.queryMetaMask}
					_hoc_signUpWithMetamask = {this.signUpWithMetamask}
				/>
			);
		} 
	}



};

