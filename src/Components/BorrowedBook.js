import React, { useEffect, useState } from "react";
import DetailBook from "./DetailBook";

function BorrowedBook ({ token, BASE_URL}) {

    const [bookList, setBookList] = useState()

    // 빌린 책 목록
    const borrowedBookList = async () => {
        const bookJSON = await fetch(`${BASE_URL}/api/user-service/borrowed-book`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
        })
        const book = await bookJSON.json()
        return setBookList(book)
    }

    const [deadLine, setDeadLine] = useState()
    // 데드라인 불러오기
    const fetchLog = async () => {
        const historyJSON = await fetch(`${BASE_URL}/api/history/log`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        const history = await historyJSON.json()

        const filteredHistory = history.filter(data => {
            return data.isReturn === false
        })
        return setDeadLine(filteredHistory)
    }

    useEffect(()=>{
        borrowedBookList()
        fetchLog()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // 책 기간 연장하기
    const renewBook = async (e, isbn) => {
        e.stopPropagation()
        const result = await fetch(`${BASE_URL}/api/user-service/book/${isbn}`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            method: 'PUT'
        })
        const resultMsg = await result.json()
        alert(resultMsg.msg)
        fetchLog()
    }

    // 책 반납
    const returnBook = async (e, isbn) => {
        e.stopPropagation()
        const result = await fetch(`${BASE_URL}/api/user-service/book/${isbn}`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            method: 'DELETE'
        })
        const resultMsg = await result.json()
        alert(resultMsg.msg)
        borrowedBookList()
    }

    const [open, setOpen] = useState()

    const openModal = (id) => {
        setOpen(id)
    }

    const closeModal = () => {
        setOpen('')
    }

    console.log(open)
    return(
        <>
        {bookList && bookList.map((data, id)=>{
            const { title, author, category, isbn } = data
            return(
                <div key={id} className="borrowed-booklist" onClick={()=>openModal(id)}>
                    <div>
                        <p>제목 : {title}</p>
                        <p>저자 : {author}</p>
                        <p>카테고리 : {category}</p>
                    </div>
                    <div className="dead-line">
                        <p>남은 기한 : {deadLine && deadLine[id].end}</p>
                    </div>
                    <div className="btn-box">
                        <button onClick={(e)=>renewBook(e, isbn)}>연장하기</button>
                        <button onClick={(e)=>returnBook(e, isbn)}>반납하기</button>
                    </div>
                    {open===id && <DetailBook token={token} BASE_URL={BASE_URL} isbn={isbn} handleClick={closeModal}/>}
                </div>
            )
        })}

        </>
    )
}

export default BorrowedBook