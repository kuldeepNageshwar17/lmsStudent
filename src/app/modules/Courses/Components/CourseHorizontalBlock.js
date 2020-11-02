import React from 'react'
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function CourseBlock ({ course }) {
  const history = useHistory()
  const SaveStudentRecent = async id => {
    const date = Date.now()
    var data = { id, date }
    console.log('data it is ', data)
    axios
      .post('/api/student/updateRecentStudentData', data)
      .then(res => {})
      .catch(Error => {
        console.log('Error : ', Error)
      })

    history.push('coursePlayer/' + id)
  }
  return (
    <>
      <div className='card mb-10 '>
        <div className='row no-gutters'>
          <div className='col-md-4'>
            <img
              src={
                window.$apihost +
                '/uploads/CourseProfile/' +
                course.posterImageUrl
              }
              className='card-img'
              alt='...'
            />
          </div>
          <div className='col-md-6'>
            <div className='card-body'>
              <h5 className='card-title'>{course.title}</h5>
              <p className='card-text'>{course.Description}</p>
              <p className='card-text'>
                <small className='text-muted'>Last updated 3 mins ago</small>
              </p>
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
                onClick={() => SaveStudentRecent(course._id)}
              >
                start Course
              </Button>
              <Button
                variant='success'
                onClick={() => {
                  history.push('Courses/' + course._id + '/Tests')
                }}
              >
                Test
              </Button>
            </div>
          </div>
          <div className='col-md-2 bg-secondary p-10'>
            <p>Ratings </p>
           
            <div style={{"position":"absolute", "bottom":0}}> 
            <h4> Reviews</h4> 
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
