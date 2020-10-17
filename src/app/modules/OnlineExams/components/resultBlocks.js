import React from 'react'
import { Col, Card } from 'react-bootstrap'

export default function ExamBlock ({ result }) {
  return (
    <>
      <Col xs={12} md={4} sm={4}>
        <Card>
          <Card.Body>
            {result.examId && 
              <>
                <Card.Title>{result.examId.name}</Card.Title>
                <Card.Text>
                  {result.obtainedMarks}/{result.totalMarks}
                  Result : - {result.result?"pass":"fail"}
                </Card.Text>
              </>
            }

            {/* // <Button variant='primary' onClick={()=> {debugger; GoToExam(Exam._id)}}>Go to Exam </Button> */}
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}
