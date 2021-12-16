import React from 'react';
import '../styles/News.css';
import NewsInfo from './NewsInfo';
import axios from 'axios';
import { useState, useEffect } from 'react';



const News = ({addNewsOpen}) => {
    const [postInfo, setPostInfo] = useState('');
    const [userInfo, setUserInfo] = useState('');
    let token = localStorage.getItem('token')

    useEffect(() => {
        loadData();
        adminPanel();
    },[]);

    const loadData = async () => {
        axios.get(`http://localhost:9999/api/posts`)
            .then((res) => {
                setPostInfo(res.data)
            })
        axios.get(`http://localhost:9999/auth/user-info/${token}`)
            .then(res => {
                setUserInfo(res.data);
            })
    } 
    
    function adminPanel() {
        if (!localStorage.getItem('token')) {
            return
        }
        else if (userInfo && userInfo.roles && userInfo.roles[0] == "USER") {
            return
        }
        else if (userInfo && userInfo.roles && userInfo.roles[0] == "ADMIN") {
            return (
                <div class="adminPanel">
                    <div className="addNews">
                        <button onClick={addNewsOpen}>ADD POST</button>
                    </div>
                </div>
            )
        }
    }

    if (!postInfo[0]) return <p>Loading...</p>

    return (
        <div className="news_block">
            <div className="newsHeader">
                <p>Новини</p>

                {adminPanel()}
            </div>            
            <div className="posts">
                <NewsInfo posts={postInfo}/>
            </div>
        </div>
    );

}
export default News;
