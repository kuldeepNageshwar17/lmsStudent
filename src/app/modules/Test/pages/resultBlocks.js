import React from 'react'
import { Col, Card } from 'react-bootstrap'

export default function ResultBlock ({ result }) {
  return (
    <>
      <Col xs={12} md={4} sm={4}>
      <Card className="testResultCard">
          <Card.Body>
            {/* {console.log("result " , result)} */}
            {result && result.testId && 
              <>
              {console.log('result'  , result)}
                <Card.Title>{result.test[0].name}</Card.Title>
                {<Card.Text>Total Questions: - {result.noOfTotalQuestion ? result.noOfTotalQuestion : "0"}</Card.Text>}
               { <Card.Text>Attempted : - {result.attempted ? result.attempted : ""}</Card.Text>}
               {<Card.Text>Right Questions: - {result.noOfRight ? result.noOfRight : "0"}</Card.Text>}
               {<Card.Text>Wrong Questions: - {result.noOfWrong ? result.noOfWrong : "0"}</Card.Text>}
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
