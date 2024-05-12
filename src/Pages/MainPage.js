import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import BookList from "../Components/BookList";
import LabelBox from "../Components/LabelBox";
import './styles/MainPage.css'

const arr1 = [
    { name : '타이틀' , id : 'title', type: 'text'},
    { name : '줄거리' , id : 'summary', type: 'text'},
    { name : '릴리즈' , id : 'release', type: 'text'},
    { name : '저자' , id : 'author', type: 'text'},
    { name : 'ISBN' , id : 'ISBN', type: 'text'}
]

function MainPage () {
    const BASE_URL = 'http://localhost:4002'

    const [isLogin, setIsLogin] = useState(false)
    
    const userName = JSON.parse(localStorage.getItem('user'))
    const admin = JSON.parse(localStorage.getItem('admin'))
    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(()=>{
        userName && setIsLogin(true)
    })


    const book = async (title, summary, release, author, isbn, token) => {
        const bookJSON = await fetch(`${BASE_URL}/api/admins/book`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            method : 'POST',
            body : JSON.stringify({
                title, summary, release, author, isbn
            })
        })
        const book = await bookJSON.json()
        return book
    }

    const [viewer, setViewer] = useState(
        {addBook : '', view: '', history: ''}
    )
    
    const viewOption = (e) => {
        setViewer({[e.target.name]:'on'})
    }
    const { addBook, view, history } = viewer
    

    const [input, setInput] = useState()
    
    const valueExtractor = (e) => {
        let {id, value} = e.target
        setInput({...input, [id] : value })
    }

    const starter = async (e) => {
        e.preventDefault()
        const {title, summary, release, author, ISBN} = input
        let success = await book(title, summary, release, author, ISBN, token)
        if(success.code === 200){
            alert(success.msg)
        }else{
            alert(success.code + success.msg)
        }
    }

    const logoutCheck = (value) => {
        setIsLogin(value)
    }

    return(
        <>
            <Header userName={userName} admin={admin} isLogin={isLogin} logoutCheck={logoutCheck}/>
            {isLogin && 
            <div id="Main">
                <nav className="viewer-nav">
                    <ul>        
            {admin && <li><button name="addBook" onClick={viewOption}>책 추가</button></li>}
                        <li><button name="view" onClick={viewOption}>책 조회</button></li>
                        <li><button name="history" onClick={viewOption}>히스토리</button></li>
                    </ul>
                </nav>
                <div className="viewer-data">
                    {viewer && addBook && 
                        <LabelBox arr={arr1} addClass={'add-book'} handleChange={valueExtractor}
                        handleClick={starter}>완료</LabelBox>
                    }
                    {viewer && view && 
                        <BookList token={token} BASE_URL={BASE_URL}></BookList>
                    }
                </div>
            </div>}
        </>
    )
}

export default MainPage