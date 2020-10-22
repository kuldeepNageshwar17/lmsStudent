import React ,{useEffect, useState} from 'react'
// import "../../../../../"
import '../../../../../node_modules/video-react/dist/video-react.css'
import { Player } from 'video-react'
import axios from 'axios'
import {Link} from "react-router-dom";
import PDFViewer from 'pdf-viewer-reactjs'
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import PDF from 'react-pdf-js-infinite';
import ReactAudioPlayer from 'react-audio-player';

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
                              <Link to={`/coursePlayer/${id}/${contentsdata._id}/${contentsdata.videoUrl || contentsdata.videoDescription ? "video" : contentsdata.audioUrl || contentsdata.audioDescription ? "audio" : contentsdata.imageUrl || contentsdata.imageDescription ? "image" : contentsdata.pdfUrl || contentsdata.pdfDescription ?  "pdf" : "text" }`} onClick={() => setCurrentItem(contentsdata)} >{contentsdata.title}</Link>
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
              {currentItem && (currentItem.videoUrl || currentItem.videoDescription ) && 
              <Tab eventKey='video' title='Video'>
                <Card>
                  <Card.Body>
                    
                      <>
                        <Card.Title>Video</Card.Title>
                        <div  dangerouslySetInnerHTML={{    __html: currentItem ? currentItem.videoDescription : ""  }}></div>
                        {currentItem &&  currentItem.videoUrl && (
                        <Player
                          autoPlay
                          playsInline
                          poster='/assets/poster.png'
                          src={`${window.$apihost}api/video/stream/getvideo/ + ${currentItem.videoUrl}`}
                        />
                        )}
                      </>
                    

                    {/* <Button variant='primary'>Go somewhere</Button> */}
                  </Card.Body>
                </Card>
              </Tab>
              }
              {currentItem && (currentItem.audioUrl || currentItem.audioDescription ) &&
              <Tab eventKey='audio' title='Audio'>
                <Card>
                  <Card.Body>
                    <Card.Title>AUDIO</Card.Title>
                    <Card.Text>
                    <div  dangerouslySetInnerHTML={{    __html: currentItem ? currentItem.audioDescription : ""  }}></div>
                    </Card.Text>
                    {currentItem && currentItem.audioUrl && (
                    <ReactAudioPlayer
                      src={`${window.$apihost}uploads/CourseContent/${currentItem.audioUrl}`}
                      autoPlay
                      controls
                    />
                    )}

                  </Card.Body>
                </Card>
              </Tab>
              }
              {currentItem && (currentItem.imageUrl || currentItem.imageDescription ) &&
              <Tab eventKey='image' title='Media File'>
                <Card>
                  <Card.Body>
                  <>
                    <Card.Title>Image</Card.Title>
                    <Card.Text>
                    <div  dangerouslySetInnerHTML={{    __html: currentItem ? currentItem.imageDescription : ""  }}></div>
                    </Card.Text>
                    {currentItem && currentItem.imageUrl && (
                      <Image src={currentItem ? `${window.$apihost}uploads/CourseContent/${currentItem.imageUrl}` : ""} width="500px"></Image>
                    )}
                    {/* <Button variant='primary'>Go somewhere</Button> */}
                    </>
                  </Card.Body>
                </Card>
              </Tab>
              }
              {currentItem && (currentItem.pdfUrl || currentItem.pdfDescription ) &&
              <Tab eventKey='pdf' title='pdf'>
                <Card>
                  <Card.Body>
                    <Card.Title>Pdf</Card.Title>
                    <Card.Text>
                    <div  dangerouslySetInnerHTML={{    __html: currentItem ? currentItem.pdfDescription : ""  }}></div>
                    </Card.Text>
                    {currentItem &&  currentItem.videoUrl && (
                        <PDF 
                        file={`${window.$apihost}uploads/CourseContent/${currentItem.pdfUrl}`} 
                        width = '100%'
                    />
                    )}
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
                      <div  dangerouslySetInnerHTML={{    __html: currentItem ? currentItem.textDescription : ""  }}></div>
                    </Card.Text>
                    {/* <Button variant='primary'>Go somewhere</Button> */}
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
