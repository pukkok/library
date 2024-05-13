import React, { useEffect, useState } from "react";

const BookList = ({token, BASE_URL, admin}) => {

    const [books, setBooks] = useState() 

    // 책 조회하기
    const fetchBookData = async () => {
        const bookJSON = await fetch(`${BASE_URL}/api/user-service/book`,{
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        const books = await bookJSON.json()
        return setBooks(books)
    }
    
    const [borrowed, setBorrowed] = useState()

    // 책 대여하기
    async function borrowBook (isbn) {
        await fetch(`${BASE_URL}/api/user-service/book`, {
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            method : 'POST',
            body : JSON.stringify({isbn})
        })
        .then(res => res.json())
        .then(result=>{
            if(result.code === 200) setBorrowed(isbn)
            alert(result.msg)
        })
    }

    // 책 내용 수정하기
    async function modifyBook (isbn) {
        await fetch(`${BASE_URL}/api/admins/book/${isbn}`, {
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            method : 'PUT',
            body: JSON.stringify({
                title: '수정된 제목'
            })
        })
        .then(res => res.json())
        .then(result => alert(result.msg))
        // 새로 읽기
        await fetchBookData()
    }

    async function deleteBook (isbn) {
        await fetch(`${BASE_URL}/api/admins/book/${isbn}`, {
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            method : 'DELETE'
        })
        .then(res => res.json())
        .then(result => alert(result.msg))
        await fetchBookData()
    }

    useEffect(()=>{
        fetchBookData()
    },[])

    return(
        <div className="data-viewer">
            <div className="book-list">
                {books && books.map((book, id) => {
                    const { title, summary, release, isbn, author, category } = book
                    return(
                        <div key={id}>
                            <h1>제목 : {title}</h1>
                            <p>줄거리 : {summary}</p>
                            <p>발매일 : {release}</p>
                            <p>ISBN : {isbn}</p>
                            <p>저자 : {author}</p>
                            <p>카테고리 : {category}</p>
                            <div className="btn-box">
                                <button onClick={()=>borrowBook(isbn)}>{borrowed===isbn ? '대여 중' : '책 대여'}</button>
                                {admin && 
                                <>
                                    <button onClick={()=>modifyBook(isbn)}>책 수정</button>
                                    <button onClick={()=>deleteBook(isbn)}>책 삭제</button>
                                </>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
    
}

export default BookList