import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import BookList from "../Components/BookList";
import LabelBox from "../Components/LabelBox";
import BorrowedBook from "../Components/BorrowedBook";
import History from "../Components/History";
import './styles/MainPage.css'
import Statistic from "../Components/Statistic";

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
    },[userName])

    // 책 추가하기
    const book = async (title, summary, release, author, isbn, category, token) => {
        const bookJSON = await fetch(`${BASE_URL}/api/admins/book`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            method : 'POST',
            body : JSON.stringify({
                title, summary, release, author, isbn, category
            })
        })
        const book = await bookJSON.json()
        return book
    }

    const [viewer, setViewer] = useState(
        {addBook : '', view: '', borrow: '', history: '', stat: ''}
    )
    
    const viewOption = (e) => {
        setViewer({[e.target.name]:'on'})
    }
    const { addBook, view, borrow, history, stat } = viewer
    
    
    
    const [input, setInput] = useState()
    const valueExtractor = (e) => {
        let {id, value} = e.target
        setInput({...input, [id] : value })
    }
    
    const category = ['비문학', '소설', '문학', '자기계발', '요리', '패션', '여행']
    const [option, setOption] = useState(category[0])
    const selectOption = (e) => {
       setOption(e.target.value)
    }

    // 책 추가하기 버튼
    const starter = async (e) => {
        e.preventDefault()
        const {title, summary, release, author, ISBN} = input
        const category = option
        let success = await book(title, summary, release, author, ISBN, category, token)
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
            <Header userName={userName} admin={admin} BASE_URL={BASE_URL} token={token} isLogin={isLogin} logoutCheck={logoutCheck}/>
            {isLogin && 
            <div id="Main">
                <nav className="viewer-nav">
                    <ul>        
              {admin && <li><button name="addBook" onClick={viewOption}>책 추가</button></li>}
                        <li><button name="view" onClick={viewOption}>책 조회</button></li>
                        <li><button name="borrow" onClick={viewOption}>대출 목록</button></li>
                        <li><button name="history" onClick={viewOption}>히스토리</button></li>
                        <li><button name="stat" onClick={viewOption}>취향 집계</button></li>
                    </ul>
                </nav>
                <div className="viewer-data">
                    {viewer && addBook && 
                        <LabelBox arr={arr1} addClass={'add-book'} handleChange={valueExtractor}
                        handleClick={starter} options={category} optionChange={selectOption}>완료</LabelBox>
                    }
                    {viewer && view && 
                        <BookList token={token} BASE_URL={BASE_URL} admin={admin}></BookList>
                    }
                    {viewer && borrow && 
                        <BorrowedBook token={token} BASE_URL={BASE_URL}></BorrowedBook>
                    }
                    {viewer && history && 
                        <History token={token} BASE_URL={BASE_URL}></History>
                    }
                    {viewer && stat &&
                        <Statistic token={token} BASE_URL={BASE_URL} admin={admin}></Statistic>
                    }
                </div>
            </div>}
        </>
    )
}

export default MainPage