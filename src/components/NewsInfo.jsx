import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Newsinfo = (posts) => {
    const [postInfo, setPostInfo] = useState('');
    const [userInfo, setUserInfo] = useState('');
    let token = localStorage.getItem('token')

    useEffect(() => {
        setPostInfo(posts.posts)
        loadData();
        adminPanel();
    },[])

    function loadData() {
        axios.get(`http://localhost:9999/auth/user-info/${token}`)
            .then(res => {
                setUserInfo(res.data);
            })
    }

    function adminPanel(postId) {
        if (!localStorage.getItem('token')) {
            return
        }
        else if (userInfo && userInfo.roles && userInfo.roles[0] == "USER") {
            return
        }
        else if (userInfo && userInfo.roles && userInfo.roles[0] == "ADMIN") {
            return (
                <button className="adminDeletePost" onClick={()=> {
                    axios.delete(`http://localhost:9999/api/posts/${postId}`)
                    window.location.href = 'http://localhost:3000/news/'
                }}>x</button>
            )
        }
    }

    if (!postInfo[0]) return <p>Empty</p>
    
    let allPost = {...postInfo}
    allPost = Object.values(allPost).reverse()
    
    const postList = allPost.map(post => {
        return (
            <div className="postblock" key={post._id}>
                {adminPanel(post._id)}
                <img className="newsinfo_img" src={post.picture} alt="" />
                <div className="newsinfo_info">{post.content}</div>
                <div className="newsinfo_date">Автор: {post.author}</div>
            </div>
        )
    })

    return postList
}
export default Newsinfo;
