/* eslint-disable no-await-in-loop */

/** 
 * 
 * @Package: nft-test.js
 * @Date   : Nov 22nd, 2022
 * @Important: must set env. variable for public and private key of admin on local first. 
        ```
            firebase functions:config:set flow.address = "" flow.key = ""
            firebase functions:config:get
        ```
 * @test : firebase emulators:start --only functions
 *         flow emulator -v
 *         do not do: npm run test
 *         do: yarn test
 *         to initate test:
 *              - https://github.com/onflow/flow-js-testing/blob/master/docs/install.md
 *  
 * 
 *        `cd`  into the test directory and do `yarn test`
 *         note make sure `flow emulator -v` is not running
 * 
 * 
 * @Source: 
 *  - https://forum.onflow.org/t/request-for-best-practices-re-wallet-account-creation-server-side/446
 *  - https://forum.onflow.org/t/differences-between-js-and-go-sdk/344/3
 *  - https://github.com/onflow/flow-js-testing/blob/master/docs/install.md
 *  - https://jestjs.io/docs/getting-started
 *  - https://github.com/onflow/flow-js-testing/blob/0b920c8fd24faa7e47c97cb44e2ba748a942f9b6/docs/emulator.md
 *
*/


// const { getAdminAddress, configLocal, configTestNet } = require("./../scripts/core");

const { 
    emulator, 
    init, 
    mintFlow,
    getAccountAddress, 
    executeScript, 
    shallPass, 
    shallResolve, 
    shallRevert,
    deployContractByName,
    sendTransaction
} = require("flow-js-testing");

const path = require('path');


/******************************************************
    @functions account
******************************************************/


/**
 * @Use: get admin address
 * 
 */ 
async function getAdminAddress(){
    return getAccountAddress("Alice")
}


// UFix64 values shall be always passed as strings
function toUFix64(value){
    const UFIX64_PRECISION = 8;
    return value.toFixed(UFIX64_PRECISION)
}



/******************************************************
    @functions Nonfungible
******************************************************/


/**
 * 
 * @Use: deploy non-fungible contract
 * 
 */ 
async function deployNonFungible(){

    const admin = await getAdminAddress() 
    await mintFlow(admin, "10.0");
    return await deployContractByName({ to: admin, name: "NonFungible" });
};

/**
 * 
 * @Use: link `acct` with vault
 * 
 */ 
async function linkNonFungible({ acct }){

    return sendTransaction({
        name: "linkUserWithVault",
        signers: [acct]
    })        
}


/**
 * 
 * @Use: mint a nonfungible token
 * 
 */ 
async function mintNonFungible({ acct }){

    return sendTransaction({
        name: "assertCanMintNonFungible",
        signers: [acct]
    })    
}


/*
 * Returns the number of Kitty Items in an account's collection.
 * @param {string} account - account address
 * @throws Will throw an error if execution will be halted
 * @returns {UInt64}
 * */
async function getNonFungibleCount({ acct }){
    return executeScript( "get_collection_length", [acct] )
};



/*
 * Transfers  NFT with id equal **itemId** from **sender** account to **recipient**.
 * @param {string} sender - sender address
 * @param {string} receiver - receiver address
 * @param {UInt64} tokId - id of the item to transfer
 * @throws Will throw an error if execution will be halted
 * @returns {Promise<*>}
 * */

async function transferNonfungible ({ sender, receiver, tokId }){

    return sendTransaction({
        name: "transferNonfungible",
        args: [receiver, tokId],
        signers: [sender]
    })        
};


/******************************************************
    @Functions Lumo
******************************************************/

/**
 * @Use; deploy fungible token and lumo contract
 * 
*/ 
async function deployLumo(){
    const admin = await getAdminAddress() 
    await mintFlow(admin, "10.0");
    return await deployContractByName({ to: admin, name: "Lumo" });
};

