import React from 'react';
import '../styles/Header.css';
import axios from 'axios'
import { useState, useEffect } from 'react';





const Header = () => {
    const [userInfo, setUserInfo] = useState('');
    const [userBalance, setUSerBalance] = useState('')

    useEffect(() => {
        loadData();
    },[]);
    
    function loadData() {
        let token = localStorage.getItem('token')
        axios.get(`http://localhost:9999/auth/user-info/${token}`)
            .then(res => {
                setUserInfo(res.data);                
            })}
    
    function loadBalance(name) {
        if (name) {
            axios.get(`http://localhost:9999/auth/user-balance/${name}`)
            .then(res => {
                setUSerBalance(res.data)
            })
        }
    }

    function accExit() {
        localStorage.removeItem('token')
        window.location.href = 'http://localhost:3000/'
    }

    function refreshToken() {
        
    }

    function loginIsDone() {
        if (!localStorage.getItem('token')) {
            return <a href="/login">УВIЙТИ</a>
        }
        else {
            {refreshToken()}
            return <div> <a className="nickname" href="/profile">  {userInfo.username} | {loadBalance(userInfo.username)}{userBalance} ₴</a> <a ><img className="accExit" src="https://i.imgur.com/KzhqsZL.png" alt="" onClick={accExit}/></a> </div>
        }
    }

    return (
        <header>
            
            <div className="container main_header">
                <div className="logo">
                    <a href="/"> МАГАЗИН BEARZ </a>
                </div>
                <div className="nav_menu">
                    <ul>
                        <li><a href="/news">НОВИНИ</a></li>
                        <li><a href="/products">ТОВАРИ</a></li>
                        <li><a href="/servers">СЕРВЕРA</a></li>
                    </ul>
                </div>
                <div className="setting">
                    {loginIsDone()}
                </div>
            </div>
        </header>
    );
}

export default Header;
