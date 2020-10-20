import React from 'react'
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function CourseBlock ({ course }) {
  const history = useHistory()
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
              onClick={() => {
                history.push('coursePlayer/' + course._id)
              }}
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
