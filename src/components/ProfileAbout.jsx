
import React from "react";
import '../styles/Profile.css';
import axios from 'axios';
import { useState, useEffect } from "react";

const ProfileAbout = ({token}) => {
    const [userInfo, setUserInfo] = useState('');
    const [userBalance, setUserBalance] = useState('')

    useEffect(() => {
        loadData();
    },[]);

    function loadData() {
        axios.get(`http://localhost:9999/auth/user-info/${token}`)
            .then(res => {
                setUserInfo(res.data);
            })
    }

    function loadBalance(name) {
        if (name) {
            axios.get(`http://localhost:9999/auth/user-balance/${name}`)
            .then(res => {
                setUserBalance(res.data)
            })
        }
    }

    return (
        <div className="profileAboutUser">            
            <div className="avatar"><img src={userInfo.photo} alt="" /></div>
            <div className="information">
                <div className="ID">
                    <h3>Account ID</h3>
                    <p>{userInfo.id}</p>
                </div>
                <div className="Login">
                    <h3>User Login</h3>
                    <p>{userInfo.username}</p>
                </div>
                <div className="Balance">
                    <h3>Balance</h3>
                    <p>{loadBalance(userInfo.username)}{userBalance} ₴</p>
                </div>
                
            </div>            
        </div>
    )
}

export default ProfileAbout;