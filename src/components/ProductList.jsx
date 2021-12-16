import React, { useEffect } from 'react';
import Product from './Product';
import {BrowserRouter,Route,Switch,Redirect,withRouter} from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

const Productlist = (props) => {
    const [productInfo, setProductInfo] = useState('');

    useEffect(() => {
        loadData();
    },[])

    const loadData = async () => {
        axios.get(`http://localhost:9999/api/product`)
            .then((res) => {
                setProductInfo(res.data)
            })
    }

    if (!productInfo[0]) return <p>Loading...</p>

    return (
        <div className="ProductList">
            <BrowserRouter>
                <Switch>
                    <Route path="/products/all">
                        <Product inputProduct={props.inputProduct} modalOpen={props.modalOpen} product={productInfo} filter='all'/>
                    </Route>
                    <Route path="/products/cars">
                        <Product inputProduct={props.inputProduct} modalOpen={props.modalOpen} product={productInfo} filter='cars'/>
                    </Route>
                    <Route exist path="/products/weapon">
                        <Product inputProduct={props.inputProduct} modalOpen={props.modalOpen} product={productInfo} filter='weapon'/>
                    </Route>
                    <Route exist path="/products/items">
                        <Product inputProduct={props.inputProduct} modalOpen={props.modalOpen} product={productInfo} filter='items'/>
                    </Route>
                    <Route exist path="/products/sets">
                        <Product inputProduct={props.inputProduct} modalOpen={props.modalOpen} product={productInfo} filter='sets'/>
                    </Route>
                    <Route exist path="/products/services">
                        <Product inputProduct={props.inputProduct} modalOpen={props.modalOpen} product={productInfo} filter='services'/>
                    </Route>
                    <Route exist path="/products/">
                        <Product inputProduct={props.inputProduct} modalOpen={props.modalOpen} product={productInfo} filter='all'/>
                    </Route>
                    <Redirect to="/products/"/>
                </Switch>
            </BrowserRouter>
            
        </div>
    );
}

export default Productlist;
