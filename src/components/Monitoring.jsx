import React from 'react';
import '../styles/Monitoring.css';
import ServerMonitor from './ServerMonitor';

const Monitoring = () => {
    return (
        <div className="monitor_block">
            
            <div className="monitor_info">
                <span>Монiторинг</span>
                
                <ServerMonitor num='2977'/>
                <ServerMonitor num='2978'/>
                <ServerMonitor num='2979'/>

            </div>
        </div>
    );
}

export default Monitoring;
