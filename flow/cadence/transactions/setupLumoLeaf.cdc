import LumoLeaf from './LumoLeaf'
import NonFungibleToken from "0x1d7e57aa55817448"


transaction {
    prepare(signer: AuthAccount) {

        // if the account doesn't already have a collection
        if signer.borrow<&LumoLeaf.Collection>(from: LumoLeaf.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- LumoLeaf.createEmptyCollection()
            
            // save it to the account
            signer.save(<-collection, to: LumoLeaf.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&LumoLeaf.Collection{NonFungibleToken.CollectionPublic, LumoLeaf.LumoLeafCollectionPublic}>(LumoLeaf.CollectionPublicPath, target: LumoLeaf.CollectionStoragePath)
        }
    }
}