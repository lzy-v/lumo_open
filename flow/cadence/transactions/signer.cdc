transaction  {
	prepare(signer: AuthAccount){
		log("Signer.cdc called and this functions has been signed by:".concat(signer.address.toString()))
	}
}
