import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Card , Button } from 'react-bootstrap'
import { useParams  , useHistory } from 'react-router-dom'
import TestBlocks from '../Components/coursetestblocks'

export default function TestList () {
  debugger
  const [Test, setTest] = useState(null)
  const { id } = useParams()
  const history = useHistory()
  useEffect(() => {
    debugger
    axios
      .get('/api/course/courseReviewData')
      .then(res => {
        console.log('here in coursetestlist', res.data)
        setTest(res.data)
      })
      .catch(() => {})
    //   axios
    //   .get('/api/course/getLastResults')
    //   .then(res => {
    //     setResults(res.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }, [])
  return (
    <div>
      <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'>Tests</Card.Header>
          <Card.Body>
            <Row>
              {Test &&
                Test.length != 0 &&
                Test.map(item => (
                  <TestBlocks
                    test={item.test}
                    courseId={item._id}
                    key={item.test._id}
                  />
                ))  || <div>You Dont have any Test Right Now</div>}
              {/* {Test && Test.length == 0 && <p>No TEST IS AVAILABLE FOR YOU</p>} */}
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row>
      {Test &&
                Test.length != 0 && <Button
                onClick={() => {
                  history.push('/test/testResult/')
                }}
                className=' btn btn-link'
              >
                See Results
                </Button>
      }
        </Row>
      {/* <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'>Exam Results</Card.Header>
          <Card.Body>
            <Row>
              {results && results.length &&
                results.map(item => (
                  <ResultBlock result={item}  />
                ))}
            </Row>
          </Card.Body>
        </Card>
      </Row> */}
    </div>
  )
}
