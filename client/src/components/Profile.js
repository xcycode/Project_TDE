import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Modal, Row, Stack } from 'react-bootstrap';
import useAuth from "../hooks/useAuth";
import CartContext from '../context/CartProvider';
import axios from 'axios'
import { GET_INFO_STORE, GET_INFO_USER, SIGN_UP_DELIVERY } from '../api/apiURL';
import TopNav from './TopNav';

const cleanCookie = (name) => {
    console.log('clean ', name)
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

const getCookie = (name) => {
    const strCookie = document.cookie;
    const arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] === name) return arr[1];
    }
    return "";
}

const Profile = () => {
    let content = null
    let url = ""
    const navigate = useNavigate()
    const { auth } = useAuth()
    const { setAuth } = useAuth()
    const { removeAllItems } = useContext(CartContext)
    const user = auth.account

    const useraccount = getCookie("account")
    const userRole = getCookie("role")

    const [userprofile, setUserprofile] = useState(null)
    const [show, setShow] = useState(false)


    const textStyle1 = {
        fontSize: '25px'
    }
    const textStyle2 = {
        fontSize: '30px'
    }

    const buttonStyle = {
        backgroundColor: 'rgb(62, 158, 246)',
        border: 'none',
        fontSize: '25px',
        color: 'white'
    }


    if (userRole === "restaurant") {
        console.log('res')
        url = GET_INFO_STORE
    } else {
        console.log('user')
        url = GET_INFO_USER
    }

    useEffect(() => {
        console.log(useraccount)
    }, []);

    

    useEffect(() => {
        if (useraccount !== "") {
            axios.post(url,
                JSON.stringify({ account: useraccount }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
                .then(response => {
                    setUserprofile(response.data.msg)
                    // console.log(response?.data)
                })
                .catch((error) => console.log(error))
        }
    }, [url]);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    const logout = () => {
        if (userRole === "user") {
            removeAllItems()
        }
        cleanCookie('login')
        cleanCookie('account')
        cleanCookie('role')
        setAuth({})
        navigate('/')
    }

    const signup = (account, password) => {
        axios.post(SIGN_UP_DELIVERY,
            JSON.stringify({ account, password }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                if (response?.data.msg === "success") {
                    // console.log(response.data.msg)
                    setUserprofile((prev) => ({ ...prev, Deliver_accept: true }))
                    handleClose()
                } else {
                    console.log(response.data.msg)
                }
            })
    }

    if (userprofile && userRole === "restaurant") {
        content =
            <div>
                <Row style={textStyle1} className='mx-2 mt-5'> Name :</Row>
                <Row style={textStyle2} className='mx-2'>{userprofile.Storename}</Row>
                <Row style={textStyle1} className='mx-2'> Account :</Row>
                <Row style={textStyle2} className='mx-2'>{userprofile.Account}</Row>
                <Row style={textStyle1} className='mx-2'> Email :</Row>
                <Row style={textStyle2} className='mx-2'>{userprofile.Email}</Row>
                <Row style={textStyle1} className='mx-2'> Phone :</Row>
                <Row style={textStyle2} className='mx-2'>{userprofile.Phone}</Row>
                <Row style={textStyle1} className='mx-2'> Location :</Row>
                <Row style={textStyle2} className='mx-2'>{userprofile.Location}</Row>
                <Row className='mt-3'>
                    <Col xs={2} />
                    <Col >
                        <div className="d-grid">
                            <Button style={buttonStyle} onClick={logout}>
                                LogOut
                            </Button>
                        </div>
                    </Col>
                    <Col xs={2} />
                </Row>
            </div>
    } else if (userprofile) {
        const account = userprofile.Account
        const password = userprofile.Password
        content =
            <div>
                <Row style={textStyle1} className='mx-2 mt-5'> Name :</Row>
                <Row style={textStyle2} className='mx-2'>{userprofile.Name}</Row>
                <Row style={textStyle1} className='mx-2'> Account :</Row>
                <Row style={textStyle2} className='mx-2'>{userprofile.Account}</Row>
                <Row style={textStyle1} className='mx-2'> Email :</Row>
                <Row style={textStyle2} className='mx-2'>{userprofile.Email}</Row>
                <Row style={textStyle1} className='mx-2'> Phone :</Row>
                <Row style={textStyle2} className='mx-2'>{userprofile.Phone}</Row>
                <Row className='mt-3'>
                    <Col xs={2} />
                    <Col >
                        <div className="d-grid">
                            <Button style={buttonStyle} onClick={logout}>
                                LogOut
                            </Button>
                        </div>
                    </Col>
                    <Col xs={2} />
                </Row>
                <Row className='mt-3'>
                    <Col xs={2} />
                    <Col >
                        {userprofile.Deliver_accept
                            ? <></>
                            :
                            <div className="d-grid">
                                <Button style={buttonStyle} onClick={() => handleShow()}>
                                    註冊為外送員
                                </Button>
                            </div>
                        }
                    </Col>
                    <Col xs={2} />
                </Row>
            </div>
    }

    return (
        <div>
            <TopNav NavStyle={"onlyGoback"} />
            <Container className=''>
                {content}
            </Container>

            <Modal size="sm" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>是否要註冊為外送員?</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Container >
                        <Row className='mt-1'>
                            <Col xs={1} />
                            <Col >
                                <div className="d-grid">
                                    <Button variant="danger" onClick={() => signup()}>
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

export default Profile