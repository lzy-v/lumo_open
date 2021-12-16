/** 
 * 
 * @Package: deployemnt state for each partner
 * @Date   : 9/26/2021
 * @Partner: all. shared doc
 *
*/

/******************************************************
	@web3 endpoints + admin key
******************************************************/

// ropsten
const ALCHEMY_STAGING = {
	http: `https://eth-ropsten.alchemyapi.io/v2/2Nk_m8WMNRhRF-R9h5x_Su6Y9I_jP8Vy`,
	websocket:`wss://eth-ropsten.ws.alchemyapi.io/v2/2Nk_m8WMNRhRF-R9h5x_Su6Y9I_jP8Vy`
}

// main net
const ALCHEMY_PRODUCTION = {
	http: `https://eth-mainnet.alchemyapi.io/v2/fTzENpOMVghsI-WPx56R1JGyu_DaD1vC`,
	websocket:`wss://eth-mainnet.ws.alchemyapi.io/v2/fTzENpOMVghsI-WPx56R1JGyu_DaD1vC`,
}

exports.ALCHEMY_STAGING = ALCHEMY_STAGING;
exports.ALCHEMY_PRODUCTION = ALCHEMY_PRODUCTION;
 

exports.Networks = {
	ropsten: 'ropsten',
	mainnet: 'mainnet',
	sandbox: 'sandbox',
}


/******************************************************
	@Local paths to contract exes
******************************************************/

// contract paths
const ERC20_local_path = `./../artifacts/contracts/ERC20.sol/ERC20.json`;


/******************************************************
	@dev 
******************************************************/


// ropsten
exports.DEV_ROPSTEN_CONFIG = {

	config_id       : 0,
	config_name     : 'ROPSTEN @dev',
	contract_name   : 'ERC20',

	address         : '0xCbF37D9546a79B231FAEAE3Fe45516513cb52F8A', 
	contract_path   : ERC20_local_path,
	web3_http       : ALCHEMY_STAGING.http,
	websocket       : ALCHEMY_STAGING.websocket
};


// main net
exports.MAIN_NET_CONFIG = {

	config_id       : 0,
	config_name     : 'MAINNET @production',
	contract_name   : 'ERC20',

	address         : '0x74140CC201bd8Dc46D7beD4dc074576d482605e7',
	contract_path   : ERC20_local_path,
	web3_http       : ALCHEMY_PRODUCTION.http,
	websocket       : ALCHEMY_PRODUCTION.websocket	

};









