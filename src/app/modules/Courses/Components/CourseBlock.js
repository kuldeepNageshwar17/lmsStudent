import React from 'react'
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'


export default function CourseBlock ({ course }) {
  return (
    <>
      <Col xs={12} md={4} sm={4}>
                <Card>
                  <Card.Img
                   variant='top'
                   src={
                     window.$apihost + '/uploads/CourseProfile/' + course.posterImageUrl
                   }      />
                  <Card.Body>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>
                    {course.Description}
                    </Card.Text>
                    <Button variant='primary'>Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
     
    </>
  )
}
