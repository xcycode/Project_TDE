import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import useAuth from "../../hooks/useAuth";
import axios from 'axios'
import { GET_OWNORDER_DELIVERY, TAKEN_ORDER_DELIVERY, GET_ORDER_DELIVERY, FINISHED_ORDER_DELIVERY } from '../../api/apiURL'
import FooterD from './FooterD'
import TopNav from '../../components/TopNav'
import { Navigate, useNavigate } from 'react-router-dom';

const getCookie = (name) => {
	const strCookie = document.cookie;
	const arrCookie = strCookie.split("; ");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] === name) return arr[1];
	}
	return "";
}

const Deliver = () => {
    let orderContent = null
    const { auth } = useAuth()
    // const deliveryAccount = auth.account
    const deliveryAccount = getCookie("account")
    const navigate = useNavigate()
    const [orders, setOreders] = useState(null)
    const [show, setShow] = useState(false)
    const [orderstatus, setOrderstatus] = useState("")
    const [focusorder, setFocusorder] = useState('');

    // const url = 'https://62a5b726b9b74f766a3dfc8f.mockapi.io/tde/ownorder'
    // const update = 'https://62a5b726b9b74f766a3dfc8f.mockapi.io/tde/update'


    useEffect(() => {
        axios.post(GET_OWNORDER_DELIVERY,
            JSON.stringify({ account: deliveryAccount }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                console.log(response.data)
                // console.log(response.data.msg[0].Status)
                setOrderstatus(response.data.msg[0].Status)
                setOreders(response.data)
            })
            .catch((error) => console.log(error))
    }, [deliveryAccount]);


    const handleClose = () => {
        setFocusorder('');
        setShow(false);
    }
    const handleShow = (order) => {
        setFocusorder(order);
        setShow(true);
    }

    const taken = (order) => {
        axios.post(TAKEN_ORDER_DELIVERY, 
            JSON.stringify({ orderid: order.Orderid, delivery: deliveryAccount }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                // console.log(response.data)
                if (response.data.msg === "success") {
                    setOrderstatus("token")
                    // console.log("taken")
                    handleClose()
                }
            })
    }

    const arrived = (order) => {
        // console.log(order)
        axios.post(FINISHED_ORDER_DELIVERY, 
            JSON.stringify({ orderid: order.Orderid, delivery: deliveryAccount }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                console.log(response.data)
                if (response.data.msg.Message === "success") {
                    setOrderstatus("arrived")
                    // console.log("arrived")
                    handleClose()
                    navigate('/finished')
                }
            })
    }

    
    if (orders) {
        let Orders = orders.msg
        orderContent =
            Orders.map((order) =>
                <Card className='mt-4' key={order.Orderid}>
                    <Card.Header as="h2">No.{order.Orderid}</Card.Header>
                    <Card.Body >
                        <Card.Title as="h3">取餐地點：{order.Location}-{order.Storename}</Card.Title>
                        <Card.Title as="h3">訂單資訊：</Card.Title>
                        <Container className='mb-2 mt-2'>
                            {order.Dishes.map((item) =>
                                <Row className='mb-1 mt-1' key={item.Name}>
                                    <Col xs={8}>
                                        <Card.Text as="h3">{item.Name} ${item.Price}</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text as="h3">x {item.Quantity}</Card.Text>
                                    </Col>
                                </Row>
                            )}
                        </Container>
                        <Card.Title as="h3">總金額： ${order.Totalprice}</Card.Title>
                        <Card.Title as="h3">訂購人姓名：{order.Consumer}</Card.Title>
                        <Card.Title as="h3">目的地：{order.Destination}</Card.Title>
                        <Row className='mt-3'>
                            <Col xs={2} />
                            <Col >
                                {orderstatus === "token" ?
                                    <div className="d-grid">
                                        <Button
                                            style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none', height: '40px', fontSize: '18px' }}
                                            onClick={() => handleShow(order)}
                                        >
                                            已送達
                                        </Button>
                                    </div> :
                                    <div className="d-grid">
                                        <Button
                                            style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none', height: '40px', fontSize: '18px' }}
                                            onClick={() => handleShow(order)}
                                        >
                                            已取餐
                                        </Button>
                                    </div>}
                            </Col>
                            <Col xs={2} />
                        </Row>
                    </Card.Body>
                </Card>
            )
    }

    return (
        <div>
            <TopNav NavStyle={'onlyProfile'} />
            <Container fluid>
                {orderContent}
            </Container>
            <FooterD isMapPage={0}/>


            <Modal size="sm" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    {orderstatus==="accepted"
                        ?<Modal.Title>是否完成取餐?</Modal.Title>
                        :orderstatus==="token" 
                            ?<Modal.Title>是否送達訂單?</Modal.Title>
                            :<></>
                    }
                </Modal.Header>
                <Modal.Body >
                    <Container >
                        <Row className='mt-1'>
                            <Col xs={1} />
                            <Col >
                                <div className="d-grid">
                                    <Button variant="danger" onClick={() => {
                                        if(orderstatus==="accepted"){
                                            taken(focusorder);    
                                        }else if(orderstatus==="token"){
                                            arrived(focusorder);
                                        }
                                    }}>
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

export default Deliver