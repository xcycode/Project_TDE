import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios'
import { Button, Col, Container, Form, Navbar, Row, Stack } from 'react-bootstrap';
import { SIGN_IN_STORE, SIGN_IN_USER } from '../api/apiURL';

import SHA256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';

const setCookie = (name, value, time) => {
	var Days = time;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	console.log(exp)
	document.cookie = name + "=" + value.toString() + ";expires=" + exp.toGMTString();

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



const Login = () => {
	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const userRef = useRef();

	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');
	const [hashpw, setHash] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [selectRole, setSelectRole] = useState('user')


	const [userType, setUserType] = useState({
		role: "user",
		url: SIGN_IN_USER,
		nextpage: "/userpage",
		regpage: "register"
	})

	const HeaderFont = {
		color: 'white',
		fontSize: '25px',
		fontWeight: 'bold',
	}

	const formStyles = {
		position: 'absolute',
		right: '10%',
		left: '10%',
		top: '18%',
		border: '2px solid rgba(0, 0, 0, 0.05)',
		borderRadius: "1.5rem"
	};

	const Hashing = (pw) => {
		//const time = new Date().getTime()
		const salt = `tde${account}tde`
		const encrypt = SHA256(`${salt}${pw}${salt}`).toString(CryptoJS.enc.Hex)
		console.log(encrypt)
		setPassword(pw)
		setHash(encrypt)
	}


	useEffect(() => {
		userRef.current.focus();
		if (getCookie('login') === 'true') {
			if (getCookie('role') === 'user') {
				navigate("/userpage", { replace: true });
			} else if (getCookie('role') === 'restaurant') {
				navigate("/respage", { replace: true });
			} else if (getCookie('role') === 'delivery') {
				navigate("/deliverypage", { replace: true });
			}
		}
	}, [])

	useEffect(() => {
		// console.log(selectRole)
		if (selectRole === "user") {
			setUserType({
				role: "user",
				url: SIGN_IN_USER,
				nextpage: "/userpage",
				regpage: "/register"
			})
		} else if (selectRole === "delivery") {
			setUserType({
				role: "delivery",
				url: SIGN_IN_USER,
				nextpage: "/deliverypage",
				regpage: "/register"
			})
		} else if (selectRole === "restaurant") {
			setUserType({
				role: "user",
				url: SIGN_IN_STORE,
				nextpage: "/respage",
				regpage: "/registerR"
			})
		}
	}, [selectRole])

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(userType.url,
				JSON.stringify({ account, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					// withCredentials: true
				}
			);
			const msg = response.data.msg;
			// console.log(msg);
			// console.log(userType);


			if (msg === "success") {
				//window.localStorage.setItem('pw', hashpw)
				//window.localStorage.setItem('account', account)
				//document.cookie = `hashpw=${hashpw} ; path=/  SameSite=strict ; Secure`
				setCookie('account', account, 7)
				setCookie('login', 'true', 7)
				setCookie('role', selectRole, 7)
				navigate(`${userType.nextpage}`, { replace: true });
			} else if (msg === "account not exists") {
				setErrMsg('Account not exists');
			} else if (msg === "password is incorrect") {
				setErrMsg('Password is incorrect');
			}
			setAuth({ account, password, msg, role: selectRole });
			setAccount('');
			setPassword('');
		} catch (err) {
			setErrMsg('Login Failed');
		}
	}
	return (
		<div>
			{/* <Navbar fixed="top" expand="lg" className='bg-nav'>
				<Container>
					<Navbar.Brand style={HeaderFont} href="/">TigerDuck-Eat</Navbar.Brand>
				</Container>
			</Navbar> */}
			<Container >
				<Row className="justify-content-center">
					{/*className="rounded-3 border-1 border-black form-bg"*/}
					<Col xs={10} md={6} >
						<Form onSubmit={handleSubmit} style={formStyles}>
							<h1 style={{ marginBottom: '30px', fontSize: '30px', textAlign: 'center', marginTop: '2rem' }} >Welcome !</h1>
							<Form.Group className="mb-3 mx-4 mt-4" controlId="role">
								<Form.Label>
									Role:
								</Form.Label>
								<Form.Select
									aria-label="Default select example"
									onChange={(e) => setSelectRole(e.target.value)}
								>
									<option value={'user'}>User</option>
									<option value={'restaurant'}>Restaurant</option>
									<option value={'delivery'}>Delivery</option>
								</Form.Select>
							</Form.Group>
							<Form.Group className="mb-3 mx-4 mt-4" controlId="username">
								<Form.Label>
									Username:
								</Form.Label>
								<Form.Control
									type="text"
									ref={userRef}
									autoComplete="off"
									onChange={(e) => setAccount(e.target.value)}
									value={account}
									required
								/>
							</Form.Group>
							<Form.Group className="mb-4 mx-4" controlId="password">
								<Form.Label>
									Password:
								</Form.Label>
								<Form.Control
									type="password"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									required
								/>
							</Form.Group>
							<Stack className="mx-4 mt-4 mb-3">
								<Button
									variant="primary"
									type="submit"
									className="rounded-pill"
									style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none', height: '40px' }}
								>
									<b>Sign In</b>
								</Button>
							</Stack>

							<p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" >{errMsg}</p>

							<p style={{ fontSize: '20px', textAlign: 'center' }} className="mt-4">
								Need an Account?
								<br />
								<span className="line">
									<Link to={userType.regpage} >Sign Up</Link>
								</span>
								{/* <h1 onClick={() => navigate(`${userType.regpage}`, { replace: true })} >
									Sign Up
								</h1> */}
							</p>
						</Form>
					</Col>
				</Row>
			</Container>
		</div >
	)
}

export default Login