import React , {useContext, useState, useEffect}from 'react'
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js'
import hmacsha256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import axios from 'axios';


const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods' : '*',
    'Access-Control-Allow-Headers' : '*'
};
const config = {
    header : headers
}

const cleanCookie = (name) => {
    console.log('clean ', name)
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

const  Test = () =>{    
    const word = 'order has been created'
    const body = {
        ChoosePayment : "ALL",
        ClientBackURL : "http://localhost:3000/cart",
        EncryptType : 1,
        ItemName : '外送餐點與運費',
        MerchantID : 123,
        MerchantTradeDate : 123,
        MerchantTradeNo : 123 , 
        PaymentType :"aio",
        ReturnURL : "http://localhost:3000/Test",
        TotalAmount : 345,
        TradeDesc :345,
    }
 
    //setCookie()
    //console.log(getCookie('hashpw'))
    console.log(typeof document.cookie)
    window.localStorage.clear()
    return( 
        <div>
            <h6>the {word}</h6>
            <button onClick={()=>cleanCookie('login')}></button>
        </div>
        
    )
}


export default Test