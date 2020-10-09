import React from 'react'
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'


export default function ExamBlock ({ Exam,GoToExam }) {
  return (
    <>
      <Col xs={12} md={4} sm={4}>
                <Card>
               
                  <Card.Body>
                    <Card.Title>{Exam.name}</Card.Title>
                    <Card.Text>
                    {Exam.description}
                    </Card.Text>
                    <Button variant='primary' onClick={()=> {debugger; GoToExam(Exam._id)}}>Go to Exam </Button>
                  </Card.Body>
                </Card>
              </Col>
     
    </>
  )
}
