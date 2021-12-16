import React from 'react';
import '../styles/Login.css';
import { useState } from 'react';
import axios from 'axios';

const SingUp = ({newError}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')

    function singUpNow(e) {
        e.preventDefault();
        if (login.trim() == '' && password.trim() == ''){
            newError('Не введено логiн i пароль')
            return
        }
        else if (login.trim() == '') {
            newError('Не введено логiн')
            return

        }
        else if (password.trim() == ''){
            newError('Не введено пароль')
            return
        }
        axios.post(`http://localhost:9999/auth/registration/`,{
            username: login,
            password: password
        })
        .then(res => {
            if (!res.data.error) {
                setTimeout(() => {
                    window.location.href = 'http://localhost:3000/login'
                },1000)
            }
            else {
                newError(res.data.error)
            }
        })
    }

    return (
        
        <form className="loginblock" onSubmit={singUpNow}>
            <div className="img">
                <img src={`${process.env.PUBLIC_URL}/img/orden_logo.png`} alt="" />
            </div>
            <h2>Create a BEARZ account</h2>
            <div className="inputblock">
                <div className="login"><input type="text" placeholder="Username or Email" onChange={e => {setLogin(e.target.value)}} value={login}/></div>
                <div className="password"><input type="password" placeholder="Password " onChange={e => {setPassword(e.target.value)}} value={password}/></div>
            </div>
            <div className="button">
                <button type="submit">Sing up</button>
            </div>
            <a className="singUp" href="/login">Have an account? Log in</a>
        </form>
    );
}
export default SingUp;
