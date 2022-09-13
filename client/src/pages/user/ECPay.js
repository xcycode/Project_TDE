import React , {useContext, useEffect, useState}from 'react'
import CartContext from '../../context/CartProvider';
import SHA256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
import { FAST_HOST,WEB_SERVER } from '../../api/apiURL';

const timeProduce = () => {
    const temp = new Date().toISOString().slice(0,19);
    const time = new Date(`${temp}-08:00`).toISOString().slice(0,19).replace('T', ' ').replaceAll('-', '/')
    return time
}

const macValue = (body) => {
    
    let temp = {
        HashKey : process.env.REACT_APP_HASHKEY
    }
    for (const key in body) temp[key] = body[key]
    temp['HashIV'] = process.env.REACT_APP_HASHIV
    
    let word;
    for (const key in temp) {
        if (word == null ){
            word = `${key}=${temp[key]}&`
        }else{
             word = `${word}${key}=${temp[key]}&`
        }
    }
    word = word.slice(0, word.length-1)
    word = encodeURIComponent(word).toLowerCase().replaceAll('%20', '+')
    const encrypt = SHA256(word).toString(CryptoJS.enc.Hex).toUpperCase()
    
    console.log('word',encrypt)
    return encrypt
}

const ordermake = (time, amount, cartItems) => {
    const MerchantID = process.env.REACT_APP_MERCHANTID
    const storename = window.sessionStorage.getItem('storename')
    const unit_time = timeProduce()

    /*const body = {
        ChoosePayment : "Credit",
        ClientBackURL : "http://localhost:3000/Test",
        EncryptType : 1,
        ItemName : '外送餐點與運費',
        MerchantID : MerchantID,
        MerchantTradeDate : unit_time,
        MerchantTradeNo : `TDE${time}` , 
        OrderResultURL : 'https://464d-140-118-152-211.jp.ngrok.io/ECSend',
        PaymentType :"aio",
        ReturnURL : "https://1b21-140-118-152-211.jp.ngrok.io",
        TotalAmount : amount,
        TradeDesc :storename,
    }*/
    const body = {
        ChoosePayment : "Credit",
        ClientBackURL : `${WEB_SERVER}/ECSend`,
        EncryptType : 1,
        ItemName : '外送餐點與運費',
        MerchantID : MerchantID,
        MerchantTradeDate : unit_time,
        MerchantTradeNo : `TDE${time}` , 
        PaymentType :"aio",
        ReturnURL : `${WEB_SERVER}/ECSend`,
        TotalAmount : amount,
        TradeDesc :storename,
    }
    const value = macValue(body)
    console.log(body)
    
   /* const html = 
        <div>
            <input type="hidden" name="ChoosePayment" value="Credit" />
            <input type="hidden" name="ClientBackURL" value="http://localhost:3000/Test" />
            <input type="hidden" name="EncryptType" value="1" />
            <input type="hidden" name="ItemName" value="外送餐點與運費" />
            <input type="hidden" name="MerchantID" value={MerchantID} />
            <input type="hidden" name="MerchantTradeDate" value={unit_time} />
            <input type="hidden" name="MerchantTradeNo" value={`TDE${time}`} />
            <input type="hidden" name="OrderResultURL" value="https://464d-140-118-152-211.jp.ngrok.io/ECSend" />
            <input type="hidden" name="PaymentType" value="aio" />
            <input type="hidden" name="ReturnURL" value="https://1b21-140-118-152-211.jp.ngrok.io" />
            <input type="hidden" name="TotalAmount" value={amount} />
            <input type="hidden" name="TradeDesc" value={storename} />
            <input type="hidden" name="CheckMacValue" value={value} />
       </div>*/
    const html = 
        <div>
            <input type="hidden" name="ChoosePayment" value="Credit" />
            <input type="hidden" name="ClientBackURL" value={`${WEB_SERVER}/ECSend`}/>
            <input type="hidden" name="EncryptType" value="1" />
            <input type="hidden" name="ItemName" value="外送餐點與運費" />
            <input type="hidden" name="MerchantID" value={MerchantID} /> 
            <input type="hidden" name="MerchantTradeDate" value={unit_time} />
            <input type="hidden" name="MerchantTradeNo" value={`TDE${time}`} />
            <input type="hidden" name="PaymentType" value="aio" />
            <input type="hidden" name="ReturnURL" value={`${WEB_SERVER}/ECSend`} />
            <input type="hidden" name="TotalAmount" value={amount} />
            <input type="hidden" name="TradeDesc" value={storename} />
            <input type="hidden" name="CheckMacValue" value={value} />
        </div>
    return html
}



const ECPay = () =>{
    const time = new Date().getTime().toString();
    const {cartItems, getTotal} = useContext(CartContext)
    const amount = getTotal(cartItems)
    const url = process.env.REACT_APP_ECP_URL+ process.env.REACT_APP_ECP_SEND_ORDER
    const Body = ordermake(time, amount, cartItems)

    let fm
    useEffect(() => {
        fm = document.getElementById('order')
        fm.submit()
        console.log(fm)
    }, [])
    
    return (
        <form id='order' action={url} method='post' acceptCharset="UTF-8">
            {Body}
            
        </form>
    )

}
  

export default ECPay