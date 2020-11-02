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
import ReactPlayer from 'react-player'


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
  const [ids , setIds] = useState()
  const [progress , setprogress] = useState()
  const { id, topic, type} = useParams()

 const player = React.createRef()
  const handleChangeTopic=(item)=>{
    history.push(`/coursePlayer/${id}/${topic}/${type}`)
  }
  useEffect(() => {   
    axios
      .get('/api/Course/getCourseWithProgress/' + id)
      .then(async res => {
        setSections( res.data)
        debugger;
        axios.get('/api/student/getStudentProgress' + res.data._id).then((res) => {
          setprogress(res.data)
        }).catch((error) => {

        })
        // var studentdata = { courseId :res.data._id , sectionId :res.data.sections[0]._id , contentId : res.data.sections[0].contents[0]._id}
        console.log()
        // setStudentRecent(studentdata)
       await studentRecentHistory(res.data.sections[0].contents[0] , res.data._id , res.data.sections[0]._id ,res.data.sections[0].contents[0]._id)
        history.push(`/coursePlayer/${id}/${res.data.sections[0].contents[0]._id}/video`)
      })
      .catch(() => {})
      
  }, [history, id])
        const  studentRecentHistory = async (data , courseId , sectionId , contentId) => {
          try {
                  debugger;
                setCurrentItem(data)
                
                var studentdata = { courseId , sectionId , contentId}
                setIds(studentdata)
                setStudentRecent(studentdata)

              await  axios.post('/api/student/StudentProgress' , studentdata).then((res) => {
                  console.log(res.data)
                }).catch((Error) => {

                })
          } catch (error) {
            alert(error)
          }
          
        }
       const studentVideoProgress  = async(ids , time) => {
         var studentdata = {courseId : ids.courseId , sectionId : ids.sectionId, contentId : ids.contentId , time} 
        await  axios.post('/api/student/StudentProgress' , studentdata).then((res) => {
          console.log(res.data)
        }).catch((Error) => {

        })
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
            <Accordion defaultActiveKey={0}>
              {sections.sections.map((data,index) => {
                return(
                  <Card key={data._id}>
                  <Accordion.Toggle as={Card.Header} eventKey={index} >
                    <div style={{ padding: '10px' }} className="course-player-section-list">
                      <h6>{data.name}</h6>
                    </div>                    
                  </Accordion.Toggle>
                 
                  <Accordion.Collapse eventKey={index}>
                    <Card.Body>
                      <ul className='course-player-content-list'>
                        {data.contents.map((contentsdata) => {
                          return(
                            <li key={contentsdata._id} className="active watched" >
                              <Link  to={`/coursePlayer/${id}/${contentsdata._id}/${contentsdata.videoUrl  ? "video" : contentsdata.audioUrl  ? "audio" : contentsdata.imageUrl  ? "image" : contentsdata.pdfUrl  ?  "pdf" : "text" }`} onClick={() => studentRecentHistory(contentsdata ,sections._id ,data._id ,contentsdata._id )} >{contentsdata.title}
                              
                              <span>{"3:25"}</span>
                              </Link>                             
                        
                            </li>
                          )
                        })}
                        
                      </ul>
                      <button className="btn btn-success btn-block course-player-test-btn" onClick={()=>{
                        
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

                     // <Player
                     //      autoPlay
                     //      muted
                     //      playsInline
                     //      ref={player}
                     //      config
                     //      // onSeeking = {(item )=>{
                     //      //   console.log("item:",item.timeStamp)
                     //      //     }}
                     //      // onTimeUpdate ={(item )=>{
                     //      //   console.log("item:",item)
                     //      //     }}
                            <ReactPlayer
                                url = {`http://localhost:4000/api/stream/video/${currentItem.videoUrl}`}
                                playing={true}
                                className='react-player'
                                
                                playsinline={true}
                                width='100%'
                                height='100%'
                                ref={(player) => player = player}
                                onReady ={(player) => { 
                                  if(player.getCurrentTime() < currentItem.VideoLastPosition - 1  ){
                                    player.seekTo(currentItem.VideoLastPosition, "seconds")
                                  }
                                }}
                                playing={true}
                                onProgress= {(time)=>{
                                  console.log(time)
                                  if(Math.floor(time.playedSeconds) % 10 === 0)
                                  studentVideoProgress(ids , time.playedSeconds)
                                }}
                                controls
                                config={{ 
                                  file: { 
                                    attributes: { controlsList: 'nodownload' }
                                  }
                                }}
                              >
                            </ReactPlayer>
                      
                        
                        
                        )}
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
