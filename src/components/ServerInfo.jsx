import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServerInfo = (props) => {
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
  
    function copyFun() {
        let copyText = document.getElementById("copyInput");
        copyText.select();
        document.execCommand('copy');
    }

    return(
        <div className="serverInfoBlock">
            <div className="serverInfoBlockHeader">
                <h1>{serverInfo.hostname}</h1>
            </div>    
            <div className="servertextinfo"> 
                <table className="servInfoTable">
                    <thead>
                        <tr>
                            <th>/</th>
                            <th>/</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="Label">IP:</td>
                            <td>
                                <div className="ipBlock">
                                    <input id="copyInput" type="text" value={`${serverInfo.ip}:${serverInfo.port}`} />
                                    <div onClick={copyFun} className="copyImg">
                                        <img src={process.env.PUBLIC_URL + '/img/product/copy.png'} alt="" />
                                    </div>
                                </div>
                            </td>                                
                        </tr>
                        <tr>
                            <td className="Label">Мапа:</td>
                            <td>{serverInfo.map}</td>
                        </tr>
                        <tr>
                            <td className="Label">Розмiр мапи:</td>
                            <td>{serverInfo.size}</td>
                        </tr>
                        <tr>
                            <td className="Label">FPS:</td>
                            <td>{serverInfo.fps}</td>
                        </tr>
                    </tbody>
                </table>
            </div>    
        </div>
    )
    

}

export default ServerInfo;
