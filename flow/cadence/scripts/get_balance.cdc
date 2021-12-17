import FungibleToken from "0x7f732e4481b89c1e"
import Lumo from "0x7f732e4481b89c1e"

// This script returns an account's Kibble balance.

pub fun main(address: Address): UFix64 {
    let account = getAccount(address)
    
    let vaultRef = account.getCapability(Lumo.BalancePublicPath)!.borrow<&Lumo.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}