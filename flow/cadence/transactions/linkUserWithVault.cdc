import NonFungible from "0x7f732e4481b89c1e";

transaction {
    prepare(acct: AuthAccount) {

        let collection <- NonFungible.createEmptyCollection()

        acct.save<@NonFungible.Collection>(<-collection, to: /storage/NFTCollection)

        log("Collection created for account 1")

        acct.link<&{NonFungible.NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)

        log("Capability created")
    }
} 