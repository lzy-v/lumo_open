/**
 * @Package: LoginPage.jsx
 * @Date   : Jan 1st, 2022
 * @Author : Xiao Ling   
 *
 *
*/


import React, {useState} from 'react';
import DialogLogin from './../components/DialogLogin';
import { isEmail, validPassword } from './../model/utils';



/**
 *
 * @use: login component that validates
 *       login input and hand over the 
 *       valid email and password to parent class
 *
 **/
export default function LoginPage(props){  

    const { defaultEmail, onConfirm } = props;

    const [ headerValue, setHeaderValue ] = useState("Authenticate")
    const [ emailValue, setEmailValue ] = useState(defaultEmail)
    const [ passwordValue, setPasswordValue ] = useState("")
    const [ passwordError, setPasswordError ] = useState("")
    const [ emailError, setEmailError ] = useState("")

    function goHandleConfirm(){

        let { success, message } = validPassword(passwordValue)

        if ( !isEmail(emailValue) ){
            setEmailError("Please enter a valid email".toUpperCase());
        } else if ( !success ){
            setPasswordError(message.toUpperCase());
        } else {
            setEmailError("")
            setPasswordError("")
            setHeaderValue('Authenticating ...')
            onConfirm({ email: emailValue, password: passwordValue })
        }
    }    

    function goSetEmailValue(e){
        setHeaderValue('Authenticate')
        setEmailValue(e.target.value ?? "")
    }

    function goSetPasswordValue(e){
        setHeaderValue('Authenticate')
        setPasswordValue(e.target.value ?? "")
    }


    return (
        <DialogLogin
            {...props}
            headerValue = {headerValue}
            didChangeEmail = {goSetEmailValue}
            didChangePassword={goSetPasswordValue}
            emailValue = {emailValue}
            passwordValue = {passwordValue}                    
            emailError = {emailError}
            passwordError = {passwordError}
            handleConfirm = {goHandleConfirm}
        />     

    )

}