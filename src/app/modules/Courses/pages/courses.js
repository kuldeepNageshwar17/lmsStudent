import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import CourseBlock from '../Components/CourseSquareBlock'
import CourseHrBlock from '../Components/CourseHorizontalBlock'

export default function Courses () {
  const [courses, setCourses] = useState(null)
  const [recentCourse, setRecentCourse] = useState(null)
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
        debugger
        //console.log("res" , res.data)
        setRecentCourse(res.data)
      })
      .catch(() => {})
  }, [])
  return (
    <div>
      <Col>
        {recentCourse && recentCourse.length != 0 && (
          <Row>
            <Card className='col-md-12'>
              <Card.Header as='h5'>Recent Courses</Card.Header>
              <Card.Body>
                <Row>
                  {recentCourse.map(item => (
                    <CourseBlock
                      course={item.courses}
                      key={item._id}
                      dateTime={item.dateTime}
                    />
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Row>
        )}
        <Row>
          <Card className='col-md-12'>
            <Card.Header as='h5'>Your Courses</Card.Header>
            <Card.Body>
              <Row>
                {courses &&
                  courses.length != 0 &&
                  courses.map(item => (
                    <CourseHrBlock course={item} key={item._id} />
                  ))}
                {courses && courses.length != 0 && (
                  <p>NO COURSE IS AVAILABLE FOR YOU</p>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Col>
    </div>
  )
}
