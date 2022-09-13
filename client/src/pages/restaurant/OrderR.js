import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Container } from 'react-bootstrap'
import useAuth from "../../hooks/useAuth";
import axios from 'axios'
import { GET_ORDER_STORE } from '../../api/apiURL';
import TopNav from '../../components/TopNav';


const OrderR = () => {
	const { auth } = useAuth()
	const storeAccount = auth.account
	let orderContent = null

	const [orders, setOreders] = useState(null)

	useEffect(() => {
		axios.post(GET_ORDER_STORE,
			JSON.stringify({ account: storeAccount }),
			{
				headers: { 'Content-Type': 'application/json' },
			}
		)
			.then(response => {
				console.log(response.data)
				setOreders(response?.data)
			})
			.catch((error) => console.log(error))
	}, [storeAccount]);

	if (orders) {
		let Orders = orders.msg
		orderContent =
			Orders.map((order) =>
				<Card className='mt-4' key={order.Orderid}>
					<Card.Header as="h2">No.{order.Orderid}</Card.Header>
					<Card.Body >
						<Card.Title as="h3">訂購人：{order.Consumer}</Card.Title>
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
						<Card.Title as="h3">外送員：{order.Delivery}</Card.Title>
					</Card.Body>
				</Card>
			)
	}

	return (
		<div>
			<TopNav NavStyle={"onlyGoback"} />
			<Container fluid>
				{orderContent}
			</Container>
		</div>
	)
}

export default OrderR
