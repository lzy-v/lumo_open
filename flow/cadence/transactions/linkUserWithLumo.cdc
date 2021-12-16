import FungibleToken from "0x7f732e4481b89c1e (a5cc834a4a2d6dc1ec82d75a93b068d67f462569b3bacfe1673568c8ef9b88b7)"
import Lumo from "0x7f732e4481b89c1e (f1e3bba322e41a3ec1b2e0f5147d1e29c69447dba3c3036398b97f08b602dc8a)";


// This transaction is a template for a transaction
// to add a Vault resource to their account
// so that they can use the Kibble

transaction {

    prepare(signer: AuthAccount) {

        if signer.borrow<&Lumo.Vault>(from: Lumo.VaultStoragePath) == nil {
            // Create a new Kibble Vault and put it in storage
            signer.save(<-Lumo.createEmptyVault(), to: Lumo.VaultStoragePath)

            // Create a public capability to the Vault that only exposes
            // the deposit function through the Receiver interface
            signer.link<&Lumo.Vault{FungibleToken.Receiver}>(
                Lumo.ReceiverPublicPath,
                target: Lumo.VaultStoragePath
            )

            // Create a public capability to the Vault that only exposes
            // the balance field through the Balance interface
            signer.link<&Lumo.Vault{FungibleToken.Balance}>(
                Lumo.BalancePublicPath,
                target: Lumo.VaultStoragePath
            )
        }
    }
}


