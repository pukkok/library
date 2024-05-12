import React, { useEffect, useState } from "react";
import LabelBox from "../Components/LabelBox";

const arr1 = [
    { id: 'id' , type: 'text', name : 'id'},
    { id: 'pw' , type: 'password', name : 'password'}
]

function LoginPage () {

    const BASE_URL = 'http://localhost:4002'

    const [input, setInput] = useState({})

    const login = async (userId, password) => {
        const userJSON = await fetch(`${BASE_URL}/api/users/login`, {
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({
               userId, password
            })
        })
        const user = await userJSON.json()
       return user
    }

    const valueExtractor = (e) => {
        let {name, value} = e.target
        setInput({...input, [name] : value })
    }

    const starter = async (e) => {
        e.preventDefault()
        const { id, password } = input
        
        let success = await login(id, password)
        if(success.code === 200){
            localStorage.setItem('token', JSON.stringify(success.token))
            localStorage.setItem('admin', JSON.stringify(success.isAdmin))
            localStorage.setItem('user', JSON.stringify(success.userId))
            alert('로그인 되었습니다.')
            window.close()
            window.opener.location.reload()
        }else{
            alert(success.msg)
        }
    }

    return(
        <div id="Login">
            <h1>로그인</h1>
            <LabelBox handleClick={starter} handleChange={valueExtractor} 
            addClass={'login-form'} arr={arr1}>로그인</LabelBox>
        </div>
    )
}

export default LoginPage