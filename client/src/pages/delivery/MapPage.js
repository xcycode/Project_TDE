import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Container, Form, Image, Stack } from 'react-bootstrap'
import DeliveryContext from '../../context/DeliveryProvider'
import axios from 'axios'
import TopNav from '../../components/TopNav'
import FooterD from './FooterD'

const MapPage = () => {
	let selectcontent = null
	const HOST = "http://localhost:8000"
	// const HOST = "http://140.118.122.148:30308"

	const { allOrders } = useContext(DeliveryContext)

	const [orderdata, setOrderData] = useState({
		Id: allOrders[0].Orderid,
		Res: allOrders[0].Res,
		Des: allOrders[0].Building,
		Location: allOrders[0].Location
	})

	const mapStyle = {
		width: '100%'
	}

	const buttonStyle = {
		backgroundColor: 'rgb(62, 158, 246)',
		border: 'none',
		height: '40px'
	}

	const [restaurant, setRestaurant] = useState({
		name: allOrders[0].Location,
		number: allOrders[0].Res
	})

	const [deliver, setDeliver] = useState({
		lat: null, lng: null
	})

	const [place, setPlace] = useState({
		lat: null, lng: null, name: allOrders[0].Building
	})

	const pictureUrl = {
		//初始化位置
		updatePosition: `${HOST}/info/` + orderdata.Id + "/?start=" + orderdata.Res + '&end=' + orderdata.Des + '&deliver=[' + deliver.lat + ',' + deliver.lng + ']',
		//選擇要導航的路線
		updateRoute: `${HOST}/info/` + orderdata.Id + "/?start=" + restaurant.number + '&end=' + place.name + '&deliver=[' + deliver.lat + ',' + deliver.lng + ']',
		position: `${HOST}/get/` + orderdata.Id + '/deliver/',
		deliverpath: `${HOST}/get/` + orderdata.Id + '/route/',
		delete: `${HOST}/del/` + orderdata.Id,
		clean: "https://i.imgur.com/VVkrlih.jpg"
	}

	const [mapType, setMapType] = useState('')
	const [mapPicture, setMapPicture] = useState(pictureUrl.clean)

	const [errMsg, setErrMsg] = useState('')

	//get the lat and lng of user
	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);

		} else {
			alert("Geolocaiton is not supported in the browser")
		}
	}

	const getCoordinates = (position) => {
		// console.log(position)
		
		// setDeliver({
		// 	lat: position.coords.latitude,
		// 	lng: position.coords.longitude
		// })

		setDeliver({
			lat: position.coords.latitude - 0.08428 ,
			lng: position.coords.longitude + 0.0465
		})

	}

	const testLocation = [
		{ lat: 25.013577, lng: 121.541154 },
		{ lat: 25.012939, lng: 121.541010 },
		{ lat: 25.012488, lng: 121.541453 },
		{ lat: 25.014063, lng: 121.542804 },
		{ lat: 25.013081, lng: 121.542418 }
	]

	const getTestLocation = (array) => {
		let rand = Math.random() * array.length | 0;
		let randLocation = array[rand];
		console.log(randLocation)
		setDeliver(randLocation)
	}

	//to log the error record of navigator
	const handleLocationError = (error) => {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				alert("User denied the request for Geolocation")
				break;
			case error.POSITION_UNAVAILABLE:
				alert('Location information is unavailable.')
				break;
			case error.TIMEOUT:
				alert("The request to get user location timed out.")
				break;
			case error.UNKNOWN_ERROR:
				alert('An unknown error occurred.')
				break;
			default:
				alert('An unknown error occurred.')
		}
	}

	useEffect(() => {
		updateMap(mapType)
	}, [deliver, mapType, restaurant, place]);

	const setNull = () => {
		// setDeliver({ lat: null, lng: null })
		setPlace({ lat: null, lng: null, name: allOrders[0].Building })
		setRestaurant({ name: allOrders[0].Location, number: allOrders[0].Res })
		setMapType('default')
	}

	const updateMap = (type) => {
		setErrMsg('')
		if (type === "default") {
			axios.get(pictureUrl.updatePosition)
				.then(response => {
					setMapPicture(pictureUrl.deliverpath + "?" + Math.random())
					// console.log("更新位置",pictureUrl.updatePosition)
					// console.log("更新地圖",mapPicture)
				})
		} else if (type === "deliver") {
			axios.get(pictureUrl.updatePosition)
				.then(response => {
					setMapPicture(pictureUrl.position + "?" + Math.random())
					// console.log("更新位置",pictureUrl.updatePosition)
					// console.log("更新地圖",mapPicture)
				})
		} else if (type === "route") {
			// console.log("目的地",place)
			// console.log("餐廳",restaurant)
			if (place.name === '' || restaurant.number === '') {
				setErrMsg(1)
			} else {
				// setMapPicture(pictureUrl.clean)
				axios.get(pictureUrl.updateRoute)
					.then(response => {
						setMapPicture(pictureUrl.deliverpath + "?" + Math.random())
						// console.log("更新位置",pictureUrl.updateRoute)
						// console.log("更新地圖",mapPicture)
					})
			}
		} else {
			setMapPicture(pictureUrl.clean)
			setNull()
		}
	}


	if (allOrders.length !== 1) {
		console.log(allOrders)
		selectcontent =
			<Form.Group className="mb-3 mt-3">
				<Form.Label>
					<h4>請選擇訂單編號：{orderdata.Id}</h4>
				</Form.Label><br />
				<Stack direction="horizontal" gap={2}>
					{allOrders.map((order) =>
						<Button key={order.Orderid} style={buttonStyle}
							onClick={() =>
								setOrderData({
									Id: order.Orderid,
									Res: order.Res,
									Des: order.Building
								})
							}>
							{order.Orderid}
						</Button>)
					}
				</Stack>
			</Form.Group>
		console.log(allOrders.map(order => order.Orderid))
	}

	return (
		<div>
			<TopNav NavStyle={'onlyProfile'} />
			<Container>
				<Image className='mt-3' src={mapPicture} style={mapStyle} />
				{selectcontent}
				<Form.Group className="mb-3 mt-3">
					<Form.Label>
						<h4>餐廳位置：{mapType === "default" ? orderdata.Location : restaurant.name}</h4>
					</Form.Label><br />
					<Stack direction="horizontal" gap={2}>
						<Button style={buttonStyle} disabled={mapType === "default"} onClick={() => setRestaurant({ name: "一餐", number: 1 })}>一餐</Button>
						<Button style={buttonStyle} disabled={mapType === "default"} onClick={() => setRestaurant({ name: "三餐", number: 3 })}>三餐</Button>
						<Button style={buttonStyle} disabled={mapType === "default"} onClick={() => setRestaurant({ name: "教餐", number: 1 })}>教餐</Button>
					</Stack>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label ><h4>目的地位置：{mapType === "default" ? orderdata.Des : place.name}</h4></Form.Label>
					{mapType === "default" ? <Form.Select disabled /> :
						<Form.Select onChange={(e) => setPlace({ name: e.target.value })} disabled={mapType === "default"}>
							<option value={''}>請選擇大樓代號</option>
							<option value={'AD'}>AD-行政大樓</option>
							<option value={'D1'}>D1-第一學生宿舍</option>
							<option value={'D2'}>D2-第二學生宿舍</option>
							<option value={'D3'}>D3-第三學生宿舍</option>
							<option value={'E1'}>E1-工程二館</option>
							<option value={'E2'}>E2-工程二館</option>
							<option value={'EE'}>EE-電資館</option>
							<option value={'GYM'}>GYM-體育館</option>
							<option value={'IA'}>IA-醫揚大樓</option>
							<option value={'IB'}>IB-國際大樓</option>
							<option value={'LB'}>LB-圖書館</option>
							<option value={'MA'}>MA-管理大樓</option>
							<option value={'RB'}>RB-綜合研究大樓</option>
							<option value={'S'}>S-學生活動中心</option>
							<option value={'T1'}>T1-第一教學大樓</option>
							<option value={'T2'}>T2-第二教學大樓</option>
							<option value={'T3'}>T3-第三教學大樓</option>
							<option value={'T4'}>T4-第四教學大樓</option>
							<option value={'TR'}>TR-研揚大樓</option>
						</Form.Select>
					}
				</Form.Group>
				{errMsg === 1 ? <Alert variant='danger' >請選擇餐廳位置與目的地位置</Alert> : <></>}
				<Stack gap={2}>
					<Button style={buttonStyle} onClick={() => {
						setMapType("default")
						// getLocation()
						getTestLocation(testLocation)
					}}>
						取得外送路徑
					</Button>
					<Button style={buttonStyle} onClick={() => {
						setMapType("deliver")
						// getLocation()
						getTestLocation(testLocation)
					}}>
						取得目前位置
					</Button>
					<Button style={buttonStyle} onClick={() => {
						setMapType("route")
						// getLocation()
						getTestLocation(testLocation)
					}}>
						查詢自訂路徑
					</Button>
					<Button variant="outline-danger" onClick={() => {
						// getLocation()
						getTestLocation(testLocation)
						setNull()
					}}>
						重設
					</Button>
				</Stack>
			</Container>
			<FooterD
				getlocation={() => getTestLocation(testLocation)}
				// getlocation={() => getLocation()}
				isMapPage={1}
			/>
		</div>
	)
}

export default MapPage