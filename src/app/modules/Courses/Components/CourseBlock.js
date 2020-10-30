import React from 'react'
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from "axios";

export default function CourseBlock ({ course }) {
  const history = useHistory()
  const SaveStudentRecent = async(id) => {

    
    const date =   Date.now()
    var data = {id , date}
    console.log("data it is " , data)
    axios.post('/api/student/updateRecentStudentData', data).then((res) => {

    }).catch((Error) => {
      console.log('Error : ', Error)
    })

    history.push('coursePlayer/' + id)
  }
  return (
    <>
      <Col md={6} sm={12}>
        <Card>
          <Card.Img
            variant='top'
            src={
              window.$apihost +
              '/uploads/CourseProfile/' +
              course.posterImageUrl
            }
            style={{ height: '200px', width: '300px' }}
          />
          <Card.Body>
            <Card.Title>{course.title}</Card.Title>
            <Card.Text>{course.Description}</Card.Text>
            <Button
              variant='primary'
              onClick={() => {
                history.push('/Courses/Course/' + course._id)
              }}
            >
              Course detail
            </Button>
            <Button
              variant='primary'
              onClick={() => SaveStudentRecent(course._id)
                
                
              }
            >
              start Course
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                history.push('Courses/'+ course._id+'/Tests')
              }}
            >
              Test
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}
