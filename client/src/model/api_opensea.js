
/**
 * 
 * @Module: nonfungible token API
 * @Author: Xiao Ling
 * @Date  : 12/16/2021
 * @DOC   : https://docs.opensea.io/reference/retrieving-a-single-asset
 *          https://docs.metamask.io/guide/ethereum-provider.html#basic-usage
 * @TODO  : see escrow contract: https://docs.replit.com/tutorials/33-escrow-contract-with-solidity * 
 * 
*/


import axios from "axios";
import detectEthereumProvider from '@metamask/detect-provider';
import { doc, updateDoc } from "firebase/firestore"; 

const { 
	illValued,
	trivialString, 	
	trivialProps,
	swiftNow,
} = require('./utils')


const { 
	  vendorID
	, vendorSecret
	, POST_ENDPOINTS
	// , FLOW_NETWORK
	, fire_db
	, DbPaths
} = require('./core');




/******************************************************
	@Read external NFTs
******************************************************/	

		
/***
 *
 * @Use: query metamask for user's public key
 *
**/
async function queryMetaMask({ then }){

	if (illValued(then)){
		return;
	}

	const provider = await detectEthereumProvider()
	 
	if ( provider && !trivialProps(provider,'request') ) {
	 
		// Legacy providers may only have ethereum.sendAsync
		// const chainId = await provider.request({ method: 'eth_chainId' })

		// request access to user's account using provider client
		provider
			.request({ method: 'eth_requestAccounts' })
			.then( async (acct) => {

				if ( trivialProps(acct,'length') || acct.length === 0  ){

					then({ success: false, message: 'provider account length is zero', pk: "" })

				} else if ( trivialString(acct[0]) ){

					then({ success: false, message: 'provider account pk is trival string',  pk: "" })

				} else {

					// grab pk and assign lumo email to the user
					then({ success: true, message: 'found pk',  uid:"", pk: acct[0] })

				}

			})
			.catch((error) => {

				then({ success: false, message: `error requesting account: ${error.code}`, pk: "" })
			});

	} else {
	 
	  // if the provider is not detected, detectEthereumProvider resolves to null
		then({ success: false, message: `error detecting chain provider, metamask not installed`, pk: "" })
	}	

}

/***
 * 
 * @Use; fetch nft with `tokID` from `contractAddress`
 * @Doc: https://docs.opensea.io/reference/retrieving-a-single-asset
 * @consider: https://github.com/ringaile/escrow
 * 
 **/ 
async function fetch_nft_from_opensea({ tokID, contractAddress, then }){

	if (illValued(then)){
		return;
	}

	if ( trivialString(tokID) || trivialString(contractAddress) ){

		return then({ success: false, message: `invalid input value`, data: {} });
	}

    let url = `https://api.opensea.io/api/v1/asset/${contractAddress}/${tokID}/`;

	axios.get( url )
		.then(async res => {

			if ( trivialProps(res,'data') || illValued(res.data) ){

				then({
					success: false,
					message: `failed to fetched data from opensea`,
					image_preview_url: "",
					image_thumbnail_url: "",
					data: {},
				})

			} else {

				const { image_thumbnail_url,  image_preview_url, image_url } = res.data;

				then({
					success: true,
					message: `fetched data from opensea`,
					image_url: image_url,
					image_preview_url: image_preview_url,
					image_thumbnail_url: image_thumbnail_url,
					data: res.data ,
				})

			}
		});	

}



/**
 * 
 * @Use: check if the user owns this token
 * 
 */ 
async function doesUserOwnThisToken({ tokID, contractAddress, then }){

    if ( trivialString(tokID) || trivialString(contractAddress) ){

        then({ success: false, ownToken: false, message: `imporoper inputs`, data: {} })

    } else {

        // 1. connect with user's Metamask
        await queryMetaMask({ then: async({ success, message, pk }) => {

            if (!success || trivialString(pk)){

                return then({ success: false, ownToken: false, message: `no metamask found: ${message}`, data: {} });
            }

            // 2. query open sea 
            await fetch_nft_from_opensea({
                tokID : tokID,
                contractAddress : contractAddress, 
                then:  async ({ success, message, data }) => {

                    if ( !success || illValued(data) ){

                        return then({ success: false, ownToken: false, message: message, data: data })

                    } else {

                        const { owner } = data;

                        if ( trivialProps(owner,'address') || trivialString(owner.address) ){
                            return then({ success: false, ownToken: false, message: `malformed owner in opensea data`, data: data })
                        }

                        if ( owner.address === pk ){

                            then({ success: true, ownToken: true, message: `user does own this token`, data: data })

                        } else {

                            then({  success: false, ownToken: false, message: `user does not own this token`, data: data })
                        }


                    }

                }
            });

        }})        
    }

}


