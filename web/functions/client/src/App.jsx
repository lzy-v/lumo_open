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
import HomePage from './pages/HomePage';
import NonfungibleTokenPage from './pages/NonfungibleTokenPage';
import NonFungibleToken  from './pages/token/NonfungibleTokenPage';


// showcase views
import {
    NonFungibleTokenView,
    NonFungibleTokenInsertionView,
    UserProfileView,
} from './components/NonFungibleTokenView';

import PreloadView from './components/PreloadView';

// models
import NonFungibleTokenCache from './model/nonfungibleTokenCache';
import UserModelCache from './model/userCache';
import Message_cache from './model/api_message';
import { trivialProps, trivialString } from './model/utils';

import App404 from './components/App404';
import burn_img from './assets/burn1.jpeg';
import blurred_cubes from './assets/blurred-cubes.png'

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

        // application DB singeltons
        nft_cache  : null,
        user_cache : null,        
        message_cache : null,
        imageIsReady: false,
        didSyncAuthState: false,
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

        // load big red gradient image first
        const img = new Image()
        img.src = burn_img;
        img.onload = () => {
            this.setState({ imageIsReady: true });
        }

        // sync to db
        await this.sync_db();
    }

    /**
     *
     * @Use: instantiate global singelton dbs
     *
     *
     **/
    sync_db = async () => {

        let user_cache  = new UserModelCache();
        let nft_cache   = new NonFungibleTokenCache();
        let message_cache  = new Message_cache(user_cache);

        await nft_cache.sync();
        await user_cache.sync();
        await message_cache.sync();

        this.setState({ 
            nft_cache: nft_cache, 
            user_cache: user_cache,
            message_cache: message_cache,
        });

        await this.onAuthStateChange({ then: async (uid) => {

            // console.log('-------------------------------')
            // if (uid === ""){
            //     // console.log("logged out")
            // } else {
            //     // console.log(`logged in as user: ${uid}`)
            // }
            // console.log('-------------------------------')

            if (!trivialString(uid)){
                await user_cache.setAdminUser({ to: uid });
                message_cache.setAdminUser({ to: uid })
                this.setState({ userID: uid })
            }

            this.setState({ didSyncAuthState: true })

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

    goRenderRoutes = () => {
        return (
            <Routes>

                <Route exact path = '/'  element={
                    <HomePage
                        {...this.props}
                        userid     = {this.state.userID}
                        nft_cache  = {this.state.nft_cache}
                        user_cache = {this.state.user_cache}        
                        message_cache = {this.state.message_cache}                
                    />
                }/>   

                <Route exact path = '/room/:tokID' element={
                    <NonfungibleTokenPage
                        {...this.props}
                        userid     = {this.state.userID}
                        nft_cache  = {this.state.nft_cache}
                        user_cache = {this.state.user_cache}        
                        message_cache = {this.state.message_cache}               
                    />
                }/>        

                <Route exact path = '/layoutToken'  element={
                    <NonFungibleTokenView
                        {...this.props}
                        userid     = {this.state.userID}
                        nft_cache  = {this.state.nft_cache}
                        user_cache = {this.state.user_cache}                        
                    />
                }/>
                <Route exact path = '/layoutInsertion'  element={
                    <NonFungibleTokenInsertionView
                        {...this.props}
                        userid     = {this.state.userID}
                        nft_cache  = {this.state.nft_cache}
                        user_cache = {this.state.user_cache}                        
                    />
                }/>


                <Route exact path = '/layoutProfile'  element={
                    <UserProfileView
                        {...this.props}
                        userid     = {this.state.userID}
                        nft_cache  = {this.state.nft_cache}
                        user_cache = {this.state.user_cache}                        
                    />
                }/>                              

                <Route exact path = '/404'  element={
                    <App404
                        {...this.props}
                        userid     = {this.state.userID}
                        nft_cache  = {this.state.nft_cache}
                        user_cache = {this.state.user_cache}                        
                    />
                }/>                              

                <Route exact path = '/:tokID'  element={
                    <NonFungibleToken 
                        {...this.props}
                        userid     = {this.state.userID}
                        nft_cache  = {this.state.nft_cache}
                        user_cache = {this.state.user_cache}                        
                    />
                }/>

            </Routes>
        )
    }


    render(){

        const { imageIsReady, didSyncAuthState } = this.state;
        if ( imageIsReady && didSyncAuthState ){

            return this.goRenderRoutes();

        } else {

            return (<PreloadView {...this.props}/>)
        }

    }    
}


export default App;



