import React from 'react'
import { Row, Col,Card } from 'react-bootstrap'

export default function Announcement({data}){
    return (
        <Card classNameName='col-md-12'>
        <Card.Header as='h5'>Announcements</Card.Header>
        <Card.Body>
          <Row>
            <Col>
            {data && data.length && data.map((element) => 
                
              <div style={{ width: '80%' }} key={element._id}>
                
                <h3>{element.title}</h3>
                <p>
                  {element.Description}
                </p>
               
                <p>
                  Created at {element.createDate.slice(0, 10)}
                </p>
              </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}
