import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Col, Container, Form, Modal, Row, Stack } from 'react-bootstrap';
import { FaEthereum } from "react-icons/fa";
import { BsCashCoin, BsCreditCard2BackFill } from "react-icons/bs";
import { GiCash } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

import CartContext from '../../context/CartProvider';
import useAuth from '../../hooks/useAuth';
import axios from 'axios'
import { MAKE_ORDER_USER } from '../../api/apiURL';


import Footer from './Footer';
import TopNav from '../../components/TopNav';

const NUMBER_REGEX = /^[1-9]\d{2,3}$/;

const getCookie = (name) => {
    const strCookie = document.cookie;
    const arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}

const Cart = () => {
    let Items = null;
    let Price = null;
    let Position = null;
    let Payment = null;
    const { auth } = useAuth()
    const { storeName, cartItems, removeFromCart, incrementCart, decrementCart, getTotal } = useContext(CartContext)
    const navigate = useNavigate();
    const account = getCookie('account')

    const [building, setBuilding] = useState('AD')
    const [number, setNumber] = useState('')
    const [validNumber, setValidNumber] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [show, setShow] = useState(false)
    const [LP, setLP] = useState(false);
    const [ECP, setECP] = useState(false);


    const styleIcon = {
        fontSize: '60px'
    }

    const handleClose = () => {
        setShow(false);
        setECP(false)
        setLP(false)
    }
    const handleShowECP = () => {
        setShow(true);
        setECP(true)
    }
    const handleShowLP = () => {
        setShow(true)
        setLP(true)
    }

    const handleShow = () => {
        setShow(true);
    }

    useEffect(() => {
        setValidNumber(NUMBER_REGEX.test(number));
    }, [number])

    const submitOrder = async () => {
        let cartitems = []
        cartItems.forEach((x) => {
            let { price, ...cartitem } = x                      //移除price欄位
            cartitem.quantity = cartitem.quantity.toString()    //number轉為string
            cartitems.push(cartitem)
        })

        const data = {
            consumer: account,
            storename: storeName,
            items: cartitems,
            destination: building + "-" + number
        }

        window.sessionStorage.setItem('storename', storeName)
        window.sessionStorage.setItem('account', account)
        window.sessionStorage.setItem('items', JSON.stringify(cartitems))
        window.sessionStorage.setItem('destination', building + '-' + number)

        const orderID = parseInt(new Date().getTime() / 10000);
        if (LP) {
            navigate(`/LPProcess`, { replace: true })
        } else if (ECP) {
            navigate(`/ECPay`, { replace: true })
        } else {
            axios.post(MAKE_ORDER_USER,
                JSON.stringify({
                    consumer: account,
                    storename: storeName,
                    items: cartitems,
                    destination: building + "-" + number
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
                .then(response => {
                    const msg = response.data.msg;
                    console.log(msg);
                    if (msg === "success") {
                        handleClose();
                        navigate("/Wait", { replace: true });
                    } else if (msg === "insufficient balance") {
                        setErrMsg('insufficient balance');
                    }
                })
                .catch((error) => console.log(error))

        }

    }

    if (cartItems.length) {
        Items =
            cartItems.map((item) =>
                <Stack gap={1} className="col-md-5 mx-auto" key={item.name}>
                    <Stack direction="horizontal" gap={3}>
                        <h3>
                            {item.name}
                        </h3>
                        <h3 className="ms-auto">
                            金額: $ {item.price}
                        </h3>
                    </Stack>
                    <Stack direction="horizontal" gap={3}>
                        <Button
                            style={{ backgroundColor: 'red', border: 'none' }}
                            onClick={() =>
                                removeFromCart(item)
                            }
                        >刪除</Button>
                        <Button
                            style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none' }}
                            className="ms-auto"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                                decrementCart(item)
                            }
                        >-</Button>
                        {item.quantity}
                        <Button
                            style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none' }}
                            onClick={() =>
                                incrementCart(item)
                            }
                        >+</Button>
                    </Stack>
                </Stack>
            )
        Price =
            <Row className="g-2 mx-2">
                <Stack gap={2} className="col-md-5 mx-auto">
                    <Stack direction="horizontal" gap={3}>
                        <h3>餐點費用</h3>
                        <h3 className="ms-auto">$ {getTotal(cartItems)}</h3>
                    </Stack>
                    <Stack direction="horizontal" gap={3}>
                        <h3>外送費用</h3>
                        <h3 className="ms-auto">$ {10}</h3>
                    </Stack>
                    <Stack direction="horizontal" gap={3}>
                        <h3>總計</h3>
                        <h3 className="ms-auto">$ {getTotal(cartItems) + 10}</h3>
                    </Stack>
                </Stack>
            </Row>

        Position =
            <Row className="g-2 mx-2">
                <Stack direction="horizontal" gap={3}>
                    <Col sm={2}>
                        <Form.Select
                            aria-label="Default select example"
                            size="lg"
                            onChange={(e) => setBuilding(e.target.value)}
                        >
                            <option value={'AD'}>AD</option>
                            <option value={'D1'}>D1</option>
                            <option value={'D2'}>D2</option>
                            <option value={'D3'}>D3</option>
                            <option value={'E1'}>E1</option>
                            <option value={'E2'}>E2</option>
                            <option value={'TR'}>TR</option>
                            <option value={'GYM'}>GYM</option>
                            <option value={'IA'}>IA</option>
                            <option value={'IB'}>IB</option>
                            <option value={'LB'}>LB</option>
                            <option value={'MA'}>MA</option>
                            <option value={'RB'}>RB</option>
                            <option value={'S'}>S</option>
                            <option value={'T1'}>T1</option>
                            <option value={'T2'}>T2</option>
                            <option value={'T3'}>T3</option>
                            <option value={'T4'}>T4</option>
                            <option value={'TR'}>TR</option>
                        </Form.Select>
                    </Col>
                    -
                    <Col>
                        <Form.Control
                            className="me-auto"
                            size="lg"
                            placeholder="請輸入號碼"
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </Col>
                </Stack>
            </Row>
        Payment =
            <div>
                <Row className='mt-1 mb-4'>
                    {/* <Col xs={1} /> */}
                    <Col >
                        <div className="d-grid">
                            <Button variant="outline-secondary" disabled={!validNumber}>
                                <GiCash style={styleIcon} onClick={() => { handleShow() }} />
                                <br></br>
                                <b>現金支付</b>
                            </Button>
                        </div>
                    </Col>
                    <Col >
                        <div className="d-grid">
                            <Button variant="outline-secondary" disabled={!validNumber}>
                                <BsCreditCard2BackFill style={styleIcon} onClick={() => { handleShowLP() }} />
                                <br></br>
                                <b>Line Pay</b>
                            </Button>
                        </div>
                    </Col>
                    <Col >
                        <div className="d-grid">
                            <Button variant="outline-secondary" disabled={!validNumber}>
                                <RiSecurePaymentLine style={styleIcon} onClick={() => { handleShowECP() }} />
                                <br></br>
                                <b>綠界支付</b>
                            </Button>
                        </div>
                    </Col>
                    {/* <Col xs={1} /> */}
                </Row>
            </div>
    }

    return (
        <div>
            <TopNav NavStyle={"onlyGoback"} />
            <Container>
                <Row className="g-2 mt-2 mx-2">
                    <h1>餐點</h1>
                    <hr></hr>
                </Row>
                <Row className="g-2 mx-2">
                    {Items}
                </Row>
                <Row className="g-2 mt-1 mx-2">
                    <h1>費用</h1>
                    <hr></hr>
                </Row>
                {Price}
                <Row className="g-2 mt-1 mx-2">
                    <h1>取餐地點</h1>
                    <hr></hr>
                </Row>
                {Position}
                <Row className="g-2 mt-1 mx-2">
                    <h1>付款方式</h1>
                    <hr></hr>
                </Row>
                {Payment}
            </Container>

            <Modal size="sm" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>是否提交訂單?</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Container >
                        <Row className='mt-1 mb-1'>
                            <Col><h3>總金額：$ {getTotal(cartItems) + 10}</h3></Col>
                        </Row>
                        <Row className='mt-1 mb-2'>
                            <Col><h3>取餐地點：{building}-{number}</h3></Col>
                        </Row>
                        <Row className='mt-1'>
                            <Col xs={1} />
                            <Col >
                                <div className="d-grid">
                                    <Button variant="danger" type="submit" onClick={submitOrder}>
                                        是
                                    </Button>
                                </div>
                            </Col>
                            <Col >
                                <div className="d-grid">
                                    <Button variant="outline-secondary" onClick={handleClose}>
                                        否
                                    </Button>
                                </div>
                            </Col>
                            <Col xs={1} />
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>

            {/* <Footer buttontype={"cart"} submit={submitOrder} /> */}
        </div >
    )
}

export default Cart