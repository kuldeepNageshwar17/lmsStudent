import React from 'react'

import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'

export default function ExamBlock ({ Exam, GoToExam }) {
  return (
    <>
      <Col xs={12} md={4} sm={4}>
        <Card className='examBlockCard'>
          <Card.Body>
            <Card.Title>{Exam.name}</Card.Title>
            <Card.Text>
              <div
                dangerouslySetInnerHTML={{
                  __html: Exam.description ? Exam.description : ''
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
              {Exam.timeInHours} : {Exam.timeInMinutes} hrs.
              <br></br>
              <p className='mt-5'>
                <span className='ExPassingMarks'>
                  Min Marks &nbsp; - &nbsp; {Exam.passingMarks}
                </span>
                <span className='ExTotalMarks'>
                  Max Marks &nbsp; -&nbsp; {Exam.totalMarks}
                </span>
              </p>
            </div>
            <div className='startExam'>
              <button
                onClick={() => {
                  debugger
                  GoToExam(Exam._id)
                }}
                className=' btn btn-link'
              >
                Go to Exam
              </button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}
