import React, { useContext } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import CartContext from '../../context/CartProvider';

const Footer = (props) => {
    let buttonstyle = null
    const { cartItems } = useContext(CartContext)

    const style = {
        backgroundColor: "transparent",
        textAlign: "center",
        padding: "30px",
        position: "fixed",
        left: "0",
        bottom: "20px",
        height: "60px",
        width: "100%"
    };

    const wrapperDiv = {
        display: 'block',
        padding: '20px',
        height: '70px',
        width: '100%',
    }

    if (cartItems.length) {
        if (props.buttontype === "dishlist") {
            buttonstyle =
                <Button
                    style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none', height:'40px' }}
                    onClick={props.tocart}
                >
                    前往購物車
                </Button>
        } else {
            buttonstyle =
                <Button
                    style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none', height:'40px' }}
                    onClick={props.submit}
                >
                    結帳
                </Button>
        }

    }

    return (
        <div>
            <div style={wrapperDiv}></div>
            <Container style={style} fluid>
                <Row>
                    {buttonstyle}
                </Row>
            </Container>
        </div>
    )
}

export default Footer