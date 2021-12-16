import { BrowserRouter , Route , Switch , Redirect } from 'react-router-dom';
import { useState } from 'react';

import './styles/main.css';
import Header from './components/Header';
import Link from './components/Link';
import Monitoring from './components/Monitoring'; 
import News from './components/News';
import Market from './components/Market';
import Serverinformation from './components/ServerInformation';
import Login from './components/Login'
import SingUp from './components/SingUp'
import Profile from './components/Profile.jsx'
import ProductModal from './components/ProductModal';
import AddProductModal from './components/AddProductModal';
import AddNewsPostModal from './components/AddNewsPostModal';
import ErrorMessage from './components/ErrorMessage';


function Orden() {
    const [modalActive, setModalActive] = useState(false)
    const [modalActiveAddProduct, setModalActiveAddProduct] = useState(false)
    const [addNewsActive, setAddNewsActive] = useState(false)
    const [errorActive, setErrorActive] = useState(false)
    const [errorMessageText, setErrorMessageText] = useState('')
    function modalOpen() {
        setModalActive(true)
    }

    function addProductOpen() {
        setModalActiveAddProduct(true)
    }

    function addNewsOpen() {
        setAddNewsActive(true)
    }

    function newError(message) {
        setErrorActive(true)
        setErrorMessageText(message)
    }

    const [productInModal, setProductInModal] = useState({})
    function inputProduct (product) {
        setProductInModal(product)
    }
    return (
        <div  className = "OrdenShop">
            <BrowserRouter>
                <Switch>
                <Route exist path="/login"> 
                    <Login newError={newError}/>
                </Route>
                <Route exist path="/sing-up"> 
                    <SingUp newError={newError}/>
                </Route>
                <Route>
                    <div className="logotype_block">
                        <img src={process.env.PUBLIC_URL + '/img/orden_logo.png'} className="logotype"/>
                    </div>
                    
                    <Header/>

                    <main>
                        <div className="container main_content">
                            <div className="left-col">
                                <Link/>                        
                                <Monitoring/>
                            </div>
                            <div className="right-col">
                            <BrowserRouter>
                                <Switch>
                                    <Route path="/products">
                                        <Market modalOpen={modalOpen} inputProduct={inputProduct} addProductOpen={addProductOpen}/>                                        
                                    </Route>

                                    <Route path="/news">
                                        <News addNewsOpen={addNewsOpen}/>
                                    </Route>

                                    <Route path="/servers">
                                        <Serverinformation/>
                                    </Route>

                                    <Route path="/profile">
                                        <Profile newError={newError}/>
                                    </Route>
                                    
                                    <Redirect to='/products'/>
                                </Switch>
                            </BrowserRouter>
                            </div>
                        </div>                
                    </main>
                </Route>
            
                </Switch>
            </BrowserRouter>
            <ProductModal 
                active={modalActive} 
                setActive={setModalActive} 
                productInModal={productInModal} 
                newError={newError}
            />
            <AddProductModal 
                activeAddProduct={modalActiveAddProduct} 
                setActiveAddProduct={setModalActiveAddProduct} 
                newError={newError}
            />
            <AddNewsPostModal 
                active={addNewsActive} 
                setActive={setAddNewsActive} 
                newError={newError}
            />
            <ErrorMessage 
                active={errorActive} 
                setActive={setErrorActive} 
                ErrorText={errorMessageText} 
            />
        </div>
      );
}

export default Orden;
