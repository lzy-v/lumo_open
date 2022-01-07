/**
 * @Package: index.js
 * @Date   : Dec 15th, 2021
 * @Author : Xiao Ling   
 * 
*/


const functions = require("firebase-functions");
const express    = require('express');
const cors       = require('cors')({origin: true});
const path       = require('path');
const bodyParser = require('body-parser');


/******************************************************
	@web redirect
	//const path  = __dirname + '/views/';
******************************************************/

/**
 *
 * @use: init express and use `react-build`
 *       when deving: 
 *       		`npm start`
 *       when deploying
 * 
 *         1. open core.js and make sure you're deploying to the right place
 * 
 *		     2. cd to /web and do: `npm run build`
 *
 *		     3. cd to top level and do: `firebase serve` to confirm build is usable, go to localhost:5000
 *
 *         4. cd to functions and do
 *
 *             `firebase use` to check you're deploying to the right server
 *           
 *		     5. cd to functions and do: `firebase deploy`  
 *             
 * 
 *
 *	make sure your firebase.json look like this
 *  or express function will not map to react-app paths
 *  	```
 *		    "rewrites": [
 *  	      {
 *		        "source": "**",
 *		        "function": "app",
 *		      }
 *		    ]
 *		```
 *
 *	 @source:
 *		https://www.freecodecamp.org/news/how-to-build-a-todo-application-using-reactjs-and-firebase/
 *		https://flaviocopes.com/how-to-serve-react-from-same-origin/
 *
*/


/******************************************************
   @Hosted react website
******************************************************/

/**
 *
 * @use: point to web root
 * 
*/
const web_root = `client/build` 

/**
 *
 * `app` is global top level web app entry point
 * `appAPI` serves vendor APIs
 * 
*/ 
const app = express();

app.use(cors);
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

// Serve all static files of react-app
app.use(express.static(path.join(__dirname, web_root)));


/**
 *
 * Serve webroot
 * 
*/
app.get('*', (req, res) => {
	let p  = path.join(__dirname, web_root);
	let fp = path.join(p, "index.html");
	res.sendFile(fp);
});


// right now when you do this the other routes are not called
exports.app = functions.https.onRequest(app);













