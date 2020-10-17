import React, { useState,useEffect } from 'react'
import { Card, Row } from 'react-bootstrap'
import ExamBlock from '../components/ExamBlock'

export default function Examinstions () {
  const [Examinaions, setExaminaions] = useState(null)
  useEffect(() =>{
      
  },[])
  return (
    <div>
      <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'>Your Courses</Card.Header>
          <Card.Body>
            <Row>
              {Examinaions &&
                Examinaions.map(item => <ExamBlock Exam={item} />)}
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'>Your Courses</Card.Header>
          <Card.Body>
            <Row>
              {Examinaions &&
                Examinaions.map(item => <ExamBlock Exam={item} />)}
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </div>
  )
}
