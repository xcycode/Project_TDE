import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
import CartContext from '../../context/CartProvider';
import queryString from "query-string";
import { FAST_HOST } from '../../api/apiURL';

const LPSuccess = () => {
  const parsed = queryString.parse(window.location.search); 
  const navigate = useNavigate();
  const transaction = parsed.transactionId // get the transactionId in the search bar
  const amount = window.sessionStorage.getItem('amount') // get amount value in session storage
  const url = `${FAST_HOST}/linepay/confirm/${transaction}` 
  console.log('transactionID : ',transaction)
  const header = {
      'Content-Type': 'application/json',
    }
  
  const body = {
      amount : amount,
      currency : 'TWD'
  }

  //send linepay confirm to get money
  useEffect(()=> {
    async function send(){
      console.log('send LP confirm')
      try{
        const linePayRes = await axios.post(url, body, {header})
        console.log('LPResponse ', linePayRes)
        
        if(linePayRes?.data.returnCode == '0000'){
          console.log('confirm fine')
          navigate(`/LPConfirm/${transaction}` , {replace: true})
          
        }else{
          console.log('confirming failed')
        }
  
      }catch(error){
          console.log(error)
          console.log('error')
      }
    }
    send()
  },[])
  

  
  
}

export default LPSuccess