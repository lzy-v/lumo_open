/**
 * @Package: Chat.jsx
 * @Date   : Dec 29th, 2021
 * @Author : Xiao Ling   
 * @Docs:
 *   - chat style: https://codesandbox.io/s/material-ui-chat-drh4l?file=/src/App.js
 *   - chat full: https://github.com/Wolox/react-chat-widget
 *   - the console used: https://github.com/linuswillner/react-console-emulator
 *   - other console: https://github.com/webscopeio/react-console
 *	 - performant scrolling: https://www.npmjs.com/package/react-infinite-scroll-component
 *   - example scroll: https://codesandbox.io/s/yk7637p62z?file=/src/index.js
 *   - ref item in listview: https://pretagteam.com/question/how-to-set-ref-in-list-of-items-react-js
 *   - scrollIntoView w/o scrolling page: https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move
 *
*/


import React, {useEffect, useState, createRef} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import InfiniteScroll from 'react-infinite-scroll-component';

import ChatTextInput from "./ChatTextInput";
import { MessageLeft, MessageRight } from "./ChatMessage";
import AppSnackbar from './AppSnackbar';

import { COLORS, lorem } from './constants';
import lumo_red from './../assets/lumored.jpeg'
import punk from './../assets/cube2.png'
import { trivialString } from './../model/utils'  

const uuid = require('uuid');


/******************************************************
	@style
******************************************************/

const row_1 = 2.5;
const row_chat = 4



const refDivStyle = {
    width: '10px',
    height: '10px',
    marginTop: '70px',
}


const chat_container_style = {
    width: '40vw',
    height: `calc(100vh - 220px - ${row_chat}vh - ${row_1}vh)`,    
    // background: 'blue',
}

const useStyles = makeStyles((theme: Theme) => createStyles({

    container: {
        width: '40vw',
        height: `calc(100vh - 230px)`,
        position: 'relative',
        padding: theme.spacing(3),  
        // background: 'red'
    },

    row_1: {
        height: `${row_1}vh`,
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(3),

        color: 'white',
        fontFamily: 'NeueMachina-Bold',
        fontSize: '13px',
        filter: `brightness(0.8) invert(0.25)  blur(0.4px)`,        

        flex: 1,        
        textAlign: 'left',
        margin: 'auto',        
        display: 'flex',
        borderBottom  : `1.5px solid ${COLORS.white}`,        
    },    

    chatContainer: {
        width: '40vw',
        height: `calc(100vh - 240px - ${row_chat}vh - ${row_1}vh)`,    
        overflow: 'scroll',
    },

    textInputContainer :{
        width: '40vw',
        height: `${row_chat}vh`,
        position: 'absolute',
        bottom: 0,
        // background: 'purple'
    },

    blank : {
        paddingTop: theme.spacing(4),
    },


}));




/******************************************************
	@views
******************************************************/


// blank message
const BLANK = "_____";


function _generateArray(n) {
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = i;
    }
    return arr;
}


// @use: for demo purpose
export function ChatExample(props) {

    let _uid = 'mVmFWtXfmpQA9DKT8rMG1WOPHWz2'
    let uid = Math.random() > 0.5 ? _uid : uuid.v4()

	const dataSource = 
        _generateArray(300)
        .map(x => {
            return { ID: uuid.v4(), userID: uid, message:  lorem.generateSentences(3), timestamp: '123' };
        })

	return (
		<ChatView 
            {...props} 
            isAuthed
            adminUserID={uid} 
            dataSource={dataSource} 
            didPressEnter={() => {return}}
            handleTapIcon={() => {return}}
        />
	);
}


/**
 *
 * @Use select theappropriate chat bubble
 *
 **/
