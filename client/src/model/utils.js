/*
  @Package: utils.js
  @Date   : Dec 16th, 2021
  @Author : Xiao Ling   
*/


/******************************************************
 print
******************************************************/

const print = (xs) => {
	if (Array.isArray(xs)){
		var str = ""
		for (let x of xs){
			str = `${str} ${x}`
		}
		console.log(`\n\n ${str} \n\n`)	
	} else {
		console.log(`\n\n ${xs} \n\n`)	
	}
}

/******************************************************
  compensate for no typesystem
******************************************************/

const illValued = (x) => {
	if (x === null || x === undefined){
		return true 
	} else {
		return false
	}
}

const trivialString = (x) => {
	if (x === null || x === undefined || x === "" || x === " "){
		return true 
	} else {		
		return false
	}
}

const trivialProps = (props, fn) => {
	if (props === null || props === undefined || props === {} ){
		return true
	} else if ( fn === null || fn === undefined || fn === "" ){
		return true
	} else if ( props[fn] === null || props[fn] === undefined ) {
		return true
	} else {
		return false
	}
}

const trivialObj = (obj) => {
	return (obj === undefined || obj === null || obj === {})
}

const trivialNum = (n) => {
	return (n === undefined || n === null || isNaN(n) )
}


const trivialArray = (xs) => {
	return (xs === undefined || xs === null || Array.isArray(xs) === false)
}



/******************************************************
	@eth to wei
******************************************************/

const eth_to_wei = (eth) => {
	if (eth === null || eth === undefined || isNaN(eth)){
		return 0
	} else {
		return eth * 1000000000000000000
	}
}


const wei_to_eth_round = (wei) => {
	if (wei === null || wei === undefined || isNaN(wei)){
		return 0
	} else {
		return (wei/1000000000000000000).toFixed(4)
	}
}

const str_to_float = (str) => {
	if (str === null || str === undefined || str.trim() === ""){
		return 0
	} else {
		let num = parseFloat(str,10)
		if ( isNaN(num) ){
			return 0
		} else {
			return num
		}
	}
}

const str_to_int = (str) => {

	if (Number.isInteger(str)){
		return str
	} else if (str === null || str === undefined || str.trim() === ""){
		return 0
	} else {
		let num = parseInt(str)
		if ( isNaN(num) ){
			return 0
		} else {
			return num
		}
	}
}


const str_to_boolean = (str) => {
	if (typeof(str) === "string"){
		return str === "true"
	} else {
		return false
	}
}

const rand_num = (min,max) => {
	return Math.random() * (max - min) + min;
}

const force_to_num = (n, baseline) => {
	let b = (isNaN(baseline) || baseline === undefined || baseline === null ) ? 0 : Number(baseline)
	if (isNaN(n)){
		return b 
	} else {
		if (typeof n === 'number') {
			return Number(n)
		} else {
			return b
		}
	}
}

/******************************************************
	time  
******************************************************/

// @Get now timestamp in seconds from 1972
const swiftNow = () => {
	return Math.round(Date.now()/1000)
}


// @Get now timestamp in seconds from 1972
const swiftPast = () => {
	let now = Math.round(Date.now()/1000)
	return now - now
}


// @Use: convert swift timestamp to millisecondsd since 1972
const fromSwiftTime = (t) => {
	return t * 1000
}

// @use: given swift timestamp, pretty print `MM DD YYYY HH:MM`	
const ppSwiftTime = (t) => {
	
	let dt = new Date(t * 1000);

	let datetime = dt.toDateString();
	let time = dt.toLocaleTimeString();

	var datetime_ls = datetime.split(" ");
	datetime_ls.shift()
	let prefix = datetime_ls.join(" ")

	return `${prefix}, ${time}`
}



/******************************************************
	string
******************************************************/

const reverseString = (str) => {
	var newString = "";
	for (var i = str.length - 1; i >= 0; i--) {
		newString += str[i];
	}
	return newString;
}


// @use: dev mode dummy user.
const generatePassword = (email) => {  
	return email;
}


function numHex(s){

    var a = s.toString(16);
    if ((a.length % 2) > 0) {
        a = "0" + a;
    }
    return a;
}

function strHex(s){

    var a = "";
    for (var i=0; i<s.length; i++) {
	    	// let c = s.charCodeAt(i)
        a = a + numHex(s.charCodeAt(i));
    }
    
    return a;
}



