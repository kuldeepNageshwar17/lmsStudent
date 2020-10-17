import React ,{useState} from 'react'
// import "../../../../../"
import '../../../../../node_modules/video-react/dist/video-react.css'
import { Player } from 'video-react'

import {
  Container,
  Row,
  Col,
  Card,
  Navbar,
  Nav,
  Accordion,
  Tabs,
  Tab,
  Button
} from 'react-bootstrap'

import { useParams, useHistory } from 'react-router'
export default function CoursePlayer () {
  const history = useHistory()
  const [currentItem, setCurrentItem] = useState()
  const { exId, topic, type } = useParams()
  const handleChangeTopic=(item)=>{
    history.push(`/coursePlayer/${exId}/${topic}/${type}`)
  }

  return (
    <>
      <Navbar bg='dark'>
        <Navbar.Brand href='#home'>Brand link</Navbar.Brand>
      </Navbar>
      <Container fluid>
        <Row className='mt-5'>
          <Col md={3}>
            <Accordion defaultActiveKey='0'>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey='0'>
                  <div style={{ padding: '10px' }}>
                    <h6>Click me!</h6>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>
                    <ul className='course-video-list'>
                      <li>
                        <div className='p-2 ' onClick ={(item)=>handleChangeTopic(item) }>
                          Hello! I'm the body
                        </div>
                      </li>
                      <li>
                        <div className='p-2'> Hello! I'm the body</div>
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card>
                <Accordion.Toggle as={Card.Header} eventKey='1'>
                  <div style={{ padding: '10px' }}>
                    <h6>Click me!</h6>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='1'>
                  <Card.Body>
                    <ul>
                      <li>
                        <div className='p-2'> Hello! I'm the body</div>
                      </li>
                      <li>
                        <div className='p-2'> Hello! I'm the body</div>
                      </li>
                      <li>
                        <div className='p-2'> Hello! I'm the body</div>
                      </li>
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col md={9}>
            <Tabs
              defaultActiveKey={type}
              id ='uncontrolled-tab-example'
              onSelect={key => {
                  history.push(`/coursePlayer/${exId}/${topic}/${key}`)
                debugger
              }}
            >
              <Tab eventKey='video' title='Video'>
                <Card>
                  <Card.Body>
                    {type === 'video' && (
                      <>
                        <Card.Title>Video</Card.Title>
                        <Player
                          playsInline
                          poster='/assets/poster.png'
                          src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
                        />
                      </>
                    )}

                    {/* <Button variant='primary'>Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey='audio' title='Audio'>
                <Card>
                  <Card.Body>
                    <Card.Title>AUDIO</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant='primary'>Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey='text' title='text'>
                <Card>
                  <Card.Body>
                    <Card.Title>TEXT</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant='primary'>Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  )
}
