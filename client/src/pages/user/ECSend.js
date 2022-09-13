
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { MAKE_ORDER_USER } from '../../api/apiURL';



const ECSend = () => {
    const navigate = useNavigate();
    //const { storeName, cartItems, removeAllItems, getTotal, building, number } = useContext(CartContext)
    //let params = useParams();

    const transaction = 'ECPay'//get transactionId in search bar
    //get value from localStorage and sessionStorage
    const consumer = window.sessionStorage.getItem('account')
    const storename = window.sessionStorage.getItem('storename')
    const items = JSON.parse(window.sessionStorage.getItem('items'))
    const destination = window.sessionStorage.getItem('destination')
    console.log(transaction)
    console.log(consumer)
    console.log(storename)
    console.log(items)
    console.log(typeof items)
    console.log(destination)

    useEffect(() => {
        // alert('send order')
        async function send() {
            console.log('send order')
            try {
                const response = await axios.post(MAKE_ORDER_USER,
                    JSON.stringify({
                        consumer: consumer,
                        storename: storename,
                        items: items,
                        destination: destination,
                        transactionid: transaction
                    }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                const msg = response.data.msg;


                if (msg === "success") {
                    console.log("success");
                    //handleClose();
                    navigate('/Wait', { replace: true })
                    window.sessionStorage.clear()//clean all data in session storage

                    return <h1>order sent</h1>
                } else {
                    console.log('order sent failed')
                    return <h1>other</h1>

                }
            } catch (error) {
                alert('Failed');
                console.log(error)
            }
        }

        send()
    }, [])


}
export default ECSend


