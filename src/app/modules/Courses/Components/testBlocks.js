import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function TestBlocks({ test  ,courseId}) {
  const history = useHistory()
  return (
    <>
      <Col md={4} sm={12}>
        <Card>
          <Card.Body>
            <Card.Title> { test.name}   <span style={{ float: "right" }} className='badge badge-secondary'>InterMediate</span></Card.Title>
            <Card.Text> { test.description}</Card.Text>
            <div>
            <p >Total Time : {test.timeInHours} : {test.timeInMinutes} hr</p>
            <p style={{ float: "right" }}>passing Marks: {test.passingMarks}</p>
            <p>Total Marks: {test.totalMarks}</p>
            </div>
  

            <Button
              variant='primary'
              onClick={() => {
                history.push('/test/' + courseId  + '/CourseTest/' + test._id)
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
