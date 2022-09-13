import { createContext, useState, memo } from 'react'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
    const [storeName, setStoreName] = useState('')
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const [building, setBuilding] = useState('AD')
    const [number, setNumber] = useState('')
    const [transaction, setTransaction] = useState('null')


    const addTransaction = (ID) =>{
        setTransaction(ID)
        console.log('ID :' ,ID , ' saved')
    }
   
    const addToCart = (newItem) => {
        const exist = cartItems.find((x) => x.name === newItem.name);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.name === newItem.name
                        ? { ...exist, quantity: exist.quantity + newItem.quantity, price: exist.price + newItem.price }
                        : x
                )
            );
        } else {
            if (newItem.quantity) {
                setCartItems([...cartItems, newItem]);
            }
        }
    }

    const removeFromCart = (cartItem) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== cartItem.name))
        console.log(cartItems)
    }

    const incrementCart = (cartItem) => {
        setCartItems(
            cartItems.map((x) =>
                x.name === cartItem.name
                    ? { ...x, quantity: x.quantity + 1, price: (x.price / x.quantity) + x.price }
                    : x
            )
        );
    }

    const decrementCart = (cartItem) => {
        if (cartItem.quantity > 1) {
            setCartItems(
                cartItems.map((x) =>
                    x.name === cartItem.name
                        ? { ...x, quantity: x.quantity - 1, price: x.price - (x.price / x.quantity) }
                        : x
                )
            );
        }
    };

    const getTotal = (arr) => {
        if (arr.length) {
            return arr.map((x) => x.price).reduce((a, b) => a + b);
        }
        else {
            return 0
        }
    }

    const removeAllItems = () => {
        setCartItems([])
        setTotalPrice(0)
        setBuilding('')
        setNumber('')
        console.log("clearCart")
    }


    const getStoreName = (storename) => {
        setStoreName(storename)
        // console.log(storeName)
    }

    
    return (
        <CartContext.Provider value={{ cartItems, storeName, totalPrice, getStoreName, incrementCart, decrementCart, addToCart, removeFromCart, removeAllItems, getTotal, 
            building, setBuilding, number, setNumber, transaction, addTransaction}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext