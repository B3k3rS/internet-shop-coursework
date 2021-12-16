import axios from 'axios';
import React, {  useState } from 'react';
import '../styles/Login.css';

const Login = ({newError}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')

    const passwordInp = document.querySelector('.password input')
    
    function isLogin(e) {
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


        axios.post(`http://localhost:9999/auth/login`,{
            username: login,
            password: password
        })
        .then(res => {

            if (res.data.error) {
                newError(res.data.error)
                return
            }
            localStorage.setItem('token',res.data.token)
            window.location.href = 'http://localhost:3000/'
        })
        
    }
    function togglePass() {
        if (passwordInp.type == 'password') {
            passwordInp.type = 'text';
        }
        else {
            passwordInp.type = 'password'
        }
    }
    return (
        <form className="loginblock" onSubmit={isLogin}>
            <div className="img">
                <img src={`${process.env.PUBLIC_URL}/img/orden_logo.png`} alt="" />
            </div>
            <h2>Log in to your account</h2>
            <div className="inputblock">
                <div className="login"><input type="text" placeholder="Username or Email" onChange={e => {setLogin(e.target.value)}} value={login}/></div>
                <div className="password"><input type="password" placeholder="Password " onChange={e => {setPassword(e.target.value)}} value={password}/> <img className="showPass" src="https://i.imgur.com/PwtS5kc.png" alt="" onClick={togglePass}/> </div>
            </div>
            <div className="button">
                <button type="submit">Log in</button>
            </div>
            <a className="singUp" href="/sing-up">New to BEARZ? Sign up</a>
        </form>
    );
}

export default Login;
