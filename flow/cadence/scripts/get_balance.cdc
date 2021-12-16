import FungibleToken from "0x7f732e4481b89c1e (a5cc834a4a2d6dc1ec82d75a93b068d67f462569b3bacfe1673568c8ef9b88b7)"
import Lumo from "0x7f732e4481b89c1e (f1e3bba322e41a3ec1b2e0f5147d1e29c69447dba3c3036398b97f08b602dc8a)"

// This script returns an account's Kibble balance.

pub fun main(address: Address): UFix64 {
    let account = getAccount(address)
    
    let vaultRef = account.getCapability(Lumo.BalancePublicPath)!.borrow<&Lumo.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}