import NonFungible from "../contracts/NonFungible.cdc"

transaction {
    prepare(acct: AuthAccount) {

        let collection <- NonFungible.createEmptyCollection()

        acct.save<@NonFungible.Collection>(<-collection, to: /storage/NFTCollection)

        log("Collection created for account 1")

        acct.link<&{NonFungible.NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)

        log("Capability created")
    }
} 