/******************************************************
	@fetch token as profile image
******************************************************/	

/**
 * 
 * @Use: use NFT as profile image
 *       if user own this token then
 *       save token image
 * 
 **/ 
async function save_nft_as_profile_image({ 
	userID,
	tokID, 
	contractAddress, 
	then 
}){

    if ( trivialString(tokID) || trivialString(contractAddress) || trivialString(userID) ){
        return then({ success: false, message: `invalid inputs: ${tokID}, ${contractAddress}` });
    }

    await doesUserOwnThisToken({
        tokID: tokID, 
        contractAddress: contractAddress,
        then: async ({ success, ownToken, message, data }) => {

        	if ( success && ownToken ){

        		const { image_preview_url, image_thumbnail_url, image_url } = data;

        		if (  !trivialString(image_preview_url) || !trivialString(image_thumbnail_url) || !trivialString(image_url) ){

        			let blob = {
        				timeStampLatest: swiftNow(),
						profile_image_preview_url: image_preview_url,
						profile_image_thumbnail_url: image_thumbnail_url,
						profile_image_url: image_url,
        			}

        			// problem: this is not updating
					const userRef = doc(fire_db, DbPaths.users, userID);
					await updateDoc(userRef, blob);

					then({ success: true, message: `saved NFT as profile image` })

        		} else {

        			return then({ success: false, message: `nft does not have preview image` })
        		}


        	} else if ( !success || ownToken === false ){

        		return then({ success: false, message: `FAILED to save token, user does not own token` })

        	} else if ( trivialProps(data,'owner') ){

        		return then({ success: false, message: `FAILED to wrap token, malformed data.owner field` })        		

            } else {

                then({  success: success, message: `failed to sumbit token: ${message}` })
            }


        }
    })

}

/******************************************************
	@Wrap opensea tokens
******************************************************/	

/**
 * 
 * @Use: user `userID` with `pk` send token `tokID` minted 
 *       on ERC-721 contract `contractAddress` to Lumo address
 *       after user has completed the operation, log the job
 *       into server
 *       On server end, the wrapped token will be created along
 *       with openSea metadata
*/ 
async function user_did_send_openSea_token_to_Lumo_address({ 

	// lumo
	userID, 
	parentTokID,

	// web3
	eth_tokID, 
	contractAddress, 
	user_pk, 

	// opensea
	openSeaCreatorAddress,
	openSeaOwnerAddressAtTimeOfWrap,
	image_preview_url,
	image_thumbnail_url,
	image_url,
	image_original_url,

	then
}){

	let bs = [
		trivialString(userID),
		trivialString(parentTokID),
		trivialString(eth_tokID),
		trivialString(contractAddress),
		trivialString(user_pk),
	]

	if ( bs.includes(true) ){
		return then({ success: false, message: `invalid input`, job: {} })
	}

	// log prompt for when the user sends the nft to address
	let prompt_blob = {

		// POST param
		userID       : userID,
		vendorID     : vendorID(),
		vendorSecret : vendorSecret,

		// eth data
		openSeaTokID    : eth_tokID,
		ownerPublicKey  : user_pk,
		openSeaContractAddress: contractAddress,

		// opensea data
		openSeaCreatorAddress           : openSeaCreatorAddress ?? "",
		openSeaOwnerAddressAtTimeOfWrap : openSeaOwnerAddressAtTimeOfWrap ?? "",
		image_preview_url               : image_preview_url ?? "",
		image_thumbnail_url             : image_thumbnail_url ?? "",
		image_url                       : image_url ?? "",
		image_original_url              : image_original_url ?? "",

		// lumo data
		parentTokID     : parentTokID,
	}

	// post wrap job to lumo-core server
	axios.post(POST_ENDPOINTS.log_opensea_nft_submission,prompt_blob)
		.then(async res => {

			if (trivialProps(res,'data')){
				return then({ success: false, message: `POST failed`})
			}

			const { success, message } = res.data;

			if ( success ){
				return then({ success: true, message: `POST success with message: ${message}` })
			} else {
				return then({ success: false, message: `POST failed with message: ${message}` })
			}
		})	
		.catch(e => {
			return then({ success: false, message: `post failed with error: ${e}` })
		})

}





/******************************************************
	@export
******************************************************/	



export {

	queryMetaMask,
	doesUserOwnThisToken,
	fetch_nft_from_opensea,
	save_nft_as_profile_image,
	user_did_send_openSea_token_to_Lumo_address,
}











