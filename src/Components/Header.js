import React from "react";
import { Link } from "react-router-dom";


function Header ({ userName, admin, isLogin, logoutCheck, BASE_URL, token }) {

    const openPage = (e) => {
        e.preventDefault()
        const width = 500
        const height = 500
        const top = window.screenY + (window.outerHeight - height) / 2;
        const left = window.screenX + (window.outerWidth - width) / 2;

        window.open(
            e.target.href, // 경로 
            e.target.innerText, // 이름
            `width=${width} height=${height}
             top=${top} left=${left}
             resizable=no
            ` // 스타일
        )
    }

    const logout = () => {
        alert('로그아웃 되었습니다.')
        localStorage.clear()
        logoutCheck(false)
    }

    const deleteMe = async () => {
        await fetch(`${BASE_URL}/api/users`, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            method : 'DELETE'
        })
        logout()
    }

    return(
        <header>
            <nav>
                <p><Link to='/'>그린 온라인 도서관</Link></p>
                <div className="user-nav">
                    
                    {userName ? <p>회원 : {userName} {admin && `(관리자)`}</p> : <p>비회원</p>}
                    <ul>
                        {isLogin ? 
                        <>
                            <a href="#none" onClick={deleteMe}>탈퇴</a> 
                            <a href="#none" onClick={logout}>로그아웃</a>
                        </>:
                        <>
                            <li><Link to='/login' onClick={openPage}>로그인</Link></li>
                            <li><Link to='/register' onClick={openPage}>회원가입</Link></li>
                        </>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header