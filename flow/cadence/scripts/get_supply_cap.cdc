import Lumo from "../contracts/Lumo.cdc"


// This script returns the total amount of Kibble currently in existence.

pub fun main(): UFix64 {

    let cap = Lumo.totalSupplyCap

    log(cap)

    return cap
}