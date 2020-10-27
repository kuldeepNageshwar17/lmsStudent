import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function TestBlocks({ test  ,sectionId}) {
  const history = useHistory()
  return (
    <>
      <Col md={4} sm={12}>
        <Card>
          <Card.Body>
            <Card.Title> { test.name}   <span style={{ float: "right" }} className='badge badge-secondary'>InterMediate</span></Card.Title>
            <Card.Text> <div  dangerouslySetInnerHTML={{    __html: test.description }}></div></Card.Text>
            <div>
            <p >Total Time : {test.timeInHours} : {test.timeInMinutes} hr</p>
            <p style={{ float: "right" }}>passing Marks: {test.passingMarks}</p>
            <p>Total Marks: {test.totalMarks}</p>
            </div>
  
    {console.log("test"  , test)}
            <Button
              variant='primary'
              onClick={() => {
                history.push('/test/' + sectionId  + '/SectionTest/' + test._id)
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
