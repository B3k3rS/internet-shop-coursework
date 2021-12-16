import React from 'react';
import ServerFilterList from './ServerFilterList';

const servlist = [
    {
        name: 'BEARZ DAYZ #1',
        num: 2977,
    },
    {
        name: 'BEARZ DAYZ #2',
        num: 2978,
    },
    {
        name: 'BEARZ DAYZ #3',
        num: 2979,
    },
]

const Serverfilter = () => {
    return (
        <div className="server_filterBlock servList">
            <ServerFilterList serverlist={servlist}/>
        </div>
    );
}

export default Serverfilter;
