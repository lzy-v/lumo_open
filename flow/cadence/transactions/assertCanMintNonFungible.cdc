import NonFungible from "../contracts/NonFungible.cdc"

transaction {

    let receiverRef: &{NonFungible.NFTReceiver}

    let minterRef: &NonFungible.NFTMinter

    prepare(acct: AuthAccount) {

        self.receiverRef = acct.getCapability<&{NonFungible.NFTReceiver}>(/public/NFTReceiver)
            .borrow()
            ?? panic("Could not borrow receiver reference")
        
        self.minterRef = acct.borrow<&NonFungible.NFTMinter>(from: /storage/NFTMinter)
            ?? panic("could not borrow minter reference")
    }

    execute {
        let newNFT <- self.minterRef.mintNFT()
        self.receiverRef.deposit(token: <-newNFT)
        log("NFT Minted and deposited to admin's Collection")
    }
}