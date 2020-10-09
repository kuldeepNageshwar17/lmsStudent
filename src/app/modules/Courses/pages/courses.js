import React, { useEffect, useState } from 'react'
import { Card ,Row} from 'react-bootstrap'
import axios from 'axios'
import CourseBlock from '../Components/CourseBlock'

export default function Courses () {
  const [courses, setCourses] = useState(null)
  useEffect(() => {
    axios
      .get('/api/Course/StudentCourse')
      .then(res => {
        setCourses(res.data)
      })
      .catch(() => {})
  }, [])
  return (
    <div>
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
    </div>
  )
}
