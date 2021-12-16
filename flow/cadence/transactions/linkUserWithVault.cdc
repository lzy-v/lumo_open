import NonFungible from "0x7f732e4481b89c1e (47a1d0b91c0b85215c51a55891f9fad0596022e1cc9018b15cf7bfb84770d048)";

transaction {
    prepare(acct: AuthAccount) {

        let collection <- NonFungible.createEmptyCollection()

        acct.save<@NonFungible.Collection>(<-collection, to: /storage/NFTCollection)

        log("Collection created for account 1")

        acct.link<&{NonFungible.NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)

        log("Capability created")
    }
} 