import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Image, Row } from 'react-bootstrap'
import { Form, FormControl, Container } from 'react-bootstrap';
import useAuth from "../../hooks/useAuth";
import axios from 'axios'
import { GET_ORDER_USER, GET_ORDER_USER2, GET_STORE_LIST } from '../../api/apiURL';
import TopNav from '../../components/TopNav';

const getCookie = (name) => {
	const strCookie = document.cookie;
	const arrCookie = strCookie.split("; ");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] === name) return arr[1];
	}
	return "";
}

const Storelist = () => {
    let content = null
    const { auth } = useAuth()
    // const userAccount = auth.account
    const userAccount = getCookie("account")
    const [stores, setStores] = useState(null)
    const [search, setSearch] = useState('');
    const navigate = useNavigate();


    const buttonStyle = {
        backgroundColor: 'rgb(62, 158, 246)',
        border: 'none',
        fontSize: '20px',
        height: '50px'
    }

    // useEffect(() => {
    //     axios.get(GET_STORE_LIST)
    //         .then(response => {
    //             setStores(response.data)
    //         })
    // }, [])

    useEffect(() => {
        axios.post(GET_ORDER_USER2, 
            JSON.stringify({ consumer: userAccount }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                // console.log(response.data)
                if (response.data.msg.length === 0) {
                    axios.get(GET_STORE_LIST)
                        .then(response => {
                            setStores(response.data)
                        })
                } else {
                    navigate('/Wait')
                }
            })
            .catch((error) => console.log(error))
    }, []);


    if (stores) {
        const Store = stores.msg

        if (!search) {
            content =
                Store.map((store) =>
                    <div key={store.Name}>
                        <Row xs={1} md={5} className="g-4 mt-1 mb-3 mx-3">
                            <Col>
                                <Card className="text-center">
                                    <Card.Img variant="top" style={{ height: '150px' }} src={store.Image} />
                                    <Button
                                        style={buttonStyle}
                                        onClick={() => {
                                            navigate(`/dish/${store.Name}`);
                                        }}
                                    >
                                        {store.Name}
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )
        }
        else if (search) {
            content =
                Store.filter(store => store.Name === `${search}`).map(filteredStore => (
                    <div key={filteredStore.Name}>
                        <Row xs={1} md={5} className="g-4 mt-1 mb-3 mx-3">
                            <Col>
                                <Card className="text-center">
                                    <Card.Img variant="top" style={{ height: '150px' }} src={filteredStore.Image} />
                                    <Button
                                        style={buttonStyle}
                                        onClick={() => {
                                            navigate(`/dish/${filteredStore.Name}`);
                                        }}
                                    >
                                        {filteredStore.Name}
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                ))
        }
    }

    return (
        <div>
            <TopNav NavStyle={"onlyProfile"} />
            <Container fluid>
                <Form className="d-flex mt-4">
                    <FormControl
                        type="search"
                        placeholder="搜尋"
                        className="me-1 mx-2"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    {/* <Button
                        className='btn-outline-search mx-2'
                        type="submit"
                    >
                        Search
                    </Button> */}
                </Form>
            </Container>
            {content}
        </div>
    )
}

export default Storelist
