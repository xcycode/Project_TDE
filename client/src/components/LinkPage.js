import React from 'react'
import { Button, Stack, Navbar, Container } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"


const LinkP = () => {
	const navigate = useNavigate();

	const styleButton = {
		backgroundColor: 'rgb(62, 158, 246)',
		border: 'none',
		height: '60px',
		fontSize: '30px',
		color: 'white'
	}

	const HeaderFont = {
		color: 'white',
		fontSize: '25px',
		fontWeight: 'bold',
	}


	const navigator = (role) => {
		if (role === 'user') {
			navigate("/loginU")
		} else if (role === 'restaurant') {
			navigate("/loginR")
		} else if (role === 'delivery') {
			navigate("/loginD")
		}
	}

	return (
		<div>
			<Navbar fixed="top" expand="lg" className='bg-nav'>
				<Container>
					<Navbar.Brand style={HeaderFont} href="/">TigerDuck-Eat</Navbar.Brand>
				</Container>
			</Navbar>
			<Container>
				<Stack gap={5}
					className="col-8 mx-auto "
					style={{
						position: 'absolute', left: '50%', top: '45%',
						transform: 'translate(-50%, -50%)'
					}}
				>
					<Button style={styleButton} onClick={() => { navigator('user') }}>
						User
					</Button>
					<Button style={styleButton} onClick={() => { navigator('restaurant') }}>
						Restaurant
					</Button>
					<Button style={styleButton} onClick={() => { navigator('delivery') }}>
						Delivery
					</Button>
				</Stack>
			</Container>
		</div>
	)
}

export default LinkP