import React, { Component } from 'react';
import '../styles/Market.css';
import Storefilter from './StoreFilter';
import ProductList from './ProductList';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Market = (props) => {
    const [userInfo, setUserInfo] = useState('');
    let token = localStorage.getItem('token')

    useEffect(() => {
        loadData();
        adminPanel();
    },[]);

    function loadData() {
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
                <div className="marketAdminPanel">
                    <div className="addProduct">
                        <button onClick={props.addProductOpen}>Додати товар</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="marketBlock">
            <div className="marketHeader">
                <p>Магазин</p>
            </div>
            <Storefilter/>
            {adminPanel()}
            <ProductList modalOpen={props.modalOpen} inputProduct={props.inputProduct}/>
            <div className="marketfooter">
                <p>
                Розміщена на цьому сайті інформація носить виключно інформаційний характер і ні за яких умов не є публічною офертою, яка визначається статтею 699 Цивільного кодексу України.
                </p>                    
            </div>
        </div>
    );
}
export default Market;
