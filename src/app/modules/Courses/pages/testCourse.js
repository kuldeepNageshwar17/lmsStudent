import React from 'react'
import {Row, Col, Card, ButtonGroup, Button} from 'react-bootstrap'
export default function testExam() {
    return (
        <div>
          <Row>
               <Card className='col-md-12'><Card.Header  as="h5">Your Courses</Card.Header><Card.Body>
                  <Row><Col xs={12} md={4} sm={4}>
                  <Card >
  <Card.Img variant="top" src="https://s0.2mdn.net/9929096/hs_svod_artemisfowl_15jun_300x250.jpg" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
</Col> </Row>
                   </Card.Body></Card>
               </Row>
        </div>
    )
}

