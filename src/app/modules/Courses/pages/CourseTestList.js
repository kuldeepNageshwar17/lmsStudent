import React, { useState,useEffect } from 'react'
import axios from "axios";
import {Row, Col, Card} from "react-bootstrap";
import {useParams} from "react-router-dom";


import TestBlocks from "../Components/testBlocks"
export default function CourseTestList () {
  const [course, setCourse] = useState(null)
  const {id}=useParams();
  useEffect(() => {
    axios
      .get('/api/Course/Tests/'+id)
      .then(res => {
        setCourse(res.data)
      })
      .catch(() => {})
  }, [id])
  return (
    <div>
      <Row>
        <Card className='col-md-12'>
          <Card.Header as='h5'>Course Name - TESTs</Card.Header>
          <Card.Body>
            <Row>
            <TestBlocks/>
              {course &&course.tests&&
                course.tests.map(item => (
                  <TestBlocks {...item } key={item._id} />
                ))}
            </Row> 
          </Card.Body>
        </Card>
      </Row>
    </div>
  )
}
