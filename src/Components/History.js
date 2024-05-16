import React, { useEffect, useState } from "react";

function History ({token, BASE_URL}) {
    const [history, setHistory] =useState()

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

    const renew = () => {

    }

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
                            <button onClick={()=>renew(isbn)}>연장하기</button>
                            <button onClick={()=>returnBook(isbn, isReturn)}>반납하기</button>
                        </div>
                    </div>
                ) 
            })}
        </>

    )
}
export default History