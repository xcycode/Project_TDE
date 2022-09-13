import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Stack } from 'react-bootstrap'
import useAuth from "../../hooks/useAuth";
import axios from 'axios'
import { DELETE_DISH, GET_DISH_LIST, GET_INFO_STORE, UPLOAD_DISH } from '../../api/apiURL';
import FooterR from './FooterR';
import TopNav from '../../components/TopNav';

const NAME_REGEX = /^[\u4e00-\u9fa5A-z0-9-_]{1,15}$/;
const PRICE_REGEX = /^[1-9]\d{0,2}$/;

const DishlistR = () => {
    let content = null

    const { auth } = useAuth()
    const storeAccount = auth.account

    const [storeName, setStoreName] = useState('')
    const [product, setProduct] = useState('');
    const [show, setShow] = useState('');
    const [focusitem, setFocusitem] = useState('');
    const [validName, setValidName] = useState(false)
    const [validPrice, setValidPrice] = useState(false)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(0)
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        setValidName(NAME_REGEX.test(productName));
    }, [productName])

    useEffect(() => {
        setValidPrice(PRICE_REGEX.test(productPrice));
    }, [productPrice])

    useEffect(() => {
		axios.post(GET_INFO_STORE,
			JSON.stringify({ account: storeAccount }),
			{
				headers: { 'Content-Type': 'application/json' },
			}
		)
			.then(response => {
				setStoreName(response.data.msg.Storename)
			})
			.catch((error) => console.log(error))
	}, []);

    useEffect(() => {
        axios.post(GET_DISH_LIST,
            JSON.stringify({ storename: storeName }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                setProduct(response?.data)
            })
            .catch((error) => console.log(error))
    }, [storeName, show]);

    const handleClose = () => {
        setFocusitem('');
        setShow('');
        setErrMsg('');
    }
    const handleShow = (item) => {
        setFocusitem(item);
        setShow("edit");
    }

    const deletedish = (itemName) => {
        // console.log(storeAccount)
        // console.log(itemName)
        axios.post(DELETE_DISH,
            JSON.stringify({ account: storeAccount, dish: itemName }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                // console.log(response.data)
                if (response.data.msg === "success") {
                    handleClose()
                }
            })
    }

    const upload = () => {
        // console.log(storeAccount)
        axios.post(UPLOAD_DISH,
            JSON.stringify({ account: storeAccount, dish: productName, price: productPrice }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                if (response.data.msg === "success") {
                    setProductName('')
                    setProductPrice(0)
                    setShow('');
                    // console.log(response.data.msg)
                } else {
                    setErrMsg("you have upload already")
                    // console.log(errMsg)
                }
            })
    }

    if (product) {
        const Product = product.msg

        content =
            Product.map((item) =>
                <Stack direction="horizontal" gap={3} key={item.Name} >
                    <div 
                        className="d-flex align-items-center me-auto"
                        style={{fontSize:'20px'}}
                    >
                        {item.Name} ${item.Price}
                    </div>
                    <Button variant="danger" onClick={() => {
                        setFocusitem(item)
                        setShow("delete")
                    }}>
                        刪除
                    </Button>
                </Stack>
            )
    }

    return (
        <div>
            <TopNav NavStyle={"onlyGoback"} />
            <Container>
                <Stack gap={3} className="mt-4">
                    {content}
                </Stack>
            </Container>

            <Modal size="sm" show={show === "add" ? true : false} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>新增品項</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>名稱</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => {
                                    setProductName(e.target.value)
                                    // console.log(productName)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>價格</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setProductPrice(Number(e.target.value))}
                            />
                        </Form.Group>
                        {errMsg === "you have upload already" ? <div style={{ color: 'red' }}>已有相同品項</div> : <></>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        取消
                    </Button>
                    <Button variant="primary" onClick={upload} disabled={!(validName && validPrice)}>
                        確認
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal size="sm" show={show === "delete" ? true : false} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>確認是否刪除</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Container >
                        <Row className='mt-1'>
                            <Col xs={1} />
                            <Col >
                                <div className="d-grid">
                                    <Button variant="danger" onClick={() => deletedish(focusitem.Name)}>
                                        確認
                                    </Button>
                                </div>
                            </Col>
                            <Col >
                                <div className="d-grid">
                                    <Button variant="outline-secondary" onClick={handleClose}>
                                        取消
                                    </Button>
                                </div>
                            </Col>
                            <Col xs={1} />
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>

            <FooterR addItem={() => setShow("add")} />

            {/* <Modal size="sm" show={show === "edit" ? true : false} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>編輯品項</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="FormItemName">
                            <Form.Label>名稱</Form.Label>
                            <Form.Control type="text" placeholder={focusitem.Name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="FormItemPrice">
                            <Form.Label>價格</Form.Label>
                            <Form.Control type="text" placeholder={focusitem.Price} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        取消
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        確認
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
    )
}

export default DishlistR