import React from 'react';
import '../styles/Link.css';

const Link = () => {
    return (
        <div className="link_blocks">
            <a href="https://vk.com/ordendayz" className="link_block">
                <img src={process.env.PUBLIC_URL + "/img/vk_logo.png"} alt="" />
            </a>
            <a href="https://discord.gg/MnCRDcT" className="link_block disc">
                <img src={process.env.PUBLIC_URL + "/img/discord_logo.png"} alt="" />
            </a>
        </div>
    );
}

export default Link;
