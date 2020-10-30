import React ,{useEffect, useState} from 'react'
// import "../../../../../"
import '../../../../../node_modules/video-react/dist/video-react.css'
import { Player , Video , ControlBar , ForwardControl , ReplayControl , VolumeMenuButton} from 'video-react'
import axios from 'axios'
import {Link} from "react-router-dom";
import PDFViewer from 'pdf-viewer-reactjs';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import PDF from 'react-pdf-js-infinite';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from "react-player";

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
  const [StudentRecent , setStudentRecent] = useState()
  const [value , setValue] = useState()
  const { id, topic, type} = useParams()

 const player = React.createRef()
  const handleChangeTopic=(item)=>{
    history.push(`/coursePlayer/${id}/${topic}/${type}`)
  }
  useEffect(() => {
    
    axios
      .get('/api/Course/getSectionsByCourseId/' + id)
      .then(async res => {
        setSections( res.data)
       await studentRecentHistory(res.data.sections[0].contents[0] , res.data._id , res.data.sections[0]._id ,res.data.sections[0].contents[0]._id)
        history.push(`/coursePlayer/${id}/${res.data.sections[0].contents[0]._id}/video`)
      })
      .catch(() => {})
      
  }, [history, id])
       const  studentRecentHistory = async(data , courseId , sectionId , contentId) => {
        setCurrentItem(data)
        var studentdata = { courseId , sectionId , contentId}
        setStudentRecent(studentdata)
        // axios.post('/api/student/updateRecentStudentData' , studentdata).then((res) => {
        //   alert(res.status)
        // }).catch((Error) => {

        // })
        }

  return (
    <>
      <Navbar bg='dark'>
        <Navbar.Brand  className="text-warning" onClick={ () => history.push('/Courses')}>	&#8592; Back </Navbar.Brand>
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
                              <Link to={`/coursePlayer/${id}/${contentsdata._id}/${contentsdata.videoUrl  ? "video" : contentsdata.audioUrl  ? "audio" : contentsdata.imageUrl  ? "image" : contentsdata.pdfUrl  ?  "pdf" : "text" }`} onClick={() => studentRecentHistory(contentsdata ,sections._id ,data._id ,contentsdata._id )} >{contentsdata.title}</Link>
                              {/* <div className='p-2 ' onClick ={(item)=>handleChangeTopic(item) }>
                                {contentsdata.title}
                                
                              </div> */}
                            </li>
                          )
                        })}
                        
                      </ul>
                      <button className="btn btn-success btn-block" onClick={()=>{
                        
                          history.push(`/test/sectionTests/${data._id}`)
                    }}>Tests</button>
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
                        {/* <Card.Title>Video</Card.Title> */}
                        {currentItem &&  currentItem.videoUrl && (

             <Player
                          autoPlay
                          playsInline
                          ref={player}
                          config
                          // onSeeking = {(item )=>{
                          //   console.log("item:",item.timeStamp)
                          //     }}
                          // onTimeUpdate ={(item )=>{
                          //   console.log("item:",item)
                          //     }}
              
                          poster='/assets/poster.png'
                          src={"http://localhost:4000/api/stream/video/"+currentItem.videoUrl}
                        >
                          <ControlBar autoHide={false}>
                            <VolumeMenuButton vertical />
                            <ReplayControl seconds={5} order={2.1}></ReplayControl>
                            <ForwardControl seconds={5} order={3.1}></ForwardControl>
                          </ControlBar>
                        </Player>
                        
                        
                        )}
                        {player && 
                            console.log("value" , player)
                        }
                      </>
                      
                      <div  dangerouslySetInnerHTML={{    __html: currentItem ? currentItem.videoDescription : ""  }}></div>

                     
                    

                    {/* <Button variant='primary' onClick={player.pause()}>Go somewhere</Button> */}
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
              {/* {currentItem && (currentItem.pdfUrl || currentItem.pdfDescription ) &&
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
              } */}
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
