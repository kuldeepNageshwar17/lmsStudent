import React, { useEffect, useState } from 'react'
import { Card ,Row , Col} from 'react-bootstrap'
import axios from 'axios'
import CourseBlock from '../Components/CourseBlock'

export default function Courses () {
  const [courses, setCourses] = useState(null)
  const [recentCourse , setRecentCourse] = useState([])
  useEffect(() => {
    axios
      .get('/api/Course/StudentCourse')
      .then(res => {
        setCourses(res.data)
      })
      .catch(() => {})
      axios
      .get('/api/Course/getRecentCourses')
      .then(res => {
        console.log("res" , res.data)
        setRecentCourse(res.data)
      })
      .catch(() => {})
  }, [])
  return (
    <div>
      <Col>
      <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'>Recent Courses</Card.Header>
          <Card.Body>
            <Row>
              {recentCourse && recentCourse.length &&
                recentCourse.map(item => (
                  <CourseBlock course={item.courses} key={item._id}  dateTime={item.dateTime}/>
                ))}
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'>Your Courses</Card.Header>
          <Card.Body>
            <Row>
              {courses &&
                courses.map(item => (
                  <CourseBlock course={item} key={item._id} />
                ))}
            </Row>
          </Card.Body>
        </Card>
      </Row>
      </Col>
    </div>
  )
}
