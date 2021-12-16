import React from "react";
import '../styles/ProductModal.css'
import { useState, useEffect } from "react";
import axios from "axios";
let token = localStorage.getItem('token')

const ProductModal = ({active, setActive, productInModal, newError}) => {

    function quantity() {
        if (productInModal.quantity > 1){
            return <p className="modalQuan">Кiлькiсть: {productInModal.quantity} шт.</p>
        }
        else {
            return
        }
    }


    const [userInfo, setUserInfo] = useState('');
    const [userBalance, setUserBalance] = useState('')
    const [selectedServer, setSelectedServer] = useState('')

    useEffect(() => {
        loadData();
        returnButton();
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

    function deleteProduct(id) {
        axios.delete(`http://localhost:9999/api/product/${id}`)
        window.location.href = 'http://localhost:3000/product'
    }
    
    function buyProduct(prodId) {
        let productData;
        axios.get(`http://localhost:9999/api/product/${prodId}`)
            .then( res => {
                productData = res.data
                if (userBalance >= productData.cost) {
                    
                    if (selectedServer != '') {
                        axios.get(`http://localhost:9999/auth/user/${userInfo.id}`)
                            .then( res => {
                                let user = res.data;
                                user.balance -= productData.cost;
                                axios.post(`http://localhost:9999/auth/update-user/`,user)
                            })

                        axios.post(`http://localhost:9999/cart/new`,{
                            "product" : productData.name,
                            "productType" : productData.category,
                            "cost" : productData.cost,
                            "server" : selectedServer,
                            "buyerID" : userInfo.id
                        })
                        .then(() => {
                            window.location.href="http://localhost:3000/products"
                        })
                    }
                    else{ 
                        newError('Не вказан сервер!')
                    }
                }
                else if (userBalance < productData.cost) {
                    newError('Недостатньо коштiв!')
                }
            })
        
    }

    function returnButton(prodId) {
        {loadBalance(userInfo.username)}
        if (!localStorage.getItem('token')) {
            return (
                <div>
                    <div className="modalbutton">
                        <a href="/login"><button className="buy">УВIЙТИ</button></a>
                    </div>
                </div>
            ) 
        }
        else if (userInfo && userInfo.roles && userInfo.roles[0] == "ADMIN") {
            return (
                <div>
                    <div className="modalbutton">
                        <button className="close" onClick={() => {
                            setActive(false)
                        }}>ЗАКРИТИ</button>
                        <button className="buy" onClick={() => {
                            buyProduct(prodId)
                        }}>ПРИДБАТИ</button>
                    </div>
                    <div className="modalbutton adminPanel">
                        <button className="close" onClick={() => {
                            deleteProduct(productInModal._id)
                            setActive(false)
                        }}>DELETE</button>
                    </div>
                </div>
            )
        }
        else if (userInfo && userInfo.roles && userInfo.roles[0] == "USER") {
            return (
                <div>
                    <div className="modalbutton">
                        <button className="close" onClick={() => {
                            setActive(false)
                        }}>ЗАКРИТИ</button>
                        <button className="buy" onClick={() => {
                            buyProduct(prodId)
                        }}>ПРИДБАТИ</button>
                    </div>
                </div>
            )            
        }

    }

    return ( 
        <div className={active ? "modal active" : "modal"} onClick={()=> {setActive(false)}}>
            <div className="modal__content" onClick={(e) => {e.stopPropagation()}}>
                <h2>{productInModal.name}</h2>
                <div className="img">
                    <img src={productInModal.link} alt=""/>
                </div>
                <div className="textinfo">
                    <p className="modalInfo">Опис: {productInModal.info} </p>
                    {quantity()}
                    <p className="modalCost">Цiна: {productInModal.cost} ₴</p>
                </div>
                <div className="modalbuy">
                    <select defaultValue='0' name="server" onChange={(e) => {
                        setSelectedServer(e.target.value)
                    }}>
                        <option value="0" disabled>Оберiть сервер</option>
                        <option value="BEARZ DAYZ #1">BEARZ DAYZ #1</option>
                        <option value="BEARZ DAYZ #2">BEARZ DAYZ #2</option>
                        <option value="BEARZ DAYZ #3">BEARZ DAYZ #3</option>
                    </select>
                    <div>
                        {returnButton(productInModal._id)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModal;