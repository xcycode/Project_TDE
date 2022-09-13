import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
// import { GrElevator, GrList, GrMap } from "react-icons/gr";
import { IconCheckupList, IconEdit, IconFileAnalytics } from '@tabler/icons';
import axios from 'axios'

const HomeFooter = () => {
    const navigate = useNavigate()

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
        if (page === 'order') {
            navigate("/order")
        } else if (page === 'edit') {
            // navigate(`/edit/${storeInfo.msg.Storename}`)
            navigate("/edit")
        } else if (page === 'promote') {
            navigate("/promote")
        } else if (page === 'analysis') {
            navigate("/analysis")
        }
    }

    return (
        <div>
            <div style={wrapperDiv}></div>
            <div style={style}>
                <Container fluid>
                    <Row>
                        <Col >
                            <IconCheckupList style={styleIcon} onClick={() => SelectPage("order")}/>
                            {/* <GrList style={styleIcon} onClick={() => SelectPage("order")} /> */}
                        </Col>
                        <Col >
                            <IconEdit style={styleIcon} onClick={() => SelectPage("edit")}/>
                            {/* <GrMap style={styleIcon} onClick={() => SelectPage("edit")} /> */}
                        </Col>
                        <Col >
                            <IconFileAnalytics style={styleIcon} onClick={() => SelectPage("analysis")} />
                            {/* <GrElevator style={styleIcon} onClick={() => SelectPage("analysis")} /> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default HomeFooter