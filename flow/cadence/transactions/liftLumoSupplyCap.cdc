import FungibleToken from "0x7f732e4481b89c1e";
import Lumo from "0x7f732e4481b89c1e";


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