/******************************************************
	email
******************************************************/


const _isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};


const isEmail = (email) => {
	return _isEmail(email)
};

const isEmpty = (string) => {
	if (string === null || string === undefined || string === ""){
		return true
	} else if (string.trim() === ''){
		return true
	} else {
		return false;
	}
};

const validateLoginData = (data) => {
   let errors = {};
   if (isEmpty(data.email)) errors.email = 'Must not be empty';
   if (isEmpty(data.password)) errors.password = 'Must not be  empty';
   return {
	   errors,
	   valid: Object.keys(errors).length === 0 ? true : false
	};
};


const validateSignUpData = (data) => {

  let errors = {};

  if (isEmpty(data.email)) {
	errors.email = 'Must not be empty';
  } 
  else if (!_isEmail(data.email)) {
	errors.email = 'Must be valid email address';
  }

  if (isEmpty(data.firstName)) errors.firstName = 'Must not be empty';
  if (isEmpty(data.lastName)) errors.lastName = 'Must not be empty';

  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';


  return {
	errors,
	valid: Object.keys(errors).length === 0 ? true : false
  };
};



/******************************************************
	credit card number
******************************************************/

function AmexCardnumber(inputtxt) {
  var cardno = /^(?:3[47][0-9]{13})$/;
  return cardno.test(inputtxt);
}

function VisaCardnumber(inputtxt) {
  var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  return cardno.test(inputtxt);
}

function MasterCardnumber(inputtxt) {
  var cardno = /^(?:5[1-5][0-9]{14})$/;
  return cardno.test(inputtxt);
}

function DiscoverCardnumber(inputtxt) {
  var cardno = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  return cardno.test(inputtxt);
}

function DinerClubCardnumber(inputtxt) {
  var cardno = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
  return cardno.test(inputtxt);
}

function JCBCardnumber(inputtxt) {
  var cardno = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
  return cardno.test(inputtxt);
}

function IsValidCreditCardNumber(cardNumber) {

  var cardType = '';
  if (VisaCardnumber(cardNumber)) {
    cardType = "visa";
  } else if (MasterCardnumber(cardNumber)) {
    cardType = "mastercard";
  } else if (AmexCardnumber(cardNumber)) {
    cardType = "americanexpress";
  } else if (DiscoverCardnumber(cardNumber)) {
    cardType = "discover";
  } else if (DinerClubCardnumber(cardNumber)) {
    cardType = "dinerclub";
  } else if (JCBCardnumber(cardNumber)) {
    cardType = "jcb";
  } else {
  	return ''
  }

  return cardType;
}


const validCrediCardNumber = card => {
	return IsValidCreditCardNumber(card) !== ''
}


const validCreditCardExpiration = exp => {

	if (exp === null || exp === undefined || exp === '' ){
		return false
	} else if (exp.length !== 4 ){
		return false
	} else {

		let _exp = `${exp}`
		let mo = _exp.substring(0,2)
		let yr = _exp.slice(-2)

		var today, someday;
		var exMonth = parseInt(mo)
		var exYear  = parseInt(yr) + 2000
		today   = new Date();
		someday = new Date();
		someday.setFullYear(exYear, exMonth, 1);

		if (someday < today) {
			return false
		} else {
			return true
		}
	}

}


const validCreditCardCVC = exp => {

	if (exp === null || exp === undefined || exp === '' ){
		return false
	} else if (exp.length !== 3 ){
		return false
	} else {
		return true
	}

}


/******************************************************
	other utility functions
******************************************************/

function _range(start, stop, step) {

	if (stop < start){
		return []
	} else {
	    var a = [start], b = start;
	    while (b < stop) {
	        a.push(b += step || 1);
	    }
	    return a;
	}
}

const range = (a,b) => {
	return _range(a,b,1)
}

export {
    print
	, illValued
	, trivialString
	, trivialProps
	, trivialObj
	, trivialNum
	, trivialArray
	, eth_to_wei
	, wei_to_eth_round
	, str_to_float
	, str_to_int
	, str_to_boolean
	, rand_num
	, force_to_num
	, swiftNow
	, swiftPast
	, fromSwiftTime
	, ppSwiftTime
	, reverseString
	, generatePassword
	, numHex
	, strHex
	, isEmail
	, isEmpty
	, validateLoginData
	, validateSignUpData
	, validCrediCardNumber
	, validCreditCardExpiration
	, validCreditCardCVC
	, range
}


