/**
 *
 * @Package: NonFungibleTokenPage.jsx
 * @Date   : Dec 15th, 2021
 * @Author : Xiao Ling   
 *
*/



import './../../assets/App.css';
import React, { Component } from 'react'
import Button from '@mui/material/Button';

import { 
	illValued,
	trivialString, 	
	trivialProps,
	swiftNow
}  from './../../model/utils';

import withRouter from './../../hoc/withRouter';
import withAuth from './../../hoc/withAuth';


/**
 * 
 * @Use: Nonfungible token display component 
 * @API consumed:
 * 	- get_token_with_flow_account
 * 	- stake_leaf
 *  - un_stake_leaf
 * 	- buy_lumo
 *  - sell_NFT_with_lumo
 *  - sell_NFT_with_use
 * 
 * @Web-db API consumed:
 *  - write_chat
 * 	- await_chat
 * 
 * 
*/ 
class NonFungibleTokenPage extends Component {

	state = {
		name  : '',
		tok   : {},
		chats : [],

		// input form
		email : '',
		chat_text: '',
	}

	/******************************************************
		@load
	******************************************************/

	/***
	 *
	 * @Use: when user `back` button into this component, reload data
	 * @Doc:
	 * 
	**/
	async componentDidMount(){		
		// https://stackoverflow.com/questions/46504660/refresh-previous-screen-on-goback
	    // this.willFocusSubscription = this.props.navigation.addListener(
	    //   'willFocus',
	    //   () => {
	    //     // this.props.fetchData();
	    //     console.log('did focus again')
	    //   }
	    // );
	}

	/***
	 *
	 * @Use: when `nft_cache` inherited from parent loads, or when new URL reached load nft here
	 * @Doc: https://reactjs.org/docs/react-component.html
	 * 
	**/
	async componentDidUpdate(prevProps) {

		let current_url_loc  = this._parse_loc();
		let current_tok_id   = trivialProps(this.state.tok,'tokID') ? "" : this.state.tok.tokID;
		let did_update_props = prevProps.nft_cache === null && !trivialProps(this.props.nft_cache,'dataSource');

		if ( did_update_props || current_tok_id !== current_url_loc  ){	
			await this.sync_token_data();
		}

	}


	/**
     *
     * @Use: load `nft` from cache
     *       populate the view
     *       if nft is from opensea
     *       populate with opensea data
    **/
	sync_token_data = async () => {

		if ( !trivialProps(this.props,'nft_cache') && !trivialProps(this.props.nft_cache, 'dataSource') && this._valid_loc() ){

			let tokID = this._parse_loc();
			let tok = await this.props.nft_cache.get({ tokID: tokID, peek: true });

            console.log('-----------------------------------');
			console.log(`Loaded token with tokID: `, tokID);
            console.log('-----------------------------------');

			await tok.sync({ then: (data) => {

				if ( trivialProps(data,'tokID') ){
					return;
				} else {
					this.setState({ tok: tok, name: data.address });
				}

			}});
		}
	}


	/******************************************************
		@Responders navigation
	******************************************************/

	/**
	 *
	 * @Use: go to right child on tree;
	 *
	**/
	onGoToParent = async () => {

		if ( this._bad_token() || this._bad_nav() ){
			return 
		}

		let new_tok_id = this.state.tok.getParent();

		if ( !trivialString(new_tok_id) ){
			this.props.navigate(`/${new_tok_id}`)
		} else {
			const e = new Error(`@TODO: show modal when no token found`)
			throw e;
		}
	}

	/**
	 *
	 * @Use: go to left child on tree;
	 *
	**/
	onGoToLeft = async () => {

		if ( this._bad_token() ){
			return 
		}

		let new_tok_id = this.state.tok.getLeftChild();

		if ( !trivialString(new_tok_id) ){
			this.props.navigate(`/${new_tok_id}`)
		} else {
			const e = new Error(`@TODO: show modal when no token found`)
			throw e;
		}
	}

	/**
	 *
	 * @Use: go to right child on tree;
	 *
	**/
	onGoToRight = async () => {

		if ( this._bad_token() ){
			return 
		}

		let new_tok_id = this.state.tok.getRightChild();

		if ( !trivialString(new_tok_id) ){
			this.props.navigate(`/${new_tok_id}`)
		} else {
			const e = new Error(`@TODO: show modal when no token found`)
			throw e;
		}
	}

	/******************************************************
		@Sign up email: web2 + web3
	******************************************************/

