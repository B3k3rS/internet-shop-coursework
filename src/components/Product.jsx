import React, { Component, useEffect, useState } from 'react';


const Product = (props, {product}) => {
    const [productInfo, setProductInfo] = useState('')

    const allProduct = props.product.map((prod) => {
        if (props.filter == "all"){
            return (
                <div className="productBlock" key={prod._id}>
                    <div className="productName">{prod.name}</div>
                    <div className="productImage" style={{background: `url(${prod.link})`, backgroundSize: `101%`, backgroundRepeat: `no-repeat`}}><p className="ProductCost">{prod.cost} ₴ </p><p className="productNum"><img className="productBoxImg" src={process.env.PUBLIC_URL + '/img/product/box.png'} alt="" />{prod.quantity} шт.</p></div>
                    <div className="productInfo">{prod.info}</div>
                    <div className="productByButton"><button className="byProduct" onClick={() => {
                        props.modalOpen();
                        props.inputProduct(prod);               
                    }}>Придбати</button></div>
                </div>
                );
        }
        else if (props.filter == prod.category) {
            return (
                <div className="productBlock" key={prod._id}>
                    <div className="productName">{prod.name}</div>
                    <div className="productImage" style={{background: `url(${prod.link})`, backgroundSize: `101%`, backgroundRepeat: `no-repeat`}}><p className="ProductCost">{prod.cost}</p><p className="productNum"><img className="productBoxImg" src={process.env.PUBLIC_URL + '/img/product/box.png'} alt="" />{prod.quantity} шт.</p></div>
                    <div className="productInfo">{prod.info}</div>
                    <div className="productByButton"><button className="byProduct" onClick={() => {
                        props.modalOpen();
                        props.inputProduct(prod);               
                    }}>Придбати</button></div>
                </div>
                );
        }
        else{
            return
        }
    });

    return allProduct;
}

export default Product;
