import NonFungible from "0x7f732e4481b89c1e (47a1d0b91c0b85215c51a55891f9fad0596022e1cc9018b15cf7bfb84770d048)";

transaction {
    prepare(acct: AuthAccount) {
        if acct.borrow<&NonFungible.NFT>(from: /storage/NFT1) != nil {
            log("The token exists!")
        } else {
            log("ERROR: No token found!")
        }
    }
}    