function BubbleView(props){

    const { item, isAuthed, handleTapIcon, adminUserID, handleClickImage } = props;
    const classes = useStyles();

    let preview_url = item['openSea_image_preview_url'] || item['openSea_image_thumbnail_url'] || item['openSea_image_url'] 

    function onClickImage(){
        if (typeof handleClickImage === 'function'){
            handleClickImage(item)
        }
    }

    function onTapIcon(){
        if (typeof handleTapIcon === 'function'){
            handleTapIcon(item)
        }
    }

    if ( item === BLANK ){

        return (
            <div className={classes.blank}/>
        )

    } else if (item.isAdminMessage){

        return (
            <MessageLeft
                avatarDisp
                isBlurred = {false}
                message={item.message}
                timestamp="MM/DD 00:00"
                photoURL={lumo_red}
                displayName={"Lumo"}
                preview_url = {preview_url} 
                item = {item}
                handleClickImage = {onClickImage}               
                handleTapIcon = {onTapIcon}
            />   
        )

    } else if ( item.userID === adminUserID ){
        return (
            <MessageRight
                avatarDisp
                isBlurred = {!isAuthed}
                message={item.message}
                timestamp="MM/DD 00:00"
                photoURL={trivialString(item.avatar) ? punk : item.avatar}
                displayName={item.userID}
                preview_url = {preview_url}
                item = {item}       
                handleClickImage = {onClickImage}             
                handleTapIcon = {onTapIcon}
            />          
        )
    } else {
        return (
            <MessageLeft
                avatarDisp
                isBlurred = {!isAuthed}
                message={item.message}
                timestamp="MM/DD 00:00"
                photoURL={trivialString(item.avatar) ? punk : item.avatar}
                displayName={item.name ?? ""}
                preview_url = {preview_url}     
                handleClickImage = {onClickImage}           
                handleTapIcon = {onTapIcon}
            />
        )
    }
}



/**
 *
 * @Use: render chat window
 * @Doc: https://github.com/mattmezza/react-beautiful-chat/blob/master/src/components/MessageList.js
 *       https://codesandbox.io/s/material-ui-chat-drh4l?file=/src/TextInput.js
 * 
**/
function ChatView(props) {

    const classes = useStyles();
    const { 
        dataSource, 
        didPressEnter, 
        showProgress,
        did_sync,
        reloadChat,
    } = props;    

    // states
    // const _dataSource = dataSource;
    // var _dataSource = [BLANK].concat(dataSource)
    const [showChat, setShowChat] = useState(false);
    const [_dataSource, setDataSource] = useState([])

    // scroll into view
    const scrollDivRef = createRef();

    function scrollToBottom(){
        scrollDivRef.current?.scrollIntoView({
            block   : 'nearest',
            inline  : 'start',
            behavior: 'smooth',
        })        
    }

    // add blank to front of the chat
    // so it displays with offset top
    useEffect(() => {
        scrollToBottom();
        let chats = [BLANK].concat(dataSource)
        setDataSource(chats)
    }, [reloadChat]);

    useEffect(() => {
        setShowChat(true)
    },[did_sync])
    
    return (
        <div className={classes.container}>

            {/* chat header */}
            <div className={classes.row_1}>
                <div>Level #0010110100 </div>
                <Box sx={{ flexGrow: 1 }} />
                <div> 23.42k LMO Staked </div>
            </div>

            {/* chat window */}
            { showChat ?

                <InfiniteScroll
                    next={() => { return }}
                    hasMore={false}
                    loader={<></>}
                    style={chat_container_style}
                    dataLength={_dataSource.length}
                >   
                    {_dataSource.map((item, index) => (
                        <BubbleView {...props} key={index} item={item}/>
                    ))}
                    <div style={refDivStyle} ref={scrollDivRef}/>
                </InfiniteScroll>

                :

                <div/>

            }

            {/* text input*/}
            <div className={classes.textInputContainer}>
                <ChatTextInput didPressEnter={didPressEnter} />
                { showProgress ? <LinearProgress color="error" /> : <></> }
            </div>

            {/* toast */}
            <AppSnackbar
                {...props}
                vertical={"bottom"}
                horizontal={"right"}
            />
        </div>
    )


}



export default ChatView;



