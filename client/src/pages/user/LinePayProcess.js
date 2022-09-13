import React , {useContext, useEffect, useState}from 'react'
import axios from 'axios'
import CartContext from '../../context/CartProvider';
import { FAST_HOST , WEB_SERVER} from '../../api/apiURL';

const ordermake = (orderID, amount, cartItems) => {
  let temp = null

  const deliverFee = {
    name : 'shipping',
    quantity : 1,
    price : 10
  }

  temp = cartItems.map((item) => {
    return {
        name : item.name,
        quantity: item.quantity,
        price : (item.price / item.quantity)
      }

    })

  temp.push(deliverFee) // to append shipping fee into the item list, especially for linepay

  //make order
 const order = {
    amount : amount,
    orderId : orderID,
    currency : 'TWD',
    packages : [{
        id : 'product',
        amount: amount,
        name : 'order',
        products: temp
      }],
    redirectUrls : {
      confirmUrl : `${WEB_SERVER}/LPSuccess`,
      cancelUrl : `${WEB_SERVER}/LPFailed`
    }

  }
  return order
}


const LPProcess = () =>{
  //const navigate = useNavigate();
  const nonce = new Date().getTime();
  const  orderID  = nonce.toString();
  const {cartItems, getTotal, transaction, addTransaction} = useContext(CartContext)
  const amount = getTotal(cartItems) + 10
  const url = `${FAST_HOST}/linepay/request/`
  const header = {
    'Content-Type': 'application/json',
  }

  //linepay request
  useEffect(()=>{

    async function send(){
      console.log('send LP request')
      try {
        
        const order = ordermake(orderID , amount, cartItems)
        console.log('order : ', order)
        const linePayRes = await axios.post(url, order, {header});
        console.log('LPR ', linePayRes)
        
        if (linePayRes?.data?.returnCode === '0000' && transaction == 'null') {
          console.log('0000') // linepay success code
          window.sessionStorage.setItem('amount', amount) //store the amount of the order 
          window.location.replace(linePayRes?.data?.web_url) // redirect to linepay
        }else {
          console.log('failed')
        }
      } catch (error) {
      
        console.log('error');
        console.log(error);
        
      }

      
    }
    send()
  },[])
    
  
  
}

  

export default LPProcess