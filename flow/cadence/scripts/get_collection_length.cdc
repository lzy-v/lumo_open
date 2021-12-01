import NonFungible from "../contracts/NonFungible.cdc"

// This script returns the size of an account's KittyItems collection.

pub fun main(address: Address): Int {

    let account = getAccount(address)

    let capability = account.getCapability(/public/NFTReceiver)

    let ref = capability.borrow<&{NonFungible.NFTReceiver}>()
        ?? panic("Could not borrow account receiver reference")

    log( ref.getIDs() )

    return ref.getIDs().length

}
