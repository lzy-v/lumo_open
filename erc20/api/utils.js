/*
  @Package: utils.js
  @Date   : April 15th, 2021
  @Author : Xiao Ling   
*/


/******************************************************
  compensate for no typesystem
******************************************************/

exports.illValued = (x) => {
	if (x === null || x === undefined){
		return true 
	} else {
		return false
	}
}

exports.trivialString = (x) => {
	if (x === null || x === undefined || x === "" || x === " "){
		return true 
	} else {		
		return false
	}
}

exports.trivialProps = (props, fn) => {
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

exports.trivialObj = (obj) => {
	return (obj === undefined || obj === null || obj === {})
}

exports.trivialNum = (n) => {
	return (n === undefined || n === null || isNaN(n) )
}



/******************************************************
	@eth to wei
******************************************************/

exports.eth_to_wei = (eth) => {
	if (eth === null || eth === undefined || isNaN(eth)){
		return 0
	} else {
		return eth * 1000000000000000000
	}
}


exports.wei_to_eth_round = (wei) => {
	if (wei === null || wei === undefined || isNaN(wei)){
		return 0
	} else {
		return (wei/1000000000000000000).toFixed(4)
	}
}

exports.str_to_float = (str) => {
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

exports.str_to_int = (str) => {
	if (str === null || str === undefined || str.trim() === ""){
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

exports.rand_num = (min,max) => {
	return Math.random() * (max - min) + min;
}

/******************************************************
	time  
******************************************************/

// @Get now timestamp in seconds from 1972
exports.swiftNow = () => {
	return Math.round(Date.now()/1000)
}


// @Get now timestamp in seconds from 1972
exports.swiftPast = () => {
	let now = Math.round(Date.now()/1000)
	return now - now
}


// @Use: convert swift timestamp to millisecondsd since 1972
exports.fromSwiftTime = (t) => {
	return t * 1000
}

// @use: given swift timestamp, pretty print `MM DD YYYY HH:MM`	
exports.ppSwiftTime = (t) => {
	
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
exports.generatePassword = (email) => {  
	const prefix =  "64439638952027"
	const suffix = "1904383418681"
	const _root  = reverseString(email)
	return `${prefix}_${_root}_${suffix}`
}




/******************************************************
	utility functions
******************************************************/

function range(start, stop, step) {

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

exports.range = (a,b) => {
	return range(a,b,1)
}




