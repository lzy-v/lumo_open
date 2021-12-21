
/**
 * 
 * @Module: auth api
 * @Author: Xiao Ling
 * @Date  : 12/16/2021
 * @TODO  : see escrow contract: https://docs.replit.com/tutorials/33-escrow-contract-with-solidity
 * 
*/


import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

import { 
	getAuth, 
	signOut as firebaseSignOut, 
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth";

const { 
	trivialString, 	
	trivialProps,
	swiftNow,
	validateLoginData,
	generatePassword
} = require('./utils')


const { 
	  fire_db
	, vendorID
	, vendorSecret
	, POST_ENDPOINTS
	, DbPaths
} = require('./core');



/******************************************************
	@User Auth
******************************************************/	

const auth = getAuth();


/**
 * 
 * @Use: signout of current account
 * 
 **/ 
const signOut = () => {
	firebaseSignOut(auth).then(() => {
		console.log("\n\nsigned out")
	}).catch((error) => {
		console.log("\n\nfailed to signout")
	});
}

/**
 * 
 * @use: try login using these credentials, if fail then sign up new user
 * @Doc: https://firebase.google.com/docs/auth/web/password-auth
 * @Params:
 * 	name  :: String
 *  email :: String
 *  pk    :: String  - metamask address on ethreum mainnet
 * 
 **/ 
async function authenticate_user({name, email, pk, then}){

    const password = generatePassword(email)

    const newUser = {
        firstName: name,
        lastName : name,
        email    : email,
		password : password,
		confirmPassword: password
    };

    const { valid, errors } = validateLoginData(newUser); 

	if (!valid){

		return then({ success: false, message: errors, uid:""})

	} else {

		// try signing in first
		signInWithEmailAndPassword(auth, email, password)
	        .then( async (userCredential) => {

			    const user = userCredential.user;
			    let uid = user.uid ?? "";

				then({ success: true, message: 'logged in user', uid:uid})

				// update timestamp
				if (!trivialString(uid)){
					const userRef = doc(fire_db, DbPaths.users, uid);
					await updateDoc(userRef, {timeStampLatest: swiftNow()})
				}

	        })
	        .catch((error) => {

				// create new user
				createUserWithEmailAndPassword(auth,email,password)
					  .then( async (userCredential) => {

					    // Signed in 
					   	const user = userCredential.user;

						let blob = {
							userID           : user.uid,
							email            : email,
							metamask_ethereum_address: pk ?? "",
							timeStampLatest  : swiftNow(),
							timeStampCreated : swiftNow(),
						}	

						// create user
						if ( !trivialString(user.uid) ){

							// create client side user
							const userRef = doc(fire_db, DbPaths.users, user.uid);
							await setDoc(userRef, blob, {merge:true});

							// create server side user
							axios.post(POST_ENDPOINTS.createUserAccount, {
								userID       : user.uid,
								vendorID     : vendorID(),
								vendorSecret : vendorSecret,
								email        : email ?? "",
								metamask_ethereum_address: pk ?? "",
							}).then(async res => {

								if (trivialProps(res,'data')){
									return then({ success: false, message: `created new user, created client db blob, but not core db blob`, uid: user.uid })
								}

								const { success, message } = res.data;

								if ( success ){
									return then({ success: true, message: 'created new user, created client db blob, created core db blob', uid:user.uid})
								} else {
									return then({ success: false, message: `created new user, created client db blob, but not core db blob: ${message}`, uid: user.uid })
								}
							})	

						} else {

							then({ success: false, message: `created user but its user id is null: ${user.uid}`, uid: user.uid})
						}

					  })
					  .catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							then({ success: true, message: `failed to create user ${errorCode}: ${errorMessage}`, uid:""})
					  });	        	

	        })
	        .then((data) => {

	        	// new user has been created, create corresponding data in db
	        	if (  !trivialProps(data,'user') && !trivialProps(data.user,'uid') && !trivialString(data.user.uid) ){
	        		let token = data.user.uid
					then({ success: true, message: 'logged in user', uid:token})
		        // else user already exists and you just signed in
		        } else {
		        	let token = data
					then({ success: true, message: 'logged in user', uid:token});
		        }
	        })
	}

}


/******************************************************
	@export
******************************************************/	



export {

	// auth
	signOut,
	authenticate_user,
}











