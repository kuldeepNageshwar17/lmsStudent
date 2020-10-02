import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
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
  },[])
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Courses</Card.Title>
          {  courses && courses.map(item => <CourseBlock course={item} key={item._id} />)}
        </Card.Body>
      </Card>
    </div>
  )
}
