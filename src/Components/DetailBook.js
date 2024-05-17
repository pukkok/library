import React, { useEffect, useState } from "react";
import './DetailBook.css'
import classNames from "classnames";

function DetailBook ({BASE_URL, token, isbn, handleClick}) {

    const [detail, setDetail] = useState()

    const detailView = async () => {
        const result = await fetch(`${BASE_URL}/api/user-service/borrowed-book/${isbn}`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        }).then(res=> res.json())
        return setDetail(result)
    }

    useEffect(()=>{
        detailView()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    // let {title, author, release, category, summary} = detail
    return(
        <div className={classNames(`modal-bg`)}>
            {detail && 
                <div className="detail-modal">
                    <h2>상세보기 <button onClick={handleClick}>닫기</button> </h2>
                    <p>제목 : {detail.title}</p>
                    <p>저자 : {detail.author}</p>
                    <p>발매일 : {detail.release}</p>
                    <p>카테고리 : {detail.category}</p>
                    <p>isbn : {detail.isbn}</p>
                    <p>줄거리 : <span>{detail.summary}</span></p>
                </div>
            }
        </div>
    )
}

export default DetailBook