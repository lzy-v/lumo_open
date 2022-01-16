import LumoLeaf from './LumoLeaf'
import NonFungibleToken from "0x1d7e57aa55817448"



transaction(target: Address, tokID: UInt64) {
    prepare(signer: AuthAccount) {
        
        // get the recipients public account object
        let recipient = getAccount(target)

        // borrow a reference to the signer's NFT collection
        let collectionRef = signer.borrow<&LumoLeaf.Collection>(from: LumoLeaf.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")

        // borrow a public reference to the receivers collection
        let depositRef = recipient.getCapability(LumoLeaf.CollectionPublicPath)!.borrow<&{NonFungibleToken.CollectionPublic}>()!

        // withdraw the NFT from the owner's collection
        let nft <- collectionRef.withdraw(withdrawID: tokID)

        // Deposit the NFT in the recipient's collection
        depositRef.deposit(token: <-nft)
    }
}