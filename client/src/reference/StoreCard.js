import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const StoreCard = (props) => {
  return (
    <div>
        <Row xs={1} md={5} className="g-4 mt-1 mb-3 mx-3">
            <Col>
            <Card>
                <Card.Img variant="top" src={props.stores.Image} />
                <Card.Body>
                    <Card.Title >{props.stores.Name}</Card.Title>
                    <Card.Link href="#" className='test'>訂餐</Card.Link>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </div>
  )
}

export default StoreCard