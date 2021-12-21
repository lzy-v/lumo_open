/**
 * @Package: App.jsx
 * @Date   : Dec 15th, 2021
 * @Author : Xiao Ling   
 *
*/



// react
import React, { Component } from 'react'
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged, getAuth } from 'firebase/auth';


// pages
import BurnPage from './pages/profile/BurnPage';
import NonFungibleToken  from './pages/token/NonfungibleTokenPage';
import SubmitNonFungibleToken from './pages/token/SubmitNonfungiblePage'

// models
import NonFungibleTokenCache from './model/nonfungibleTokenCache';
import UserModelCache from './model/userCache';

import { trivialProps, trivialString } from './model/utils';

/******************************************************
   @Global entry point
******************************************************/


/**
*
* @Use: app global navigation
* @Doc: https://reactrouter.com/docs/en/v6/api#routes-and-route
*
*/
class App extends Component {

    state = {
        userID     : "",
        nft_cache  : null,
        user_cache : null,        
    }

    /******************************************************
        @Listen for authentication
    ******************************************************/
    /**
     *
     * @Use: on mount, load db and authenticate
     *
    */
    async componentDidMount(){      

        let user_cache  = new UserModelCache();
        let nft_cache   = new NonFungibleTokenCache();

        await nft_cache.sync();
        await user_cache.sync();

        this.setState({ nft_cache: nft_cache, user_cache: user_cache });

        await this.onAuthStateChange({ then: async (uid) => {

            console.log('-------------------------------')
            if (uid === ""){
                console.log("logged out")
            } else {
                console.log(`logged in as user: ${uid}`)
            }
            console.log('-------------------------------')

            // let uid = '280289e3-a9e4-4cba-af51-032b6d348390';
            if (!trivialString(uid)){
                await user_cache.setAdminUser({ to: uid });
                this.setState({ userID: uid })
            }

        }});

    }

        
    /**
     * 
     * @Use: on auth state change, update `userID`
     *       and load user specific nft_cache   
     *
    **/
    onAuthStateChange = async ({ then }) => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => { 
            if ( !trivialProps(user,'uid') ){
                then(user.uid)
            } else {
                then("")
            }
        });        
    }    


    /******************************************************
        @routes
    ******************************************************/


    render(){
        return(
            <Routes>
                <Route exact path = '/:tokID'  element={
                    <NonFungibleToken 
                        {...this.props}
                        userID     = {this.state.userID}
                        nft_cache  = {this.state.nft_cache}
                        user_cache = {this.state.user_cache}                        
                    />
                }/>

                <Route exact path = '/submit/:tokID' element={
                    <SubmitNonFungibleToken 
                        {...this.props}
                        userID     = {this.state.userID}
                        nft_cache  = {this.state.nft_cache}
                        user_cache = {this.state.user_cache}
                />}/>                


                <Route exact path = '/burn' element={
                    <BurnPage 
                        {...this.props}
                        userID     = {this.state.userID}
                        nft_cache  = {this.state.nft_cache}
                        user_cache = {this.state.user_cache}
                />}/>                

            </Routes>
        )
    }
}


export default App;



