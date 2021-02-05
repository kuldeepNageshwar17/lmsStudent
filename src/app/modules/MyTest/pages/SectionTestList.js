import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ResultBlock from './resultBlocks'
import TestBlocks from "../Components/testBlocks"

export default function SectionTestList() {
  debugger;
  const [sectiontestlist, setSectionTestList] = useState({
  })
  const [results, setResults] = useState(null)
  const { sid } = useParams();
  useEffect(() => {
    debugger;
    axios
      .get('/api/section/' + sid + '/getAllTestsBySection')
      .then(res => {
        setSectionTestList(res.data[0])
      })
      .catch(() => { })
      axios
      .get('/api/section/' + sid + '/getSectionalTestResults')
      .then(res => {
        console.log('result' , res.data)
        setResults(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'></Card.Header>
          <Card.Body>
            <Row>
              {sectiontestlist.tests && sectiontestlist.tests.length &&
                sectiontestlist.tests.map(item => (

                  <TestBlocks test={item} sectionId={sectiontestlist._id} key={item._id} />
                )) || <div>You Dont have any Test Right Now</div>}
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'>Exam Results</Card.Header>
          <Card.Body>
            <Row>
              {results && results.length && 
                results.map(item => (
                  <ResultBlock result={item}  />
                )) || <div>You didn't give any test yet , give some test</div>}
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </div>
  )
}
