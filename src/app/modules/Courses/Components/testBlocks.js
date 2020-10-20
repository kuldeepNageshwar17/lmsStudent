import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function TestBlocks (test) {
  const history = useHistory()
  return (
    <>
      <Col md={6} sm={12}>
        <Card>
          <Card.Body>
            <Card.Title>test Name    <span style={{float: "right"}} className='badge badge-secondary'>InterMediate</span></Card.Title>
            <Card.Text>Test Descroption</Card.Text>
            <div>
            
            </div>
            <p style={{float: "right"}}>passing Marks: 55</p>
            <p>Total Marks: 100</p>
            
            <Button
              variant='primary'
              onClick={() => {
                history.push('/test/CourseTest/' + test._id)       
              }}
            >
              start Test
            </Button>
            {/* <Button
              variant='primary'
              onClick={() => {
                history.push('/' + test._id)
              }}
            >
              start Course
            </Button> */}
            {/* <Button
              variant='primary'
              onClick={() => {
                history.push('Courses/Tests/' + course._id)
              }}
            >
              Test
            </Button> */}
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}
