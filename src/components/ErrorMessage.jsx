import React from "react";
import '../styles/ErrorMessage.css';

const ErrorMessage = ({active, setActive, ErrorText}) => {
    function timer() {
        setTimeout(() => {setActive(false)},8000)
    }

    return (
        <div className={active ? 'ErrorMessage active_err tr05' : 'ErrorMessage tr05'}>
            <h3><img src="https://i.imgur.com/ZSLwEeg.png"/>Error!</h3>
            <p>{ErrorText}</p>

            {timer()}
        </div>
    )
}

export default ErrorMessage;