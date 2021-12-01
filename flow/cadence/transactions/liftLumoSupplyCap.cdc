import FungibleToken from "../contracts/FungibleToken.cdc"
import Lumo from "../contracts/Lumo.cdc"


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