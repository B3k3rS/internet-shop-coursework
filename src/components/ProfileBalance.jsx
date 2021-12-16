import axios from "axios";
import React, { useState, useEffect } from "react";

const ProfileBalance = ({newError}) => {
    let token = localStorage.getItem('token')

    const [cardNumber, setCardNumber] = useState('')
    const [cardDate, setCardDate] = useState('')
    const [cardCVV, setCardCVV] = useState('')
    const [sum, setSum] = useState(30)
    var date = new Date()

    const [userInfo, setUserInfo] = useState('');
    const [userBalance, setUserBalance] = useState('')

    useEffect(() => {
        loadData();
    },[]);

    function loadData() {
        axios.get(`http://localhost:9999/auth/user-info/${token}`)
            .then(res => {
                setUserInfo(res.data);
            })
    }

    function moreMoney() {
        if (cardNumber.trim().length != 25) {
            newError('Помилка введення номера картки')
            return
        }

        if (cardDate.trim().length != 7) {
            newError('Помилка введення термiну дiї картки')
            return
        }

        if (cardDate.trim().slice(0,2) > 12) {
            newError('Помилка введення термiну дiї картки')
            return
        }

        if ( cardDate.trim().slice(5,7) < Number(date.getFullYear())-2000) {
            newError('Помилка введення термiну дiї картки')
            return
        }

        if (cardCVV.trim().length != 3) {
            newError('Помилка введення CVV карти')
            return
        }

        if (sum < 30 || sum > 5000) {
            newError('Неприпустима сума поповнення рахунку. Введiть суму вiд 30 i до 5000 гривень')
            return
        }

        axios.get(`http://localhost:9999/auth/user/${userInfo.id}`)
            .then( res => {
                let user = res.data;
                user.balance += Number(sum);
                axios.post(`http://localhost:9999/auth/update-user/`,user)
            })
            .then( () => {
                window.location.href = "http://localhost:3000/profile/about"
            })
}

    return(
        <div className="ProfileCard">
            
            <p className="cardInfo">Номер карти</p>
            <input name='Number' type="text" onChange={(e) => {
                if (e.target.value.length == 4 || e.target.value.length == 11 || e.target.value.length == 18) {
                    e.target.value = e.target.value + ' - '
                }
                setCardNumber(e.target.value) 
            }}/>

            <div className="smallInput">
                <div>
                    <p className="cardInfo">MM / YY</p>
                    <input name='date' type="text" onChange={(e) => {
                        if (e.target.value.length == 2) {
                            e.target.value = e.target.value + ' / '
                        } 
                        setCardDate(e.target.value) 
                    }}/>
                </div>
                <div>
                    <p className="cardInfo">CVV</p>
                    <input name='cvv' type="password" onChange={(e) => {
                        setCardCVV(e.target.value) 
                    }}/>
                </div>
                <div>
                    <p className="cardInfo">Поповнити на</p>
                    <input className="summ" name="summ" type="number" defaultValue="30" onChange={e => {
                        setSum(e.target.value)
                    }}/>
                </div>
            </div>
            <div className="confirm">
                <button onClick={() => {moreMoney()}}>Поповнити баланс</button>
            </div>
        </div>
    )
}

export default ProfileBalance;