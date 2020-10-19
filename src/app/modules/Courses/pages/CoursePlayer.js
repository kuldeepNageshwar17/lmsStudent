import React ,{useEffect, useState} from 'react'
// import "../../../../../"
import '../../../../../node_modules/video-react/dist/video-react.css'
import { Player } from 'video-react'
import axios from 'axios'
import {Link} from "react-router-dom";
import PDFViewer from 'pdf-viewer-reactjs'
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';

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
  Button,
  Image
} from 'react-bootstrap'

import { useParams, useHistory } from 'react-router'
export default function CoursePlayer () {
  const history = useHistory()
  const [sections, setSections] = useState()
  const [currentItem, setCurrentItem] = useState()
  const { id, topic, type } = useParams()
  const handleChangeTopic=(item)=>{
    history.push(`/coursePlayer/${id}/${topic}/${type}`)
  }
  useEffect(() => {
    
    axios
      .get('/api/Course/getSectionsByCourseId/' + id)
      .then(res => {
        setSections( res.data)
        setCurrentItem(res.data.sections[0].contents[0])
        history.push(`/coursePlayer/${id}/${res.data.sections[0].contents[0]._id}/video`)
      })
      .catch(() => {})
      
  }, [])

  return (
    <>
      <Navbar bg='dark'>
        <Navbar.Brand href='#home'>Brand link</Navbar.Brand>
      </Navbar>
      <Container fluid>
          {sections&&
          <Row className='mt-5'>
          <Col md={3}>
            <Accordion defaultActiveKey='0'>
              {sections.sections.map((data,index) => {
                return(
                  <Card key={data._id}>
                  <Accordion.Toggle as={Card.Header} eventKey={index}>
                    <div style={{ padding: '10px' }}>
                      <h6>{data.name}</h6>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index}>
                    <Card.Body>
                      <ul className='course-video-list'>
                        {data.contents.map((contentsdata) => {
                          return(
                            <li key={contentsdata._id}>
                              <Link to={`/coursePlayer/${id}/${contentsdata._id}/video`} onClick={() => setCurrentItem(contentsdata)} >{contentsdata.title}</Link>
                              {/* <div className='p-2 ' onClick ={(item)=>handleChangeTopic(item) }>
                                {contentsdata.title}
                                
                              </div> */}
                            </li>
                          )
                        })}
                        
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                )
                
              })}
            </Accordion>
          </Col>
          <Col md={9}>
            <Tabs
              defaultActiveKey={type}
              id ='uncontrolled-tab-example'
              onSelect={key => {
                  history.push(`/coursePlayer/${id}/${topic}/${key}`)
                debugger
              }}
            >
              {currentItem && currentItem.videoUrl &&
              <Tab eventKey='video' title='Video'>
                <Card>
                  <Card.Body>
                    {currentItem &&  currentItem.videoUrl && (
                      <>
                        <Card.Title>Video</Card.Title>
                        <div  dangerouslySetInnerHTML={{    __html: currentItem ? currentItem.videoDescription : ""  }}></div>
                        <Player
                          autoPlay
                          playsInline
                          poster='/assets/poster.png'
                          src={`${window.$apihost}uploads/CourseContent/${currentItem.videoUrl}`}
                        />
                      </>
                    )}

                    {/* <Button variant='primary'>Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              </Tab>
              }
              
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
              {currentItem && currentItem.imageUrl &&
              <Tab eventKey='Media File' title='Media File'>
                <Card>
                  <Card.Body>
                    <Card.Title>Image</Card.Title>
                    <Card.Text>
                    <div  dangerouslySetInnerHTML={{    __html: currentItem ? currentItem.imageDescription : ""  }}></div>
                      <Image src={currentItem ? `${window.$apihost}uploads/CourseContent/${currentItem.imageUrl}` : ""} width="500px"></Image>
                    </Card.Text>
                    {/* <Button variant='primary'>Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              </Tab>
              }
              {currentItem && currentItem.pdfUrl &&
              <Tab eventKey='pdf' title='pdf'>
                <Card>
                  <Card.Body>
                    <Card.Title>Pdf</Card.Title>
                    {console.log(`${window.$apihost}uploads/CourseContent/${currentItem.pdfUrl}`)}

                    
                    {/* <Document
                      options={{
                        cMapUrl: `${window.$apihost}uploads/CourseContent/${currentItem.pdfUrl}`,
                        cMapPacked: true,
                      }}
                    />  */}
                    {/* <PDFViewer
                        document={{
                            url: `${window.$apihost}uploads/CourseContent/${currentItem.pdfUrl}`,
                            base64 : String
                        }}
                    /> */}
        {/* <Image src={currentItem ? `${window.$apihost}uploads/CourseContent/${currentItem.imageUrl}` : ""} width="500px"></Image> */}
                    
                    <Button variant='primary'>Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Tab>
              }
              {currentItem && currentItem.textDescription &&
              <Tab eventKey='text' title='text'>
                <Card>
                  <Card.Body>
                    <Card.Title>TEXT</Card.Title>
                    <Card.Text>
                      {console.log("currentItem" , currentItem)}
                      <div  dangerouslySetInnerHTML={{    __html: currentItem ? currentItem.textDescription : ""  }}></div>
                    </Card.Text>
                    <Button variant='primary'>Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Tab>
              } 
            </Tabs>
          </Col>
        </Row>
    

          }   </Container>
    </>
  )
}
