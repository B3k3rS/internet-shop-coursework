import React from 'react';
import '../styles/ServerInformation.css';
import ServerInfo from './ServerInfo';
import ServerFilter from './ServerFilter';
import {BrowserRouter,Route,Switch} from "react-router-dom";

const Serverinformation = () => {
    return (
        <div className="ServerInfoBlock">
            <div className="ServInfHeader">
                <p>Iнформацiя про сервера</p>
            </div>

            <ServerFilter/>

            <BrowserRouter>
                <Switch>
                    <Route path="/servers/2977">
                        <ServerInfo num="2977"/>
                    </Route>
                    <Route path="/servers/2978">
                        <ServerInfo num="2978"/>
                    </Route>
                    <Route path="/servers/2979">
                        <ServerInfo num="2979"/>
                    </Route>
                </Switch>
            </BrowserRouter>

            
        </div>
    );
}

export default Serverinformation;
