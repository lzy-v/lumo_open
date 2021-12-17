import NonFungible from "0x7f732e4481b89c1e";

transaction {
    prepare(acct: AuthAccount) {
        if acct.borrow<&NonFungible.NFT>(from: /storage/NFT1) != nil {
            log("The token exists!")
        } else {
            log("ERROR: No token found!")
        }
    }
}    