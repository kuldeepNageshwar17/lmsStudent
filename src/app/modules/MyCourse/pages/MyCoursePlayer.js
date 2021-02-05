import React, {
  useEffect,
  useState
} from 'react'
import '../../../../../node_modules/video-react/dist/video-react.css'
import {
  Player,
  Video,
  ControlBar,
  ForwardControl,
  ReplayControl,
  VolumeMenuButton
} from 'video-react'
import axios from 'axios'
import {
  Link
} from "react-router-dom";
import {
  Document,
  Page
} from 'react-pdf';
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
  Image,
  Form
} from 'react-bootstrap'

import {
  useParams,
  useHistory
} from 'react-router'
import { Divider } from '@material-ui/core';
export default function MyCoursePlayer() {
  const history = useHistory()
  const [CourseData, setCourseData] = useState()
  const [currentItem, setCurrentItem] = useState()
  const [StudentRecent, setStudentRecent] = useState()
  const [discussion  , setDiscussion] = useState()
  const [descussionQuestion , setDescussionQuestion] = useState({
    videoTime : "" , 
    questionText : ""
  })

  // const [CurrentsectionId, setCurrentsectionId] = useState()
  // const [progress , setprogress] = useState()
  const {
    id,
    contentId,
    type,
    sectionId
  } = useParams()
  // const { id, topic, type} = useParams()

  const player = React.createRef()
  // const handleChangeTopic=(item)=>{
  //   history.push(`/coursePlayer/${id}/${topic}/${type}`)
  // }
 const  submitDiscussionQuestion = () => {
    axios.post(`/api/course/${id}/createDiscussioninCourse/${sectionId}/${currentItem._id}` , descussionQuestion).then((res) => {
      axios.get(`/api/course/${id}/${currentItem._id}/getDiscussion`).then((res) => {
        setDiscussion(res.data)
      }).catch((error)=>{
  
      })
    }).catch((error) => {

    })
  }
  const getDiscussion = (contentid) => {
   
      axios.get(`/api/course/${id}/${contentid}/getDiscussion`).then((res) => {
        setDiscussion(res.data)
      }).catch((error)=>{
  
      })
    
    
  }
  const gerCourse = () => {
    axios
      .get('/api/Course/getUserSectionsProgressByCourseId/' + id)
      .then(async res => {
        setCourseData(res.data)        
        if (!currentItem) {
          setCurrentItem(res.data.sections[0].contents[0])
        //  getDiscussion(res.data.sections[0] && res.data.sections[0].contents[0] && res.data.sections[0].contents[0]._id ? res.data.sections[0].contents[0]._id : res.data.sections[0].contents[1] ? res.data.sections[0].contents[1]._id : res.data.sections[1].contents[0] ? res.data.sections[1].contents[0]._id : res.data.sections[1].contents[1] ? res.data.sections[1].contents[1]._id : res.data.sections[1].contents[1]._id  )
          history.push(`/mycoursePlayer/${id}/${res.data.sections[0]._id}/${res.data.sections[0].contents[0]._id}/video`)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    console.log("in here i am ")
    gerCourse()
    //setStudentProgress() 
  }, [])
  useEffect(() => {
    gerCourse()
    if (CourseData) {
      var section = CourseData.sections.find(section => section._id == sectionId)
      if (section) {
        var content = section.contents.find(m => m._id == contentId)
        // content.seen=true
        setCurrentItem(content);
        getDiscussion(content._id)
      }
      setStudentProgress()
    }
  }, [contentId])

  const setStudentProgress = async () => {
    try {
      debugger
      if (sectionId, contentId) {
        var studentdata = {
          courseId: id,
          sectionId: sectionId,
          contentId
        }

        await axios.post('/api/user/UserProgress', studentdata).then((res) => {
          console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }

    } catch (error) { }
  }
  const studentVideoProgress = async (time) => {
    var studentdata = {
      courseId: id,
      sectionId: sectionId,
      contentId,
      time
    }
    await axios.post('/api/user/UserProgress', studentdata).then((res) => {
      console.log(res.data)
    }).catch((Error) => {
    })
  }
  const changeContentClass = content => {
    debugger;
    var classname = ""
    if (contentId == content._id) {
      classname = classname + "watched active"
    }
    else
      if ( content.seen) {
        classname = "watched"
      }
    return classname
  }
var i = 1
 
  const GetClassForContent = contentsdata => {  
    if (currentItem && currentItem._id === contentsdata._id && contentsdata.seen == true)return  'watched active'
    if (contentsdata.seen === true) return 'watched'
  }
  return (
    <>
      <Navbar bg='dark'>
        <Navbar.Brand
          className='text-warning'
          onClick={() => history.push('/MyCourses')}
        >
          {' '}
          &#8592; Back{' '}
        </Navbar.Brand>
      </Navbar>
      <Container fluid>
        {CourseData && (
          <Row className='mt-5'>
            <Col md={3}>
              <Accordion defaultActiveKey={0}>
                {CourseData.sections.map((data, index) => {
                  return (
                    <Card key={data._id}>
                      <Accordion.Toggle as={Card.Header} eventKey={index}>
                        <div
                          style={{ padding: '10px' }}
                          className='course-player-section-list'
                        >
                          <h6>{data.name}</h6>
                        </div>
                      </Accordion.Toggle>

                      <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                          <ul className='course-player-content-list'>
                            {data.contents.map(contentsdata => {
                              return (
                                <li
                                  key={contentsdata._id}
                                  className={changeContentClass(contentsdata)}
                                >
                                  <Link
                                    to={`/mycoursePlayer/${id}/${data._id}/${contentsdata._id
                                      }/${contentsdata.videoUrl
                                        ? 'video'
                                        : contentsdata.audioUrl
                                          ? 'audio'
                                          : contentsdata.imageUrl
                                            ? 'image'
                                            : contentsdata.pdfUrl
                                              ? 'pdf'
                                              : 'text'
                                      }`}
                                  // onClick={() =>
                                  //   studentRecentHistory(
                                  //     contentsdata,
                                  //     sections._id,
                                  //     data._id,
                                  //     contentsdata._id
                                  //   )
                                  // }
                                  >
                                    {contentsdata.title}

                                    <span>{contentsdata.videoLength ? contentsdata.videoLength : "Video Time" }</span>
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                          <button
                            className='btn btn-success btn-block course-player-test-btn'
                            onClick={() => {
                              history.push(`/MyTest/sectionTests/${data._id}`)
                            }}
                          >
                            Tests
                          </button>
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
                id='uncontrolled-tab-example'
                onSelect={key => {
                  history.push(`/mycoursePlayer/${id}/${contentId}/${key}`)
                  
                }}
              >
                {currentItem &&
                  (currentItem.videoUrl || currentItem.videoDescription) && (
                    <Tab eventKey='video' title='Video'>
                      <Card>
                        <Card.Body>
                          <>
                            {/* <Card.Title>Video</Card.Title> */}
                            {currentItem && currentItem.videoUrl && (
                              <ReactPlayer
                                url={`http://localhost:4000/api/stream/video/${currentItem.videoUrl}`}
                                playing={true}
                                className='react-player'
                                muted
                                playsinline={true}
                                width='100%'
                                height='100%'
                                ref={player => (player = player)}
                                onReady={player => {
                                  
                                  if (
                                    player.getCurrentTime() < 
                                    currentItem.VideoLastPosition - 1 
                                  ) {
                                    player.seekTo(
                                      currentItem.VideoLastPosition,
                                      'seconds'
                                    )
                                    
                                  }
                                  setCurrentItem({...currentItem , VideoLastPosition : 0 })
                                  
                                  
                                }}
                                playing={true}
                                onProgress={time => {
                                  setDescussionQuestion({...descussionQuestion  ,videoTime :  time.playedSeconds})
                                  if (Math.floor(time.playedSeconds) % 10 === 0)
                                    studentVideoProgress(
                                      time.playedSeconds
                                    )
                                }}
                                controls
                                config={{
                                  file: {
                                    attributes: { controlsList: 'nodownload' }
                                  }
                                }}
                              ></ReactPlayer>
                            )}
                          </>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: currentItem
                                ? currentItem.videoDescription
                                : ''
                            }}
                          ></div>
                          <hr></hr>
                          Discussion 
                          <hr></hr>
                          <form>
                            <div class="form-group">
                              <label for="exampleInputEmail1">Add Question</label>
                              <input type="text" class="form-control"   placeholder="Ask Here" required
                               onChange={(event) => { setDescussionQuestion({...descussionQuestion  ,questionText : event.target.value})
                                        }}></input>
                              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            
                            <button  onClick={submitDiscussionQuestion} class="btn btn-primary">Submit</button>
                          </form>
                          <ul class="list-group">
                            
                            {discussion && discussion.length && discussion.map((singleDiscussion) => {
                            
                            i = i +1 
                              return (
                                
                                  <li key={singleDiscussion.discussion._id} class="list-group-item" style={{backgroundColor : "#E4E6EF"}} >
                                      {/* <p>VideoTime :  &nbsp;{singleDiscussion.discussion.question.videoTime}</p>  */}
                                      <p>Question At :  &nbsp; {singleDiscussion.discussion.question.createdDate.slice(0,10)}</p>
                                  {singleDiscussion.discussion.answer.answerText && <p>Answered At :  &nbsp; {singleDiscussion.discussion.answer.createdDate.slice(0,10)}</p>}
                                      <p>Question No  {i}:  &nbsp;{singleDiscussion.discussion.question.questionText}</p> 
                            
                                    <hr></hr>
                              {singleDiscussion.discussion.answer.answerText && <p>Answer :  &nbsp; {<div  dangerouslySetInnerHTML={{    __html: singleDiscussion.discussion.answer.answerText }}></div>}</p> || <p style={{color : 'Red'}}>Not Answered Yet</p> }
                                    <br></br>
                                    <hr></hr>
                                    <hr></hr>
                                    <hr></hr>
                                   </li>
                                  
                                   
                            
                            
                              )
                            }) || "No Discussion Yet"}
                            
                          
                            
                          </ul>
                          {/* <Button variant='primary' onClick={player.pause()}>Go somewhere</Button> */}
                        </Card.Body>
                      </Card>
                    </Tab>
                  )}
                {currentItem &&
                  (currentItem.audioUrl || currentItem.audioDescription) && (
                    <Tab eventKey='audio' title='Audio'>
                      <Card>
                        <Card.Body>
                          <Card.Title>AUDIO</Card.Title>
                          <Card.Text>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: currentItem
                                  ? currentItem.audioDescription
                                  : ''
                              }}
                            ></div>
                          </Card.Text>
                          {currentItem && currentItem.audioUrl && (
                            <ReactAudioPlayer
                              src={`${window.$apihost}uploads/CourseContent/${currentItem.audioUrl}`}
                              autoPlay
                              controls
                              controlsList="nodownload"
                            />
                          )}
                        </Card.Body>
                      </Card>
                    </Tab>
                  )}
                {currentItem &&
                  (currentItem.imageUrl || currentItem.imageDescription) && (
                    <Tab eventKey='image' title='Media File'>
                      <Card>
                        <Card.Body>
                          <>
                            <Card.Title>Image</Card.Title>
                            <Card.Text>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: currentItem
                                    ? currentItem.imageDescription
                                    : ''
                                }}
                              ></div>
                            </Card.Text>
                            {currentItem && currentItem.imageUrl && (
                              <Image
                                src={
                                  currentItem
                                    ? `${window.$apihost}uploads/CourseContent/${currentItem.imageUrl}`
                                    : ''
                                }
                                width='500px'
                              ></Image>
                            )}
                            {/* <Button variant='primary'>Go somewhere</Button> */}
                          </>
                        </Card.Body>
                      </Card>
                    </Tab>
                  )}
                {currentItem && currentItem.pdfUrl  &&
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
                            controls
                        />
                        )}
                      </Card.Body>
                    </Card>
                  </Tab>
                  }
                {currentItem && currentItem.textDescription && (
                  <Tab eventKey='text' title='text'>
                    <Card>
                      <Card.Body>
                        <Card.Title>TEXT</Card.Title>
                        <Card.Text>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: currentItem
                                ? currentItem.textDescription
                                : ''
                            }}
                          ></div>
                        </Card.Text>
                        {/* <Button variant='primary'>Go somewhere</Button> */}
                      </Card.Body>
                    </Card>
                  </Tab>
                )}
              </Tabs>
            </Col>
          </Row>
        )}{' '}
      </Container>
    </>
  )
}