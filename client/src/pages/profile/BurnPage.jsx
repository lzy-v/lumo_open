/**
 * @Package: CreateProfilePage.jsx 
 * @Date   : Dec 15th, 2021
 * @Author : Xiao Ling   
 *
*/



import './../../assets/App.css';
import React, { Component } from 'react'

import withRouter from './../../hoc/withRouter';

/******************************************************
   @page for creating a profile
******************************************************/


/**
 * 
 * @Use: page for creating profile
 * @API consumed:
 * 	- 
 * 	- 
 *  	- 
 * 	- 
 * 	- 
 *  	- 
 * 
 * @Web-db API consumed:
 * 	- 
 * 	- 
 * 
 * 
*/ 
class BurnPage extends Component {

	/******************************************************
		@Responders navigation
	******************************************************/


	/**
	 * 
	 * @Use: go back to prev page
	 * 
	 */ 
	onGoBack = () => {
	}	


	/**
	 * 
	 * @Use: go to faq page explaining 
	 *       what the project is
	*/ 
	onGoToFAQ = () => {
		const e = new Error('not implemented')
		throw e;		
	}


	/******************************************************
		@Responders type
	******************************************************/	

	/**
	 * 
	 * @Use: on did type, change the cube background map
	 * 
	 */ 
	onDidType = () => {
		const e = new Error('not implemented')
		throw e;		
	}


	/******************************************************
		@Responders web3
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
	signUp = async () => {
		const e = new Error('not implemented')
		throw e;
	}


	/**
	 * 
	 * @Use: login to existing account
	 * 
	 */ 
	login = async () => {
		const e = new Error('not implemented')
		throw e;
	}


	/******************************************************
		@View
	******************************************************/

	render() {
		return (
			<div className="App">
			  <header className="App-header">
				<a
				  className="App-link"
				  href="https://reactjs.org"
				  target="_blank"
				  rel="noopener noreferrer"
				>
					this is the burn page base
					you need to change this out w/ what marcel has done
				</a>
			  </header>
			</div>
		);
	}
}

export default withRouter(BurnPage);