	/**
	 * 
	 * @Use: - create firebase auth account
	 *       - create lumo/core account + flow account
	 *       - deposit lumo into the user's wallet
	 *       - mint genisis NFT and submit to the next level 
	 *       - on the tree
	 * 
	**/ 
	signUpWithGoogle = async () => {

		if ( !trivialProps(this.props,'_hoc_sign_out') ){

			await this.props._hoc_sign_out();

			// let EMAIL = `user_${swiftNow()}@gmail.com`
			// await this.props._hoc_signUp({ email: EMAIL,  then: ({ success, message, uid }) => {

			// 	console.log("go sign up:", success, message, uid)

			// }});

		} else {

			const e = new Error(`hoc auth not passed `)
			throw e;
		}

	}


	/**
	 *
	 * @Use: connect metamask and sign up this way
	 *
	**/
	signUpWithMetamask = async ({ then }) => {

		if ( !trivialProps(this.props,'_hoc_signUpWithMetamask') ){

			await this.props._hoc_signUpWithMetamask({  then: ({ success, message, pk, uid }) => {

				console.log("go sign up:", success, message, uid)

			}});

		} else {

			const e = new Error(`hoc auth not passed `)
			throw e;
		}		

	}

	/******************************************************
		@Responders web3
	******************************************************/

	/**
	 *
	 * @Use: go on the token;
	 *
	**/
	onStake = async () => {

		if ( this._bad_token() || trivialProps(this.props,'user_cache') ){
			return;
		}

		const { tok } = this.state;
		const { user_cache } = this.props;

		await tok.stake({
			userCache : user_cache,
			amount    : 0.73,
			then_validate_account: () => {
				console.log(" ... check valid account");
			},
			then_go_buy: () => {
				console.log(" ... insufficient balance: buying lumo token");
			}, 
			then_go_send: () => {
				console.log("... sending lumo token");
			},
			then: ({ success, hasLumo, hasStripe, message, lumoBalance }) => {

				console.log('\n>>> NonFungibleTokenPage.onStake => ', success, lumoBalance, message);

				if (!success){
					const e = new Error(`@TODO: show fail modal`)
					throw e;
				}

			}
		})
	}


	/**
	 *
	 * @Use: go buy nft
	 *
	**/
	onBuy = async () => {

		if ( this._bad_token() || trivialProps(this.props,'user_cache') ){
			return;
		}

		const { tok } = this.state;
		const { user_cache } = this.props;

		await tok.buy({
			userCache      : user_cache,
			price_in_cents : 13000.0,
			then           : ({ success, hasLumo, hasStripe, message, lumoBalance }) => {

				console.log('\n>>> NonFungibleTokenPage.onBuy => ', success, lumoBalance, message)

				if (!success){
					const e = new Error(`@TODO: show fail modal`)
					throw e;
				}

			}
		})
	}



	/******************************************************
		@Utils
	******************************************************/

	/**
	 *
	 * @Use: assert we are in a valid location
	 *
	**/
	_valid_loc = () => {
		return !illValued(this.props.location)	
			&& !trivialProps(this.props.location, 'pathname')
			&& !trivialString(this.props.location.pathname)
	}


	/**
	 *
	 * @Use: parse current location from url
	 *
	**/
	_parse_loc = () => {
		if (this._valid_loc()){
			const { pathname } = this.props.location
			let id = pathname.replace('/','')
			return id
		} else {
			return ""
		}
	}

	/**
	 *
	 * @Use: check the token is mal-formed;
	 *
	**/
	_bad_token = () => {

		return illValued    (this.state.tok)
			|| trivialProps (this.state.tok, 'tokID') 
			|| trivialString(this.state.tok.tokID)

	}

	_bad_nav = () => {
		return trivialProps(this.props,'navigate')
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
					Token {this.state.name}
				</a>
				<br/>
				<Button variant="contained" onClick={this.onGoToParent}> parent</Button>
				<br/>
				<Button variant="contained" onClick={this.onGoToLeft}> left</Button>
				<br/>
				<Button variant="contained" onClick={this.onGoToRight}> right</Button>
				<br/>
				<Button variant="contained" onClick={this.onStake}> stake</Button>
				<br/>
				<Button variant="contained" onClick={this.signUpWithGoogle}> sign out </Button>
				<br/>
				<Button variant="contained" onClick={this.signUpWithMetamask}> signUpWithMetamask </Button>
				<br/>
			  </header>

			</div>
		);
	}
}


export default withRouter(withAuth(NonFungibleTokenPage));








