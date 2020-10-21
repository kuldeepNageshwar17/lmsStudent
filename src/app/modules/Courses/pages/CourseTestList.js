import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TestBlock from '../../Test/pages/resultBlocks'

import TestBlocks from "../Components/testBlocks"
export default function CourseTestList() {
  debugger;
  const [course, setCourse] = useState({
  })
  const [results, setResults] = useState(null)
  const { id } = useParams();
  useEffect(() => {
    debugger;
    axios
      .get('/api/course/tests/' + id)
      .then(res => {

        setCourse(res.data[0])
      })
      .catch(() => { })
      axios
      .get('/api/course/getLastResults')
      .then(res => {
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
              {course.tests && course.tests.length &&
                course.tests.map(item => (

                  <TestBlocks test={item} courseId={course._id} key={item._id} />
                ))}
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'>Exam Results</Card.Header>
          <Card.Body>
            <Row>
              {results &&
                results.map(item => (
                  <TestBlock result={item}  />
                ))}
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </div>
  )
}
