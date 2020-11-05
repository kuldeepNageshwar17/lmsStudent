import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Badge, Tabs, Tab } from 'react-bootstrap'
import axios from 'axios'
// import CourseBlock from '../Components/CourseBlock'
import Announcement from '../Components/Announcement'
import Curriculam from '../Components/Curriculam'
import Faqs from '../Components/FAQs'
import Overview from '../Components/Overview'
import Reviews from '../Components/Reviews'
import CardSideStickey from '../Components/cardSideStickey'
import {
  useParams,
  useHistory
} from 'react-router'
export default function CoursesDetails () {
  const [coursedetails, setCoursesdetails] = useState(null)
  const {id} = useParams()
  useEffect(() => {
    axios.get('/api/course/courseDetailByCourseId/' + id).then((res)=>{
      setCoursesdetails(res.data[0])
    }).catch((res)=>{

    })
  }, [])
  return (
    <div>
      {coursedetails && (
      <Row>
        <Col md={9}>
          <Row>
            <Col>
              <Card classNameName='col-md-12'>
                <Card.Header as='h5'>Course</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <div style={{ width: '80%' }}>
                        <h3>{coursedetails && coursedetails.title}</h3>
                        <p>{coursedetails && coursedetails.Description}
                        </p>
                        <div>
                          <Badge variant='secondary'>{coursedetails && coursedetails.numberOfRatings}</Badge>
                          <span classNameName='fa fa-star checked'></span>
                          <span classNameName='fa fa-star checked'></span>
                          <span classNameName='fa fa-star checked'></span>
                          <span classNameName='fa fa-star'></span>
                          <span classNameName='fa fa-star'></span>
                          <span classNameName='fa fa-child ml-15 mr-2'>
                            {' '}
                          </span>{' '}
                          {coursedetails && coursedetails.numberOfStudent} Enrolled
                        </div>
                        <p>
                          Created by <b>kuldeep Nageshwar</b> Last updated &nbsp;
                          {coursedetails && coursedetails.modifiedDate.slice(0, 10)}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <Tabs defaultActiveKey='overview' id='uncontrolled-tab-example'>
                  <Tab eventKey='overview' title='Overview'>
                    <Overview overview={coursedetails.overview}/>
                  </Tab>
                  <Tab eventKey='curriculam' title='Curriculam'>
                    <Curriculam />
                  </Tab>
                  <Tab eventKey='Faq' title='Faq'>
                    <Faqs />
                  </Tab>
                  <Tab eventKey='reviews' title='Reviews'>
                    <Reviews />
                  </Tab>
                  <Tab eventKey='Announcement' title='Announcement'>
                    <Announcement />
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Col>
        <Col>


        <CardSideStickey />

        
        </Col>
      </Row>
      )}
    </div>
  )
}
