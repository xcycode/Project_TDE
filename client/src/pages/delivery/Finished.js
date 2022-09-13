import React, { useContext, useEffect } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import DeliveryContext from '../../context/DeliveryProvider'
import ChatContext from '../../context/ChatProvider';
import axios from 'axios'
import TopNav from '../../components/TopNav'
import { FaCheckCircle } from "react-icons/fa";

const Finished = () => {
    const { allOrders, removeOrder } = useContext(DeliveryContext)
    const { ChatReset } = useContext(ChatContext)
    // const DELETEMAP = `http://localhost:8000/del/${allOrders[0].Orderid}`
    const navigate = useNavigate()

    const styleButton = {
        backgroundColor: 'rgb(62, 158, 246)',
        border: 'none',
        height: '45px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white'
    }

    useEffect(() => {
        // console.log(allOrders)
        ChatReset()
        axios.get(`http://localhost:8000/del/${allOrders[0].Orderid}`).then(
            removeOrder(allOrders[0].Orderid)
        )
    }, []);

    return (
        <div>
            <TopNav NavStyle={'onlyProfile'} />
            <Container>
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
                        onClick={() => navigate('/deliverypage')}
                    >
                        返回首頁
                    </Button>
                </Stack>
            </Container>
        </div>
    )
}

export default Finished