import React from 'react'
import { Col, Card } from 'react-bootstrap'

export default function TestBlock ({ result }) {
  return (
    <>
      <Col xs={12} md={4} sm={4}>
        <Card>
          <Card.Body>
            {console.log("result " , result)}
            {result.testId && 
              <>
                <Card.Title>{result.testId.name}</Card.Title>
                <Card.Text>
                  {result.obtainedMarks}/{result.totalMarks}
                  Result : - {result.result?"pass":"fail"}
                </Card.Text>
              </>
            }
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}
