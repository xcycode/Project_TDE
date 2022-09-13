import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row, Container, Image, ProgressBar, Button, Stack } from 'react-bootstrap'
import useAuth from "../../hooks/useAuth";
import CartContext from '../../context/CartProvider';
import ChatContext from '../../context/ChatProvider';
import axios from 'axios'
import { GET_ORDER_USER } from '../../api/apiURL';
import TopNav from '../../components/TopNav';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";



const getCookie = (name) => {
	const strCookie = document.cookie;
	const arrCookie = strCookie.split("; ");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] === name) return arr[1];
	}
	return "";
}


const Wait = () => {
    const HOST = "http://localhost:8000"
    // const HOST = "http://140.118.122.148:30308"
    const cleanMap = "https://i.imgur.com/VVkrlih.jpg"
    const navigate = useNavigate()

    let orderContent = null
    let statusContent = null
    const { auth } = useAuth()
    const { removeAllItems } = useContext(CartContext)
    const { ChatReset } = useContext(ChatContext)
    const useraccount = auth.account

    const userAccount = getCookie("account")
    const userRole = getCookie("role")


    const mapStyle = {
        width: '100%'
    }

    const styleButton = {
        backgroundColor: 'rgb(62, 158, 246)',
        border: 'none',
        height: '45px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white'
    }

    const [orders, setOreders] = useState(null)
    const [status, setStatus] = useState("")
    const [mapPicture, setMapPicture] = useState(cleanMap)
    const [deliveryname, setDeliveryName] = useState("")


    useEffect(() => {
        axios.post(GET_ORDER_USER,
            JSON.stringify({ consumer: userAccount }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                setOreders(response.data)
                console.log(response.data)
                setStatus(response.data.msg[0].Status)
            })
            .catch((error) => console.log(error))

        const interval = setInterval(() => {
            checkOrderStatus(interval)
        }, 10000);
    }, []);


    const checkOrderStatus = (interval) => {
        axios.post(GET_ORDER_USER,
            JSON.stringify({ consumer: userAccount }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                // console.log(response.data.msg.length)
                if (response.data.msg.length) {
                    if (response.data.msg[0].Status === "making") {
                        setStatus("making")
                    } else if (response.data.msg[0].Status === "accepted") {
                        setStatus("accepted")
                        setDeliveryName(response.data.msg[0].Delivery)
                    } else if (response.data.msg[0].Status === "token") {
                        setStatus("token")
                        updateMap(`${HOST}/get/` + response.data.msg[0].Orderid + '/deliver/')
                    }
                    else {
                        console.log(response.data.msg[0].Status)
                    }
                } else if (response.data.msg.length === 0) {
                    setStatus("finished")
                    clearInterval(interval)
                    ChatReset()
                    sessionStorage.clear()
                }

            })
            .catch((error) => console.log(error))
    }

    const updateMap = (mapPicture) => {
        setMapPicture(mapPicture + "?" + Math.random())
        console.log("更新地圖", mapPicture)
    }


    if (orders) {
        let Orders = orders.msg
        orderContent =
            Orders.map((order) =>
                <Card className='mt-4' key={order.Orderid}>
                    <Card.Header as="h2">No.{order.Orderid}</Card.Header>
                    <Card.Body >
                        <Card.Title as="h3">店家名稱：{order.Storename}</Card.Title>
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
                        <Card.Title as="h3">外送員姓名：{deliveryname}</Card.Title>
                        <Card.Title as="h3">送達地點：{order.Destination}</Card.Title>
                        <Card.Title as="h3">總金額： ${order.Totalprice}</Card.Title>
                    </Card.Body>
                </Card>
            )

    }
    
    console.log(status)

    return (
        <div>
            <TopNav NavStyle={'onlyProfile'} />
            <Container>
                {status === "token" ? <Image className='mt-3' src={mapPicture} style={mapStyle} /> : <></>}
                {status === "making" ?
                    <div className="d-flex align-items-center justify-content-center mt-4" >
                        {/* <IoMdTime style={{ fontSize: '40px' }}></IoMdTime> */}
                        <div style={{ fontSize: '20px' }}>餐點正在製作中...</div>
                    </div> : <></>
                }
                {status === "accepted" ?
                    <div className="d-flex align-items-center justify-content-center mt-4 mb-3" >
                        {/* <IoMdTime style={{ fontSize: '40px' }}></IoMdTime> */}
                        <div style={{ fontSize: '20px' }}>外送員已接受訂單</div>
                    </div> : <></>
                }
                {/* {status !== "making" ? <Button onClick={() => navigate('/chat')}>聊天室</Button> : <></>} */}

                {status === "finished" ? <></> : orderContent}
                {status === "finished" ?
                    <Stack gap={3}
                        className="col-6 mx-auto "
                        style={{
                            position: 'absolute', left: '50%', top: '35%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <div className="d-flex align-items-center justify-content-center" >
                            <FaCheckCircle style={{ fontSize: "100px", color: "rgb(120, 189, 250)" }} />
                        </div>
                        <div className="d-flex align-items-center justify-content-center" >
                            <div style={{ fontSize: '25px' }}>餐點已送達</div>
                        </div>
                        <Button
                            className='mt-3'
                            style={styleButton}
                            onClick={() => {
                                navigate('/userpage');
                                removeAllItems();
                            }}
                        >
                            返回首頁
                        </Button>
                    </Stack> :
                    <></>
                }
                {status == ("token" || "accepted") ?
                    <Stack className='mt-4'>
                        <Button
                            onClick={() => navigate('/chat')}
                            style={{
                                color: "black",
                                backgroundColor: "white",
                                borderColor: "black",
                                height: "55px"
                            }}
                        >
                            <div style={{ fontSize: "20px" }}>
                                <BsChatText style={{ fontSize: "35px" }} /> 與外送員聯絡
                            </div>
                        </Button>
                    </Stack>
                    : <></>}


            </Container>
        </div>
    )
}

export default Wait