import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function TestBlocks({ test  ,courseId}) {
  const history = useHistory()
  return (
    <>
      <Col md={4} sm={12}>
      <Card className='examBlockCard'  >
          <Card.Body>
            <Card.Title> { test.name} </Card.Title>
            <Card.Text>
              <div
                dangerouslySetInnerHTML={{
                  __html: test.description ? test.description : ''
                }}
              ></div>
            </Card.Text>
            <div className='cardDetails'>
              <div></div>
              {/* <svg>
                <use xlinkHref={"http://localhost:3000/media/svg/icons/Devices/Watch2.svg#img"}>                  
                </use>
              </svg> */}
              <img
                src={'http://localhost:3000/media/svg/icons/Devices/Watch2.svg'}
                alt='time'
              />
              {test.timeInHours} : {test.timeInMinutes} hrs.
              <br></br>
              <p className='mt-5'>
                <span className='ExPassingMarks'>
                  Min Marks &nbsp; - &nbsp; {test.passingMarks}
                </span>
                <span className='ExTotalMarks'>
                  Max Marks &nbsp; -&nbsp; {test.totalMarks}
                </span>
              </p>
            </div>
            <div className='startExam'>
              <button
                onClick={() => {
                  history.push('/MyTest/' + courseId  + '/CourseTest/' + test._id)
                }}
                className=' btn btn-link'
              >
                Go to Test
              </button>
            </div>
          </Card.Body>
        </Card>
         
      </Col>
    </>
  )
}
