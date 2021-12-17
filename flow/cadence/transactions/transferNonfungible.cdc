import NonFungible from "0x7f732e4481b89c1e";


transaction(receiver: Address, tokID: UInt64) {

    let transferToken: @NonFungible.NFT
    
    prepare(acct: AuthAccount) {

        let collectionRef = acct.borrow<&NonFungible.Collection>(from: /storage/NFTCollection)
            ?? panic("Could not borrow a reference to the owner's collection")

        self.transferToken <- collectionRef.withdraw(withdrawID: tokID)
    }
    
    execute {

        let recipient = getAccount(receiver)

        let receiverRef = recipient.getCapability<&{NonFungible.NFTReceiver}>(/public/NFTReceiver)
            .borrow()
            ?? panic("Could not borrow receiver reference")

        receiverRef.deposit(token: <-self.transferToken)

        log("NFT ID ${tokID} transferred from account 2 to account 1")
    }
}