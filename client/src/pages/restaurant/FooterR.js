import React from 'react'
import { Button, Container, Row } from 'react-bootstrap';

const FooterR = (props) => {
    // let buttonstyle = null

    const style = {
        backgroundColor: "transparent",
        textAlign: "center",
        padding: "30px",
        position: "fixed",
        left: "0",
        bottom: "20px",
        height: "70px",
        width: "100%"
    };

    const wrapperDiv = {
        display: 'block',
        padding: '20px',
        height: '70px',
        width: '100%',
    }

    const styleButton = {
        backgroundColor: 'rgb(62, 158, 246)',
        border: 'none',
        height: '45px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white'
    }

    


    return (
        <div>
            <div style={wrapperDiv}></div>
            <Container style={style} fluid>
                <Row>
                    <Button
                        style={styleButton}
                        onClick={props.addItem}
                    >
                        加入品項
                    </Button>
                </Row>
            </Container>
        </div>
    )
}

export default FooterR