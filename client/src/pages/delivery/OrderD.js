import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeliveryContext from '../../context/DeliveryProvider';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import axios from 'axios'
import { ACCEPT_ORDER_DELIVERY, GET_ORDER_DELIVERY, GET_OWNORDER_DELIVERY, GET_OWNORDER_DELIVERY2 } from '../../api/apiURL'

import useAuth from "../../hooks/useAuth"
import TopNav from '../../components/TopNav'

const getCookie = (name) => {
	const strCookie = document.cookie;
	const arrCookie = strCookie.split("; ");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] === name) return arr[1];
	}
	return "";
}


const OrderD = () => {
    let orderContent = null
    const { auth } = useAuth()
    // const deliveryAccount = auth.account
    const deliveryAccount = getCookie("account")
    const navigate = useNavigate()
    const [orders, setOreders] = useState(null)
    const [show, setShow] = useState(false)
    const [focusorder, setFocusorder] = useState('');

    const { addOrder } = useContext(DeliveryContext)

    // useEffect(() => {
    //     axios.get(GET_ORDER_DELIVERY)
    //         .then(response => {
    //             setOreders(response.data)
    //         })
    // }, [])

    useEffect(() => {
        axios.post(GET_OWNORDER_DELIVERY2, 
            JSON.stringify({ account: deliveryAccount }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                if (response.data.msg.length === 0) {
                    axios.get(GET_ORDER_DELIVERY)
                        .then(response => {
                            setOreders(response.data)
                        })
                } else{
                    response.data.msg.map((order)=>addOrder(order))
                    navigate('/map')
                }
            })
            .catch((error) => console.log(error))
    }, []);

    const handleClose = () => {
        setFocusorder('');
        setShow(false);
    }
    const handleShow = (order) => {
        setFocusorder(order);
        setShow(true);
    }

    const confirmOrder = (order) => {
        axios.post(ACCEPT_ORDER_DELIVERY,
            JSON.stringify({ delivery: deliveryAccount, orderid: order.Orderid }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                // console.log(response)
                // console.log(response.data)
                if (response.data.msg === "success") {
                    addOrder(order)
                    handleClose()
                    navigate('/map')
                }
            })
    }


    if (orders) {
        // let Orders = orders  //mock api
        let Orders = orders.msg     //ntust api
        orderContent =
            Orders.map((order) =>
                <Card className='mt-4' key={order.Orderid}>
                    <Card.Header as="h2">No.{order.Orderid}</Card.Header>
                    <Card.Body >
                        <Card.Title as="h3">取餐地點：{order.Location}</Card.Title>
                        <Card.Title as="h3">店家名稱：{order.Storename}</Card.Title>
                        {/* <Card.Title as="h3">金額： ${order.Totalprice}</Card.Title> */}
                        <Card.Title as="h3">目的地：{order.Destination}</Card.Title>
                        <Row className='mt-3'>
                            <Col xs={2} />
                            <Col >
                                <div className="d-grid">
                                    <Button
                                        style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none', height: '40px', fontSize: '18px' }}
                                        onClick={() => handleShow(order)}
                                    >
                                        接受訂單
                                    </Button>
                                </div>
                            </Col>
                            <Col xs={2} />
                        </Row>
                    </Card.Body>
                </Card>
            )
    }

    return (
        <div>
            <TopNav NavStyle={"onlyProfile"} />
            <Container>
                {orderContent}
            </Container>

            {/* <Link to="/map">跳轉</Link> */}

            <Modal size="sm" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>是否要接受訂單?</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Container >
                        <Row className='mt-1'>
                            <Col xs={1} />
                            <Col >
                                <div className="d-grid">
                                    <Button variant="danger" onClick={() => confirmOrder(focusorder)}>
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
        </div>
    )
}

export default OrderD