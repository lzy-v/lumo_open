
/**
 * 
 * @Module: core react
 * @Author: Xiao Ling
 * @Date  : 12/16/2021
 * 
*/


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const { 
	illValued,
	trivialString, 	
} = require('./utils')


/******************************************************
	@Global parameters
******************************************************/

// determine if on staging server
const GLOBAL_STAGING = true 

// staging vendorID
const vendorID_staging     = ""
const vendorSecret_staging = ""

// production vendorID
const vendorID_production     = ""
const vendorSecret_production = ""


const vendorID = () => {
	if (GLOBAL_STAGING){
		return vendorID_staging
	} else {
		if (trivialString(vendorID_production)){
			const e = new Error(`production vendor id is not specified`)
			throw e;
		} else {
			return vendorID_production
		}
	}
}
const vendorSecret = GLOBAL_STAGING ? vendorSecret_staging : vendorSecret_production;


const Networks = {	
	ropsten       : 'ropsten',
	sandbox       : 'sandbox',
	mainnet       : 'mainnet',
	flow_local    : 'flow_local',
	flow_testnet  : 'flow_testnet',
	flow_mainnet  : 'flow_mainnet'
}

// @use: output the correct network or throw;
const FLOW_NETWORK = () => {
	if (GLOBAL_STAGING){
		return Networks.flow_testnet;
	} else {
		if (vendorID_production !== "" ){
			return Networks.flow_mainnet
		} else {
			const e = new Error(`production id is not defined`)
			throw e;
		}
	}
}


/******************************************************
	@Init firebase
******************************************************/

// STAGING
const STAGING_CONFIG = {
  apiKey        : "",
  authDomain    : "",
  projectId     : "",
  storageBucket : "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
}

// production  
const PRODUCTION_CONFIG = {
	apiKey       : "",
	authDomain   : "",
	projectId    : "",
	storageBucket: "",
	appId        : "",
	measurementId: "",
	messagingSenderId: "",
};



/**
 * 
 * @Use: initalize firebase
 * @Doc: https://firebase.google.com/docs/firestore/manage-data/add-data
 * @Note: see how version 9 changes
 * 
 */
function go_init_firebase(){
	if (GLOBAL_STAGING === false && PRODUCTION_CONFIG['apiKey'] === ""){
		const e = new Error(`@ERROR: PRODUCTION_CONFIG not specified`)
		throw e;
	} else {
		initializeApp( GLOBAL_STAGING ? STAGING_CONFIG : PRODUCTION_CONFIG );
	}
}

go_init_firebase();
const fire_db = getFirestore();

// app refs
// const storageRef = app.storage().ref(); // firebase.storage().ref();

/**
 * 
 * @Use: firebase db path collection names
 * 
 */ 
const DbPaths = {
	users: 'users',
};


/******************************************************
	API Storage
******************************************************/

//@Path: upload image 
const uploadPhoto = ({path, file, then}) => {

	if (illValued(file) || trivialString(path) ){ 
		then({ success: false, message: "mal-formed inputs" })
		return
	}

	// var ref = storageRef.child(path)
	// ref.put(file)
	// 	.then((snapshot) => {
	// 		if (!illValued(snapshot) && !illValued(snapshot.ref) && !illValued(snapshot.ref.getDownloadURL)){
	// 			return snapshot.ref.getDownloadURL()
	// 		} else {
	// 			return ""
	// 		}
	// 	})
	// 	.then((url) => {
	// 		if (!illValued(url) && !trivialString(url)){
	// 			then(true,url)
	// 		} else {
	// 			then(false,"")
	// 		}
	// 	})


};


/******************************************************
	API POST endpoints
******************************************************/


const API_root_production = "";
const API_root_staging    = '';

const API_root =  () => {
	if ( GLOBAL_STAGING ){
		return API_root_staging
	} else {
		if (!trivialString(API_root_production)){
			return API_root_production
		} else {
			const e = new Error(`production API root is not specified`)
			throw e;
		}
	}

}


const POST_ENDPOINTS = {

	// account
	createUserAccount                  : `${API_root()}/account/createUserAccount`,
	createUserFlowAddress              : `${API_root()}/account/createUserFlowAddress`,
	doesUserHaveStubAccount            : `${API_root()}/account/doesUserHaveStubAccount`,
	doesUserHaveFlowAccount            : `${API_root()}/account/doesUserHaveFlowAccount`,

	// nft primitive
	get_token_with_flow_account        : `${API_root()}/binary_tree_finance/get_token_with_flow_account`, 
	mint_orphan_leaf_with_flow_address : `${API_root()}/binary_tree_finance/mint_orphan_leaf_with_flow_address`,
	modify_leaf_with_metadata          : `${API_root()}/binary_tree_finance/modify_leaf_with_metadata`,
	insert_root_with_flow_address      : `${API_root()}/binary_tree_finance/insert_root_with_flow_address` ,
	modify_orphan_leaf_with_parent     : `${API_root()}/binary_tree_finance/modify_orphan_leaf_with_parent`,

	// binary_tree stake
	stake_leaf                  : `${API_root()}/binary_tree_finance/stake_leaf`,
	un_stake_leaf               : `${API_root()}/binary_tree_finance/un_stake_leaf`,

	// binary tree sell
	sell_NFT_with_lumo          : `${API_root()}/binary_tree_finance/sell_NFT_with_lumo`,
	sell_NFT_with_use           : `${API_root()}/binary_tree_finance/sell_NFT_with_use`,

	// opeasea
	log_opensea_nft_submission  : `${API_root()}/binary_tree_finance/log_opensea_nft_submission`,

	// stripe
	create_user_stripe_account        : `${API_root()}/stripe/create_user_stripe_account`,
	does_user_have_stripe_customer_id : `${API_root()}/stripe/does_user_have_stripe_customer_id`,
	charge_customer                   : `${API_root()}/stripe/charge_customer`,

	// lumo fungible token
	buy_lumo     : `${API_root()}/lumo/buy_lumo`,
	read_balance : `${API_root()}/lumo/read_balance`,
	// send_lumo    : `${API_root()}/lumo/send_lumo`,

}




/******************************************************
	Export
******************************************************/


export { 

	// constants
    GLOBAL_STAGING
  , vendorID
	, vendorSecret
	, POST_ENDPOINTS
	, FLOW_NETWORK
	, DbPaths

	// firebase
	, fire_db
	, uploadPhoto

}


























