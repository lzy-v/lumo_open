import NonFungible from "0x7f732e4481b89c1e (47a1d0b91c0b85215c51a55891f9fad0596022e1cc9018b15cf7bfb84770d048)";

// This script returns the size of an account's KittyItems collection.

pub fun main(address: Address): Int {

    let account = getAccount(address)

    let capability = account.getCapability(/public/NFTReceiver)

    let ref = capability.borrow<&{NonFungible.NFTReceiver}>()
        ?? panic("Could not borrow account receiver reference")

    log( ref.getIDs() )

    return ref.getIDs().length

}
