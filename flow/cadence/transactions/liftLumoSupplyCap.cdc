import FungibleToken from "0x7f732e4481b89c1e (a5cc834a4a2d6dc1ec82d75a93b068d67f462569b3bacfe1673568c8ef9b88b7)"
import Lumo from "0x7f732e4481b89c1e (f1e3bba322e41a3ec1b2e0f5147d1e29c69447dba3c3036398b97f08b602dc8a)";


transaction(amount: UFix64) {

    let tokenAdmin: &Lumo.Administrator

    prepare(signer: AuthAccount) {
        self.tokenAdmin = signer
            .borrow<&Lumo.Administrator>(from: Lumo.AdminStoragePath)
            ?? panic("Signer is not the token admin")
    }

    execute {

        let minter <- self.tokenAdmin.createNewMinter(allowedAmount: amount)
        minter.changeTotalSupplyCap(cap: amount)
        destroy minter
    }
}