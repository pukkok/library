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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <>
            {history && history.map((log, id)=> {
                const {title, deadLineFormat, loanTimeFormat, work, returnTimeFormat, end} = log
                return(
                    <div key={id} className="history">
                        <p>책 제목 : {title}</p>
                        <p>빌린날짜 : {loanTimeFormat}</p>
                        {returnTimeFormat ? <p>반납일자 : {returnTimeFormat}</p>
                        : <p>대출기간 : {deadLineFormat}<span> ({end})</span></p>}
                        <p>상태 : {work}</p>
                    </div>
                ) 
            })}
        </>

    )
}
export default History