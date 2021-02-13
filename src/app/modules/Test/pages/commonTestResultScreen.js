import React , { useState , useEffect } from 'react'
import { Col, Card ,Row , Button} from 'react-bootstrap'
import axios from 'axios'
import { useParams , useHistory } from 'react-router-dom'


export default function CommonTestResultBlock () {
  const { testId , resultId} = useParams()
  const [results, setResults] = useState([])
  const [lastResult , setLastResult] = useState()
 const history = useHistory()
  useEffect(() => {
    if(resultId){
      axios
      .get('/api/course/' + resultId + '/resultById')
      .then(res => {
        console.log("latest" , res.data)
        setLastResult(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
    
  
    axios
      .get('/api/course/getLastResults')
      .then(res => {
        console.log("res" , res.data)
        setResults(res.data)
      })
      .catch(err => {
        console.log(err)
      })

    }, [])
  return (
    <>
    
      {lastResult &&  (
      <Row>
      <Col xs={12} md={4} sm={4}>
      <Card className="testResultCard">
          <Card.Body>
            {/* {console.log("result " , result)} */}
            
              <>
                <Card.Title>{lastResult.testId.name}</Card.Title>
               {<Card.Text>Total Questions: - {lastResult.noOfTotalQuestion ? lastResult.noOfTotalQuestion : "0"}</Card.Text>} 
               { <Card.Text>Attempted : - {lastResult.attempted ? lastResult.attempted : ""}</Card.Text>}
               {<Card.Text>Right Questions: - {lastResult.noOfRight ? lastResult.noOfRight : "0"}</Card.Text>}
               {<Card.Text>Wrong Questions: - {lastResult.noOfWrong ? lastResult.noOfWrong : "0"}</Card.Text>}

                <Card.Text>
                  {lastResult.obtainedMarks}/{lastResult.totalMarks}
                  Result : - {lastResult.result ? "pass":"fail"}
                </Card.Text>
              </>
            
          </Card.Body>
        </Card> 
      </Col>
      </Row>
      )}
    
    <hr />
    <Row>
    
    {results && results.length  && 
    results.map(result => (
      <Col xs={12} md={4} sm={4}>
        <Card className="testResultCard">
          <Card.Body>
            {/* {console.log("result " , result)} */}
            
              <>
                <Card.Title>{result.testId.name}</Card.Title>
                {<Card.Text>Total Questions: - {result.noOfTotalQuestion ? result.noOfTotalQuestion : "0"}</Card.Text>}
               { <Card.Text>Attempted : - {result.attempted ? result.attempted : ""}</Card.Text>}
               {<Card.Text>Right Questions: - {result.noOfRight ? result.noOfRight : "0"}</Card.Text>}
               {<Card.Text>Wrong Questions: - {result.noOfWrong ? result.noOfWrong : "0"}</Card.Text>}

                <Card.Text>
                  {result.obtainedMarks}/{result.totalMarks}
                  Result : - {result.result ? "pass":"fail"}
                </Card.Text>
              </>
            
          </Card.Body>
        </Card>
         </Col>
    
      )) || <div >You Didnt give any test yet , go and give <Button onClick={() => {
        if (history.length > 1) {
          // this will take you back if there is history
          history.goBack()
        }
      }}>test </Button></div>
      }
       
        </Row>
    </>
  )
}
