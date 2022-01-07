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
	generatePassword,
}  from './../model/utils';

import { authenticate_user, signOut } from './../model/api_auth'
import { queryMetaMask } from './../model/api_opensea'
import { setUserMetamaskPk } from './../model/api_user';

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
		signUp = async ({ email, password, then }) => {
			await this.goauth({ email: email, password: password, pk: "", then: then });
		}

		signOut = async () => {
			await signOut();
		}

		// go authenticate
		goauth = async ({ email, password, pk, then }) => {

			if ( illValued(then) || trivialString(email) || trivialString(password) ){

				then({ success: false, message: `malformed email`, pk: pk ?? "",  uid: "" })

			} else {

				await authenticate_user({ 
					name : email,
					email: email,
					password: password,
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
					let PASSWORD = generatePassword(EMAIL);
					await this.goauth({ email: EMAIL, password: PASSWORD, pk: pk, then: (res) => {  then(res) } })
				}

			}});
		}		

		/**
		 *
		 * @Use: save metamask information of this user
		 *       this assumes the user has logged in already
		 *
		 **/
		saveMetaMask = async ({ authedUserID, then }) => {

			if (illValued(then)){
				return;
			}

			if ( trivialString(authedUserID) ){
				return then({ success: false, message: 'no authedUserID provided', pk: "" })
			}

			await queryMetaMask({ then: async({ success, message, pk }) => {

				if (!success || trivialString(pk)){

					then({ success: false, message: message, pk: "" })

				} else {

					let res = await setUserMetamaskPk({ authedUserID: authedUserID, pk: pk })
					return then(res);
					
				}

			}})
		}


		/******************************************************
			@View
		******************************************************/


		render(){
			return (
				<WrappedComponent
					{...this.props}
					_hoc_sign_up = {this.signUp}
					_hoc_sign_out= {this.signOut}
					_hoc_save_metamask = {this.saveMetaMask}
					_hoc_query_metamask = {this.queryMetaMask}
					_hoc_sign_up_with_metamask = {this.signUpWithMetamask}
				/>
			);
		} 
	}



};

