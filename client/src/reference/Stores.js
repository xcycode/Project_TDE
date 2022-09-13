import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StoreCard from './StoreCard'
import ProductCard from '../components/ProductCard'


const Stores = () => {
    const url = `https://62a5b726b9b74f766a3dfc8f.mockapi.io/tde/storelist`
    // const url = `http://140.118.122.148:30307/storelist`
    const [store, setStore] = useState(null)

    let content = null

    useEffect(() => {
        axios.get(url)
            .then(response => {
                // console.log(response.data)
                setStore(response.data)
            })
    }, [url])

    if (store) {
        // const Store = store.msg
        const Store = store[0].msg
        console.log(Store) 
        // console.log(Store.Name)
        // console.log(Store.Image)
        // console.log(Store.Location)

        content =
            Store.map((store) =>
                <StoreCard 
                    stores = { store }
                    key = { store.Name }
                />
            )
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default Stores
