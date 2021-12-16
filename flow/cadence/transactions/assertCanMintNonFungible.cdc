import NonFungible from "0x7f732e4481b89c1e (47a1d0b91c0b85215c51a55891f9fad0596022e1cc9018b15cf7bfb84770d048)";

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