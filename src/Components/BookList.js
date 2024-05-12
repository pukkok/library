import React, { useEffect, useState } from "react";

const BookList = ({token, BASE_URL}) => {

    const [books, setBooks] = useState() 

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
    fetchBookData()

    async function detailViewer (isbn) {
        await fetch(`${BASE_URL}/api/user-service/book`, {
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            method : 'POST',
            body : JSON.stringify({isbn})
        })
        .then(res => res.json())
        .then(result=>alert(result.msg))
    }

    useEffect(()=>{
        
    })

    return(
        <div className="data-viewer">
            <div className="book-list">
                {books && books.map((book, id) => {
                    const { title, summary, release, isbn, author } = book
                    return(
                        <div key={id} className={`item${id}`}>
                            <h1>{title}</h1>
                            <p>{summary}</p>
                            <p>{release}</p>
                            <p>{isbn}</p>
                            <p>{author}</p>
                            <button onClick={()=>detailViewer(isbn)}>책 대여</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
    
}

export default BookList