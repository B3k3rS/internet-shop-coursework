import React, { useState, useEffect } from "react";
import axios from 'axios';

const ProfileCart = () => {

    let token = localStorage.getItem('token')
    const [userId, setUserId] = useState('')
    const [myCarts, setMyCarts] = useState('')

    useEffect(()=>{
        loadData();
        loadCart();
    },[])

    function loadData() {
        axios.get(`http://localhost:9999/auth/user-info/${token}`)
            .then( res => {
                setUserId(res.data.id)
                axios.post(`http://localhost:9999/cart/carts/`,{
                    buyerID: res.data.id
                })
                .then( res => {
                    setMyCarts(res.data)
        }) 
            })
    }

    function loadCart() {
           
    }

    function returnCart() {
        if (!myCarts[0] || userId == '' || !userId) {
            return <div> Empty :(</div>
        }
        else {
            const tmp_cart = myCarts.map((el) => {
                return (
                    <tr>
                        <td>{el.product}</td>
                        <td>{el.dateAndTime}</td>
                        <td>{el.productType}</td>
                        <td>{el._id}</td>
                        <td>{el.cost} ₴</td>
                        <td>{el.server}</td>
                    </tr>
                )
            }).reverse()
            
            return tmp_cart;  
        }
    }

    if (!myCarts[0]) {
        return <div> Empty :( </div>
    }
    else {
        return (<div className="cartTable">
            <table>
                <tr>
                    <th>Назва</th>
                    <th>Дата покупки</th>
                    <th>Тип</th>
                    <th>Ключ</th>
                    <th>Цiна</th>
                    <th>Сервер</th>
                </tr>
                {returnCart()}
            </table>
        </div>)
    }
}

export default ProfileCart;