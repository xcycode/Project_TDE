import React, { useContext, useState } from 'react'
import '../App.css'
import { useNavigate, Link } from "react-router-dom"
import { Button, Modal, Nav, Navbar } from 'react-bootstrap';
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineLeft } from "react-icons/ai";
import CartContext from '../context/CartProvider';



const TopNav = (props) => {
    let navcontent = ''
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const { removeAllItems } = useContext(CartContext)
    const [show, setShow] = useState(false);


    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    if (props.NavStyle === "onlyProfile") {
        navcontent =
            <Navbar fixed="top" expand="lg" className='bg-nav' style={{ height: '50px' }}>
                <Nav.Item className='align-baseline ms-auto me-3'>
                    <Link to="/Profile" ><AiOutlineUser style={{ color: 'black', fontSize: '25px' }} /></Link>
                </Nav.Item>
            </Navbar>
    } else if (props.NavStyle === "onlyGoback") {
        navcontent =
            <Navbar fixed="top" expand="lg" className='bg-nav' style={{ height: '50px' }}>
                <Nav.Item className='align-baseline ms-3'>
                    <AiOutlineLeft onClick={goBack} style={{ color: 'black', fontSize: '25px' }} />
                </Nav.Item>
            </Navbar>
    } else if (props.NavStyle === "userDishlist") {
        navcontent =
            <Navbar fixed="top" expand="lg" className='bg-nav' style={{ height: '50px' }}>
                <Nav.Item className='align-baseline ms-3'>
                    <AiOutlineLeft
                        onClick={
                            handleShow
                        }
                        style={{ color: 'black', fontSize: '25px' }}
                    />
                </Nav.Item>

                <Nav.Item className='align-baseline ms-auto me-3'>
                    <Link to="/Profile" ><AiOutlineUser style={{ color: 'black', fontSize: '25px' }} /></Link>
                </Nav.Item>

                <Nav.Item className='align-baseline me-3'>
                    <Link to="/Cart" ><AiOutlineShoppingCart style={{ color: 'black', fontSize: '25px' }} /></Link>
                </Nav.Item>
            </Navbar>

    } else {
        navcontent =
            <Navbar fixed="top" expand="lg" className='bg-nav' style={{ height: '50px' }}>
                <Nav.Item className='align-baseline ms-3'>
                    <AiOutlineLeft onClick={goBack} style={{ color: 'black', fontSize: '25px' }} />
                </Nav.Item>
                <Nav.Item className='align-baseline ms-auto me-3'>
                    <Link to="/Profile" ><AiOutlineUser style={{ color: 'black', fontSize: '25px' }} /></Link>
                </Nav.Item>
            </Navbar>
    }

    return (
        <div>
            {navcontent}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>購物車將被清空</Modal.Title>
                </Modal.Header>
                <Modal.Body>離開此頁面購物車將被清空，請確定是否要返回上一頁？</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        否
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            handleClose()
                            removeAllItems()
                            navigate("/userpage")
                        }}>
                        是
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TopNav