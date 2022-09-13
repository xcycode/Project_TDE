import React from 'react'
import '../App.css'
import {Nav ,Navbar, Dropdown, NavDropdown, Container} from 'react-bootstrap';

import { AiOutlineShoppingCart,AiOutlineUser } from "react-icons/ai";

import {Form, FormControl, Button} from 'react-bootstrap';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
        {/* <Navbar fixed="top" expand="lg" className='bg-nav '>
            <Nav.Item className='align-baseline'>
                <Nav.Link style={{color: 'black', fontSize: '25px'}} href="/">TDE</Nav.Link>
            </Nav.Item>

            <Dropdown className="align-self-center border-user ms-auto">
                <Dropdown.Toggle variant="nav" id="dropdown-basic">
                    <AiOutlineUser style={{color: 'black', fontSize: '25px'}}/>
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdown-content'>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Nav.Item className="align-self-center">
                <Nav.Link href="/home">
                    <AiOutlineShoppingCart style={{color: 'black', fontSize: '25px'}}/>
                </Nav.Link>
            </Nav.Item>
        </Navbar> */}

        <Navbar fixed="top" expand="lg" className='bg-nav '>
            <Nav.Item className='align-baseline'>
                <Nav.Link style={{color: 'black', fontSize: '25px'}} href="/">TDE</Nav.Link>
            </Nav.Item>
        </Navbar>



    </div>
  )
}

export default Header