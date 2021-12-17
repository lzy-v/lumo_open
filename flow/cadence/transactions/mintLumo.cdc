import FungibleToken from "0x7f732e4481b89c1e"
import Lumo from "0x7f732e4481b89c1e"


transaction(recipient: Address, amount: UFix64) {
    let tokenAdmin: &Lumo.Administrator
    let tokenReceiver: &{FungibleToken.Receiver}

    prepare(signer: AuthAccount) {
        self.tokenAdmin = signer
            .borrow<&Lumo.Administrator>(from: Lumo.AdminStoragePath)
            ?? panic("Signer is not the token admin")

        self.tokenReceiver = getAccount(recipient)
            .getCapability(Lumo.ReceiverPublicPath)!
            .borrow<&{FungibleToken.Receiver}>()
            ?? panic("Unable to borrow receiver reference")
    }

    execute {

        let minter <- self.tokenAdmin.createNewMinter(allowedAmount: amount)
        let mintedVault <- minter.mintTokens(amount: amount)

        self.tokenReceiver.deposit(from: <-mintedVault)

        destroy minter
    }
}