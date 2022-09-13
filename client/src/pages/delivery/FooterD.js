import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { GrElevator, GrList, GrMap, GrChatOption, GrChat } from "react-icons/gr";
import DeliveryContext from '../../context/DeliveryProvider'
import axios from 'axios'

const FooterD = ({ isMapPage, getlocation }) => {
    const navigate = useNavigate()
    const HOST = "http://localhost:8000"
    // const HOST = "http://140.118.122.148:30308"

    const { allOrders } = useContext(DeliveryContext)
    const [deliver, setDeliver] = useState({
        lat: null, lng: null
    })


    const [orderdata, setOrderData] = useState({
        Id: allOrders[0].Orderid,
        Res: allOrders[0].Res,
        Des: allOrders[0].Building,
        Location: allOrders[0].Location
    })

    const updatePosition = `${HOST}/info/` + orderdata.Id + "/?start=" + orderdata.Res + '&end=' + orderdata.Des + '&deliver=[' + deliver.lat + ',' + deliver.lng + ']'

    const style = {
        backgroundColor: "white",
        borderTop: "solid black",
        textAlign: "center",
        padding: "10px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "50px",
        width: "100%"
    };

    const wrapperDiv = {
        display: 'block',
        padding: '10px',
        height: '50px',
        width: '100%',
    }

    const styleIcon = {
        fontSize: '28px',
    }

    const SelectPage = (page) => {
        if (page === "map") {
            navigate('/map')
        } else if (page === "chat") {
            navigate('/chat')
        } else {
            navigate('/orderdetail')
        }
    }

    const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);

		} else {
			alert("Geolocaiton is not supported in the browser")
		}
	}

	const getCoordinates = (position) => {
		setDeliver({
			lat: position.coords.latitude,
			lng: position.coords.longitude
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
        const interval = setInterval(() => {
            if (isMapPage === 1) {
                // console.log("Is MapPage")
                getlocation()
            } else if (isMapPage === 0) {
                // console.log("Not MapPage")
                getTestLocation(testLocation)
            } else if (isMapPage === 9) {
                clearInterval(interval)
            }
        }, 5000);
        return () => clearInterval(interval)
    }, [isMapPage, getlocation]);

    useEffect(() => {
        axios.get(updatePosition)
    }, [updatePosition]);

    return (
        <div>
            <div style={wrapperDiv}></div>
            <div style={style}>
                <Container fluid>
                    <Row>
                        <Col >
                            <GrList style={styleIcon} onClick={() => SelectPage("order")} />
                        </Col>
                        <Col >
                            <GrMap style={styleIcon} onClick={() => SelectPage("map")} />
                        </Col>
                        <Col >
                            <GrChat style={styleIcon} onClick={() => SelectPage("chat")} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default FooterD