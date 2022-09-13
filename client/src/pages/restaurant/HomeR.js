import React from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Stack, Nav, Navbar, Container } from 'react-bootstrap'
import TopNav from '../../components/TopNav';


const HomeR = () => {
	const navigate = useNavigate();

	const styleButton = {
		backgroundColor: 'rgb(62, 158, 246)',
		border: 'none',
		height: '60px',
		fontSize: '30px',
		fontWeight: 'bold',
		color: 'white'
	}

	const navigator = (page) => {
		if (page === 'order') {
			navigate("/order")
		} else if (page === 'edit') {
			navigate("/edit")
		} else if (page === 'promote') {
			navigate("/promote")
		} else if (page === 'analysis') {
			navigate("/analysis")
		}
	};

	return (
		<div>
			<TopNav NavStyle={"onlyProfile"} />
			<Container>
				<Stack gap={5}
					className="col-8 mx-auto "
					style={{
						position: 'absolute', left: '50%', top: '45%',
						transform: 'translate(-50%, -50%)'
					}}
				>
					<Button style={styleButton} onClick={() => { navigator('order') }}>
						目前訂單
					</Button>
					<Button style={styleButton} onClick={() => { navigator('edit') }}>
						架上商品編輯
					</Button>
					{/* <Button style={styleButton} onClick={() => { navigator('promote') }}>
						優惠促銷推廣
					</Button> */}
					<Button style={styleButton} onClick={() => { navigator('analysis') }}>
						產品銷售分析
					</Button>
				</Stack>
			</Container>
		</div>
	)
}

export default HomeR