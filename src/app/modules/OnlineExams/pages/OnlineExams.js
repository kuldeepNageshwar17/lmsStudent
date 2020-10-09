import React, { useState, useEffect } from 'react'
import { Card, Row } from 'react-bootstrap'
import ExamBlock from '../components/ExamBlock'
import axios from 'axios'
import {useHistory} from "react-router"

export default function OnlineExaminstions () {
  const [Examinaions, setExaminaions] = useState(null)
   const history=useHistory();
  const GoToExam=(id)=>{
    history.push("/OnlineExam/Exam/"+id)
  }
  useEffect(() => {
    debugger
    axios
      .get('/api/Examination/getExams')
      .then(res => {
        setExaminaions(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'>Your Exams</Card.Header>
          <Card.Body>
            <Row>
              {Examinaions &&
                Examinaions.map(item => <ExamBlock Exam={item} GoToExam={GoToExam} />)}
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </div>
  )
}
