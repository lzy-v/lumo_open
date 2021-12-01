import NonFungible from "../contracts/NonFungible.cdc"

transaction {
    prepare(acct: AuthAccount) {
        if acct.borrow<&NonFungible.NFT>(from: /storage/NFT1) != nil {
            log("The token exists!")
        } else {
            log("ERROR: No token found!")
        }
    }
}    