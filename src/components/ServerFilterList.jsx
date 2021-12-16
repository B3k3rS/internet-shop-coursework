import React from 'react';



const Serverfilterlist = (props) => {
    const servList = props.serverlist.map((serv) => {
        return (
            <a href={`/servers/${serv.num}`} className="filter" key={serv.name}>
                {serv.name}
            </a>
        )
    });

    return servList; 
} 

export default Serverfilterlist;
