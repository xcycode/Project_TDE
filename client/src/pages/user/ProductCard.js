import React, { useContext, useState } from 'react'
import { Accordion, Button, Stack } from 'react-bootstrap'
import { AiTwotoneTags } from "react-icons/ai";
import CartContext from '../../context/CartProvider';

const ProductCard = (props) => {
    const [quantity, setQuantity] = useState(0);
    const priceNum = Number(props.products.Price)

    const { addToCart, cartItems } = useContext(CartContext)

    const increment = () => {
        setQuantity(quantity + 1);
    };

    const decrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const cartStatus = () => {
        const alreadyInCart = cartItems.some(item => item.name === props.products.Name)
        if (alreadyInCart) {
            return <AiTwotoneTags style={{ color: 'red' }}></AiTwotoneTags>
        }
    }

    return (
        <div>
            <Accordion flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{cartStatus()}&nbsp;{props.products.Name} $ {priceNum}</Accordion.Header>
                    <Accordion.Body>
                        <Stack gap={2} className="col-md-5 mx-auto">
                            <Stack direction="horizontal" gap={3}>
                                金額: $ {quantity * priceNum}
                                <Button
                                    style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none' }}
                                    className="ms-auto"
                                    onClick={decrement}
                                >-</Button>
                                {quantity}
                                <Button
                                    style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none' }}
                                    onClick={increment}
                                >+</Button>
                            </Stack>
                            <Button
                                style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none' }}
                                onClick={() => {
                                    addToCart({
                                        name: props.products.Name,
                                        price: quantity * priceNum,
                                        quantity: quantity
                                    })
                                    setQuantity(0)
                                }}
                            >加入購物車</Button>
                        </Stack>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default ProductCard