/*
 * Setups Lumo Vault on account and exposes public capability.
 * @param {string} account - account address
 * @throws Will throw an error if transaction is reverted.
 * @returns {Promise<*>}
 * */
// export const linkLumo = async (account) => {
async function linkLumo({ acct }){
    return sendTransaction({
        name: "linkUserWithLumo",
        signers: [acct]
    })           
};

/*
 * Returns Lumo balance for **account**.
 * @param {string} account - account address
 * @throws Will throw an error if execution will be halted
 * @returns {UFix64}
 * */
async function getLumoBalance({ acct }){
    return executeScript( "get_balance", [acct] )
};

/*
 * Returns Lumo supply.
 * @throws Will throw an error if execution will be halted
 * @returns {UFix64}
 * */
async function getLumoSupply(){
    return executeScript( "get_supply" )
};

/*
 * Returns Lumo supply cap
 * @throws Will throw an error if execution will be halted
 * @returns {UFix64}
 * */
async function getLumoSupplyCap(){
    return executeScript( "get_supply_cap" )
};


/*
 * Mints **amount** of Lumo tokens and transfers them to recipient.
 * @param {string} recipient - recipient address
 * @param {string} amount - UFix64 amount to mint
 * @throws Will throw an error if transaction is reverted.
 * @returns {Promise<*>}
 * */
// export const mintLumo = async (recipient, amount) => {
async function mintLumo({ acct, amount }){

    // const KittyAdmin = await getKittyAdminAddress();
    const admin = await getAdminAddress();

    return sendTransaction({
        name: "mintLumo",
        args: [acct, amount],
        signers: [admin]
    })            
};



/*
 * Transfers **amount** of Lumo tokens from **sender** account to **recipient**.
 * @param {string} sender - sender address
 * @param {string} recipient - recipient address
 * @param {string} amount - UFix64 amount to transfer
 * @throws Will throw an error if transaction is reverted.
 * @returns {Promise<*>}
 * */
// export const transferLumo = async (sender, recipient, amount) => {
async function transferLumo({ sender, receiver, amount }){

    return sendTransaction({
        name: "transferLumo",
        args: [amount, receiver],
        signers: [sender]
    })       

};

/*
 * lift **cap** of Lumo tokens 
 * @param {string} sender - sender address
 * @param {string} cap - UFix64 amount to transfer
 * @throws Will throw an error if transaction is reverted.
 * @returns {Promise<*>}
 * */
async function liftLumoSupplyCap({ acct, cap }){

    return sendTransaction({
        name: "liftLumoSupplyCap",
        args: [cap],
        signers: [acct]
    })       

};


/******************************************************
    @test
******************************************************/

// Increase timeout if your tests failing due to timeout
jest.setTimeout(10000);


/**
 * 
 * @Use: test lumo token
 * 
 */ 
describe("lumo-test", () => {

    beforeEach(async () => {

        const basePath = path.resolve(__dirname, "../cadence"); 
        const port = 8080; 
        const logging = false;

        await init(basePath, { port });
        return emulator.start(port, logging);

    });


    // Stop emulator, so it could be restarted
    afterEach(async () => {
        return emulator.stop();
    });


    it("shall have initialized supply field correctly", async () => {

        // Deploy contract
        await shallPass(deployLumo());

        await shallResolve(async () => {
            const supply = await getLumoSupply();
            expect(supply).toBe(toUFix64(0));
        });
    });

    it("shall be able to create empty Vault that doesn't affect supply", async () => {
       
        // Setup
        await deployLumo();
        const bob =  await getAccountAddress("bob")
        await shallPass(linkLumo({ acct: bob }))

        await shallResolve(async () => {
            const supply = await getLumoSupply()
            const bal    = await getLumoBalance({ acct: bob }) 
            expect(supply).toBe(toUFix64(0));
            expect(bal).toBe(toUFix64(0));
        });
    });    

    it("shall not be able to mint zero tokens", async () => {

        // Setup
        await deployLumo();
        const bob =  await getAccountAddress("bob")
        await linkLumo({ acct: bob })

        // Mint instruction with amount equal to 0 shall be reverted
        await shallRevert(mintLumo({ acct: bob, amount: toUFix64(0) }))

    });   

    it("shall mint tokens, deposit, and update balance and total supply", async () => {

        // Setup
        await deployLumo();
        const bob =  await getAccountAddress("bob")
        await linkLumo({ acct: bob })

        const amount = toUFix64(50);

        // Mint lumo tokens for bob
        await shallPass(mintLumo({ acct: bob, amount: amount }))

        // check balance increase and supply increase
        await shallResolve(async () => {

            const balance = await getLumoBalance({ acct: bob })
            expect(balance).toBe(amount);

            // Check lumo supply to equal amount
            const supply = await getLumoSupply();
            expect(supply).toBe(amount);
        });
    });

    it("shall not be able to withdraw more than the balance of the Vault", async () => {

        // Setup
        await deployLumo();
        const admin = await getAdminAddress();
        const bob   = await getAccountAddress("bob");
        await linkLumo({ acct: admin })
        await linkLumo({ acct: bob })

        // Set amounts
        const amount = toUFix64(1000);
        const overflowAmount = toUFix64(30000);

        // Mint instruction shall resolve
        await shallResolve( mintLumo({ acct: admin, amount: amount }) )

        // Transaction shall revert because of over flow
        await shallRevert( transferLumo({ sender: admin, receiver: bob, amount: overflowAmount })  )

        // Balances shall be intact
        await shallResolve(async () => {

            const bobBal = await getLumoBalance({ acct: bob }) 
            expect(bobBal).toBe(toUFix64(0));

            const adminBal = await getLumoBalance({ acct: admin }) 
            expect(adminBal).toBe(amount);
        });
    });    


    it("shall be able to withdraw and deposit tokens from a Vault", async () => {

        // setup
        await deployLumo();
        const admin = await getAdminAddress();
        const bob   = await getAccountAddress("bob");
        await linkLumo({ acct: admin })
        await linkLumo({ acct: bob })

        // mint
        const amount = toUFix64(1000);
        const decr   = toUFix64(200);
        const delta  = toUFix64(1000-200);
        await mintLumo({ acct: admin, amount: amount })

        await shallPass( transferLumo({ sender: admin, receiver: bob, amount: decr })  )

        // Balances shall have changed
        await shallResolve(async () => {

            // bob receive
            const bobBal = await getLumoBalance({ acct: bob }) 
            expect(bobBal).toBe(decr);

            // admin give
            const adminBal = await getLumoBalance({ acct: admin }) 
            expect(adminBal).toBe(delta);

            // total supply not changed
            const supply = await getLumoSupply();
            expect(supply).toBe(amount)
       

        });        

    });


    it("shall not be able to mint over the supply cap", async () => {

        // Setup
        await deployLumo();
        const admin = await getAdminAddress();
        await linkLumo({ acct: admin })

        // Set amounts
        const supplyCap = toUFix64(200000000);
        const overflowAmount = toUFix64(1);

        // Mint instruction shall resolve
        await shallResolve( mintLumo({ acct: admin, amount: supplyCap }) )

        // mint more shall fail
        await shallRevert( mintLumo({ acct: admin, amount: overflowAmount }) )

    })

    it("shall be able to lift the supply cap", async () => {

        // Setup
        await deployLumo();
        const admin = await getAdminAddress();
        await linkLumo({ acct: admin })

        // Set amounts
        const amt           = toUFix64(30);
        const prevSupplyCap = toUFix64(200000000);
        const amt_lifted    = toUFix64(400000000)
        const newSupplyCap  = toUFix64(500000000);
        const exceedSupplyCap = toUFix64(500000001);

        // lift to zero shall fail
        await shallRevert( liftLumoSupplyCap({ acct: admin, cap: toUFix64(0) }) )

        // supply cap shall be unchanged
        await shallResolve(async () => {
            const _cap = await getLumoSupplyCap();
            expect(_cap).toBe( prevSupplyCap )
        });


        // shall be able to mint
        await shallPass(mintLumo({ acct: admin, amount: amt }))

        // lift to <= amt shall fail
        await shallRevert( liftLumoSupplyCap({ acct: admin, cap: amt }) )

        // lift instruction shall resolve
        await shallResolve( liftLumoSupplyCap({ acct: admin, cap: newSupplyCap }) )

        // supply cap shall be lifted
        await shallResolve(async () => {
            const _cap = await getLumoSupplyCap();
            expect(_cap).toBe( newSupplyCap );
        });

        // shall be able to mint under new cap
        await shallResolve(  mintLumo({ acct: admin, amount: amt_lifted }) );

        // shall not be able to mint over new cap
        await shallRevert(  mintLumo({ acct: admin, amount: exceedSupplyCap }) );

    })    

});


