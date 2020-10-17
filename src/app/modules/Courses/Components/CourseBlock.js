import React from 'react'
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'
import {useHistory} from "react-router-dom"


export default function CourseBlock ({ course }) {
  const history = useHistory()
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
                    <Button variant='primary' onClick={()=>{
                      history.push("coursePlayer/"+course._id);
                    }}>start Course</Button>
                  </Card.Body>
                </Card>
              </Col>
     
    </>
  )
}
