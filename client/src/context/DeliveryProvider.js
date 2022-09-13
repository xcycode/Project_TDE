import { createContext, useState } from 'react'
import axios from 'axios'

const DeliveryContext = createContext({})

export const DeliveryProvider = ({ children }) => {
    const [allOrders, setAllOrders] = useState([])

    const addOrder = async (order) => {
        const Order = {
            ...order,
            Building: getBuilding(order.Destination),
            Res: getStore(order.Location),
        }

        // console.log(Order)
        getOrder(Order)

    }

    const getStore = (location) => {
        if (location === "一餐") {
            return 1
        } else if (location === "三餐") {
            return 3
        } else if (location === "教餐") {
            return 4
        }
    }

    const getBuilding = (destination) => {
        return destination.substring(0, 2)
    }

    const getOrder = (newOrder) => {
        setAllOrders([...allOrders, newOrder])
        // console.log(allOrders)
    }

    const removeOrder = (orderid) => {
        setAllOrders(prevItems => prevItems.filter(order => order.Orderid !== orderid))
        console.log(orderid)
        console.log(allOrders)
    }

    return (
        <DeliveryContext.Provider value={{ allOrders, addOrder, removeOrder }}>
            {children}
        </DeliveryContext.Provider>
    )
}

export default DeliveryContext