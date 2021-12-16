import Lumo from "0x7f732e4481b89c1e (f1e3bba322e41a3ec1b2e0f5147d1e29c69447dba3c3036398b97f08b602dc8a)"


// This script returns the total amount of Kibble currently in existence.

pub fun main(): UFix64 {

    let cap = Lumo.totalSupplyCap

    log(cap)

    return cap
}