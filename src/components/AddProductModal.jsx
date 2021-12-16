import React from "react";
import '../styles/AddProductModal.css'
import { useState, useEffect } from "react";
import axios from "axios";

const AddProductModal = ({activeAddProduct, setActiveAddProduct, newError}) => {
    const [productName, setProductName] = useState('')
    const [productInfo, setProductInfo] = useState('')
    const [productQuatity, setProductQuatity] = useState('1')
    const [productCost, setProductCost] = useState('0')
    const [productPicture, setProductPicture] = useState('https://i.imgur.com/o5Dz5Zi.png')
    const [productCategory, setProductCategory] = useState('')

    function addProductFun() {
        if (productName.trim() == '' || productInfo.trim() == '' || productQuatity.trim() == '' || productCost.trim() == '' || productPicture.trim() == ''){
            newError('Форма має незаповненi поля')
            return
        }
        
        axios.post(`http://localhost:9999/api/product/`,{
            category: productCategory,
            name: productName,
            link: productPicture,
            info: productInfo,
            cost: productCost,
            quantity: productQuatity
        })
        .then(
            window.location.href = "http://localhost:3000"
        )
    }

    return (
        <div className={activeAddProduct ? "modal active" : "modal"} onClick={()=> {setActiveAddProduct(false)}}>
            <div className="modal__content modal__content_addProduct" onClick={(e) => {e.stopPropagation()}}>
                <h2>Додати товар</h2>
                <h3>Назва:</h3>
                <input type="text" onChange={(e) => {
                    setProductName(e.target.value)
                }}/>
                <h3>Опис:</h3>
                <textarea name="" id="" cols="30" rows="10" onChange={(e) => {
                    setProductInfo(e.target.value)
                }}></textarea>
                <h3>Категорiя:</h3>
                <input type="text" onChange={(e) => {
                    setProductCategory(e.target.value)
                }}/>
                <h3>Вартiсть:</h3>
                <input type="number" onChange={(e) => {
                    setProductCost(e.target.value)
                }}/>
                <h3>Кiлькiсть:</h3>

                <input type="number" defaultValue='1' onChange={(e) => {
                    setProductQuatity(e.target.value)
                }}/>
                <h3>Посилання на зображення:</h3>
                <input type="text" defaultValue='https://i.imgur.com/o5Dz5Zi.png' onChange={(e) => {
                    setProductPicture(e.target.value)
                }}/>
                <div className="AddProductButton">
                    <button className="add" onClick={addProductFun}>ADD PRODUCT</button>
                    <button className="close" onClick={() => {
                        setActiveAddProduct(false)
                    }}>CLOSE</button>
                </div>
            </div>
        </div>
    )
}

export default AddProductModal;