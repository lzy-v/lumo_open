import Lumo from "0x7f732e4481b89c1e"


// This script returns the total amount of Kibble currently in existence.

pub fun main(): UFix64 {

    let supply = Lumo.totalSupply

    log(supply)

    return supply
}