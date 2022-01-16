import LumoLeaf from './LumoLeaf'
import NonFungibleToken from "0x1d7e57aa55817448"



// This transction uses the NFTMinter resource to mint a new NFT.
//
// It must be run with the account that has the minter resource
// stored at path /storage/NFTMinter.

transaction(address: Address) {

    // local variable for storing the minter reference
    let minter: &LumoLeaf.NFTMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&LumoLeaf.NFTMinter>(from: LumoLeaf.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // get the public account object for the recipient at address
        let recipient = getAccount(address)

        // borrow the recipient's public NFT collection reference
        let receiver = recipient
            .getCapability(LumoLeaf.CollectionPublicPath)!
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        // mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(recipient: receiver)
    }
}