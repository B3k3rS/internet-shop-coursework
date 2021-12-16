import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'

const Servermonitor = (props) => {
    const [serverInfo, setServerInfo] = useState('');
    
    useEffect(() => {
        loadData(props.num);
    },[]);

    const loadData = async (num) => {
        axios.get(`https://api.rust-servers.info/info/${num}`)
            .then((res) => {
                let server = res.data;
                server.hostname = "BEARZ DAYZ #"+ Number(num-2976) +server.hostname.slice(13,99)
                setServerInfo(res.data)
            })
    }
    
    function progressBar () {
        if (Number(serverInfo.players_cur) > Number(serverInfo.players_max)){
            serverInfo.quote = Number(serverInfo.players_cur) - Number(serverInfo.players_max);
            serverInfo.players_cur = '200';
        }   
    }

    function returnQuote() {
        if (serverInfo.quote)
            return <text className="quote"> ({serverInfo.quote})</text>
        else
            return
    }

    return (
        <div className="server_monitor">                
            <p className="server_name">{serverInfo.hostname}</p>
                
                <div className="progress-bar" ><div className="progress-bar_online" style={{width: `${serverInfo.players_cur/serverInfo.players_max*100}%`}}></div></div>
                <div className="server_monitor_info">
                    <a href={`http://localhost:3000/servers/${props.num}`}>
                    {progressBar()}
                        <p className="server_online">
                            {serverInfo.players_cur} {returnQuote()}
                             / {serverInfo.players_max}
                        </p>
                    </a>
                    <div className="server_info_buttons">
                        <a href={`http://localhost:3000/servers/${props.num}`} className="monitor_image_block play">.</a>
                    </div>
                </div>

        </div>
    );


}

export default Servermonitor;
