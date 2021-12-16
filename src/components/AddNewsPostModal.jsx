import React from "react";
import '../styles/AddNewsPostModal.css'
import { useState, useEffect } from "react";
import axios from "axios";


const AddNewsPostModal = ({active, setActive, newError}) => {
    const [postPicture, setPostPicture] = useState('https://i.imgur.com/LsF7Y9k.png')
    const [postText, setPostText] = useState('')
    const [postAuthor, setPostAuthor] = useState('')

    

    function addNewsFun(e) {
        e.preventDefault()
        if (postText.trim()=='' && postPicture.trim()=='') {
            newError('Помилка створення новини! Форма для створення не заповнена')
            return
        }
        else if (postText.trim()=='') {
            newError('Помилка створення новини! Поле "текст новини" незаповнене')
            return
        }
        else if (postPicture.trim()=='') {
            newError('Помилка створення новини! Зображення до посту вiдсутнє')
            return
        }
        else {
            axios.post(`http://localhost:9999/api/posts`, {
                author: postAuthor,
                content: postText,
                picture: postPicture
            })
            .then(
                window.location.href = "http://localhost:3000/news/"
            )
            }
    }

    function setAuthor() {
        let token = localStorage.getItem('token')
        axios.get(`http://localhost:9999/auth/user-info/${token}`)
            .then(res => {
                setPostAuthor(res.data.username)
            })     
    }

    

    return (
        <div className={active ? "modal active" : "modal"} onClick={()=> {setActive(false)}}>
            <div className="modal__content modal__content_addProduct" onClick={(e) => {e.stopPropagation()}}>
                <h2>Додати новину</h2>

                <h3>Зображення</h3>
                <input type="text" defaultValue='https://i.imgur.com/LsF7Y9k.png' onChange={e => {
                    setPostPicture(e.target.value)
                }}/>

                <h3>Текст новини</h3>
                <textarea name="" id="" cols="30" rows="10" onChange={e => {
                    setPostText(e.target.value)
                }}></textarea>

                {setAuthor()}
                <div className="AddProductButton">
                    <button className="add" onClick={addNewsFun}>ADD NEWS</button>
                    <button className="close" onClick={() => {
                        setActive(false)
                    }}>CLOSE</button>
                </div>
            </div>
        </div>
    )
}

export default AddNewsPostModal;