import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import '../styles/Profile.css'
import ProfileAbout from './ProfileAbout';
import ProfileCart from './ProfileCart';
import ProfileBalance from './ProfileBalance';

const Profile = ({newError}) => {
    return (
        <div className="profileBlock">
            <div className="profileHeader">
                <p>Профiль</p>
            </div>
            <div className="profileNav">
                <a href="/profile/about">Iнформацiя</a>
                <a href="/profile/cart">Покупки</a>
                <a href="/profile/balance">Поповнити рахунок</a>
            </div>
            <div className="ProfileInfoBlock" >
                <BrowserRouter>
                    <Switch>
                        <Route path="/profile/about">
                            <ProfileAbout token={localStorage.getItem('token')}/>
                        </Route>

                        <Route path="/profile/cart">
                            <ProfileCart/>
                        </Route>   

                        <Route path='/profile/balance'>
                            <ProfileBalance newError={newError}/>
                        </Route>    

                        <Redirect to="/profile/about"></Redirect>
                    </Switch>    
                </BrowserRouter>
            </div>
        </div>
    );
}

export default Profile;
