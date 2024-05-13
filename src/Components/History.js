import React, { useEffect, useState } from "react";

function History ({token, BASE_URL}) {
    
    const [history, setHistory] =useState()
    // 히스토리 조회
    const fetchLog = async () => {
        const historyJSON = await fetch(`${BASE_URL}/api/history/log`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        const history = await historyJSON.json()
        return setHistory(history)
    }

    useEffect(()=>{
        fetchLog()
    },[])

    const renewBook = async (isbn) => {
        const result = await fetch(`${BASE_URL}/api/user-service/book/${isbn}`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            method: 'PUT'
        })
        const resultMsg = await result.json()
        console.log(resultMsg)
        alert(resultMsg.msg)
    }

    // 책 반납
    const returnBook = async (isbn) => {
        const result = await fetch(`${BASE_URL}/api/user-service/book/${isbn}`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            method: 'DELETE'
        })
        const resultMsg = await result.json()
        alert(resultMsg.msg)
        fetchLog()
    }

    return(
        <>
            {history && history.map((log, id)=> {
                const {title, isbn, deadLineFormat, isReturn, loanTimeFormat, work, returnTimeFormat, end} = log
                
                return(
                    <div key={id} className="history">
                        <p>책 제목 : {title && title}</p>
                        <p>빌린날짜 : {loanTimeFormat}</p>
                        {returnTimeFormat ? <p>반납일자 : {returnTimeFormat}</p>
                        : <p>대출기간 : {deadLineFormat}<span> ({end})</span></p>}
                        <p>상태 : {work}</p>
                        <div className="btn-box">
                            <button onClick={()=>renewBook(isbn)}>연장하기</button>
                            <button onClick={()=>returnBook(isbn)}>반납하기</button>
                        </div>
                    </div>
                ) 
            })}
        </>

    )
}
export default History