/**
 * 
 * @Use: test nonfungible token suite
 * 
*/ 
describe("nft-test", () => {

    beforeEach(async () => {

        // Setting logging flag to true will pipe emulator output to console

        const basePath = path.resolve(__dirname, "../cadence"); 
        const port = 8080; 
        const logging = false;

        await init(basePath, { port });
        return emulator.start(port, logging);

    });


    // Stop emulator, so it could be restarted
    afterEach(async () => {
        return emulator.stop();
    });


    test("getAdmin", async () => {
        const admin = await getAdminAddress() 
        console.log("Admin: ", admin)
    });

    test("signer", async () => {

        const admin = await getAdminAddress() 
        emulator.setLogging(true)
        await sendTransaction({
            name: "signer",
            signers: [admin]
        })
    });

    test("can deploy contract", async () => {
        await deployNonFungible()
    });

    // @use:  assert can deploy contract
    test("deployed contract exits", async () => {

        emulator.setLogging(true)

        const admin = await getAdminAddress() 
        await deployNonFungible()

        await sendTransaction({
            name: "assertNonFungibleExist",
            signers: [admin]
        })
    });


    // @use: assert can mint nonfungible to my collection
    it("shall be able to mint a NonFungible to my collection", async () => {

        emulator.setLogging(true)
        await deployNonFungible()
        let admin = await getAdminAddress()
        await shallPass(mintNonFungible({ acct: admin }));

    });


    // @use: assert can link another account to vault resource
    it("shall be able to create a new empty NFT Collection for bob", async () => {

        let bob = await getAccountAddress("bob")
        await deployNonFungible()
        await linkNonFungible({ acct: bob })

        // shall be able te read bob collection and ensure it's emptya
        await shallResolve(async () => {
            const itemCount = await getNonFungibleCount({ acct: bob });
            expect(itemCount).toBe(0);
        });        

    });


    it("shall not be able to withdraw an NFT that doesn't exist in a collection", async () => {

        // Setup
        await deployNonFungible()
        const bob  = await getAccountAddress("bob");
        const eve  = await getAccountAddress("eve");
        await linkNonFungible({ acct: bob })
        await linkNonFungible({ acct: eve })

        // Transfer transaction shall fail for non-existent item
        await shallRevert(transferNonfungible({ sender: bob,  receiver: eve,  tokId: 1 }));
    });


    it("shall be able to withdraw an NFT and deposit to another accounts collection", async () => {

        // setup
        await deployNonFungible();

        let admin  = await getAdminAddress();
        const bob  = await getAccountAddress("bob");

        await linkNonFungible({ acct: bob })
        await shallPass(mintNonFungible({ acct: admin }));

        console.log(admin, bob)

        // Transfer transaction shall pass
        await shallPass(transferNonfungible({ sender: admin, receiver:bob, tokId: 1 }));

    });    
})



























