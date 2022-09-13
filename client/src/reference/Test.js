import React from 'react'
import '../App.css'
import { Navbar, Nav, Container, Row, Col, Offcanvas, NavDropdown, Dropdown, Form, FormControl, Button } from 'react-bootstrap';

import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";


const Test = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col className='col-sm-8'>col 1</Col>
                    <Col>col 2</Col>
                </Row>
            </Container>

            <Container>
                <Row className="me-auto">
                    <Col xs="2">col 1</Col>
                    <Col xs="2">col 2</Col>
                </Row>
            </Container>

        </div>
    )
}

export default Test