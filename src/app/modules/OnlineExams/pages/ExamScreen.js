import React, { useEffect, useState } from 'react'
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router'
import axios from 'axios'
import { Grid } from '../../../basicComponents/grid'

import QuestionMap from '../components/QuestionMap'
import Question from '../components/Question'
import { isLength, isObject } from 'lodash'

export default function ExamScreen() {
  const { id } = useParams()
  const [questions, setQuestions] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentItems, setCurrentItems] = useState()
  const [answersheet, setAnswersheet] = useState([])
  const [currentAnswers, setCurrentAnswers] = useState([])
  // const [totalPages, setTotalPages] = useState(1)
  const [intervalId , setIntervalId] = useState()
  const [time, setTime] = useState(null
  )
  const [t, setT] = useState(null)
  const history=useHistory();
    var forblock = (value) => history.block(value)

  var timing = () => {
    debugger;

    if (time) {
      var seconds = time.seconds
      var minutes = time.minutes
      var hours = time.hours
      var totalTime = time.totalTime

     var intervalId =  setInterval(() => {
        debugger;
        setIntervalId(intervalId)
        if (seconds > 0) {
          seconds = seconds - 1
          totalTime = totalTime - 1
          setT({
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            totalTime : totalTime
          })
        }
        
        if (seconds == 0) {

          if (minutes == 0) {
 
            if (hours == 0) {
              clearInterval(intervalId)
              forblock(true)
              saveResult()
            } else {
              hours = hours - 1
              minutes = 59
              seconds = 59
              totalTime = totalTime -1 
              setT({
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                totalTime : totalTime
              })
            }

          } else {
            minutes = minutes - 1
            seconds = 59
            totalTime = totalTime - 1
            setT({
              hours: hours,
              minutes: minutes,
              seconds: seconds,
              totalTime : totalTime
            })
          }
        }
      }, 1000)
    }

  }

  const nextPage = () => {
    if (questions && questions.length > currentPage) {
      setCurrentPage(currentPage + 1)
    }
  }
  const previousPage = () => {
    if (questions && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const setPage = page => {
    if (questions && page > 0 && page <= questions.length) {
      setCurrentPage(page)
    }
  }

  const setAnswer = () => {
    debugger;
    var item= currentItems;
    if(item){
      var ans = answersheet.filter(answer => answer.qid !== item._id)
      ans.push({
        options: currentAnswers,
        qid: item._id
      })
      setAnswersheet(ans)
      return ans;

    }

  }
  useEffect(() => {
    timing()
    timeClass()
  }, [time])
  useEffect(() => {
    timeClass()
  }, [t])
  useEffect(() => {
    forblock(false)
    axios
      .get('api/Examination/getExamQuestion/' + id)
      .then(res => {
        setQuestions(res.data.questions)
        setTime({ hours: res.data.timeInHours, minutes: res.data.timeInMinutes, seconds: 0 , totalTime : res.data.timeInHours * 3600 +res.data.timeInMinutes * 60  })
        setT({

          seconds: time.seconds,
          minutes: time.minutes,
          hours: time.hours,
          totalTime : time.hours * 3600 + time.minutes * 60 +time.seconds
        })
        // setCurrentQuestion(res.data[0].questions[0])
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (questions) {
      var currentItem = questions[currentPage - 1]
        setAnswer()
      
      setCurrentItems(currentItem)
      var ans = answersheet.filter(item => item.qid === currentItem._id)
      if (ans.length) {
        setCurrentAnswers(ans[0].options)
      } else {
        setCurrentAnswers([])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, questions])

  const getButtonVarient = question => {
    debugger

    var varient = 'secondary'
    var ans = answersheet.filter(item => item.qid === question._id)
    if (ans.length) {
      varient = 'danger'
      if (ans[0].options && ans[0].options.length) {
        varient = 'success'
      }
    }
    if (currentItems && currentItems._id === question._id) {
      varient = 'warning'
    }
    return varient
  }
  const setOption = (id, event) => {
    var chk = event.target.checked
    var op = currentAnswers.filter(m => m !== id)
    if (chk) setCurrentAnswers([...op, id])
    else setCurrentAnswers([...op])
  }

  const getCheckValue = id => {
    var op = currentAnswers.filter(m => m === id)
    if (op && op.length) {
      return true
    }
    return false
  }

  const saveResult=() => {
   var answer = setAnswer();
    console.log(answersheet)
    // alert(answersheet)
    axios.post("/api/Examination/saveExamResult",{
      anshwerSheet:answer,
      examId:id
    }).then((res)=>{
      
      alert("examination result is saved now you can start learning");
      history.push('/OnlineExam')
      // history.push("OnlineExam")
    }).catch(()=>{})

  }
  var timeClass = () =>{
    if(t && time){
     var fifty = time.totalTime * 1/2
     var twentyfive = time.totalTime * 1/4
      if( t.totalTime < twentyfive){
        return "red"
      }
      if(t.totalTime  < fifty){
        return "yellow"
      }
      return "blue"
    }
      
  }
  return (
    <div>
      <Row>
        <Col className='col-md-8'>
          <Card>
            <Card.Body>
              <Card.Title> Question</Card.Title>
              {currentItems && (
                <>
                  <Card.Text>
                    {currentItems.question}
                    question
                  </Card.Text>
                  <div className='separator separator-dashed mt-8 mb-5'></div>
                  <Card.Title> options</Card.Title>
                  <div className='checkbox-list'>
                    {currentItems.options &&
                      currentItems.options.map(item => {
                        return (
                          <label className='checkbox checkbox-outline'>
                            <input
                              type='checkbox'
                              onChange={event => {
                                setOption(item._id, event)
                              }}
                              checked={getCheckValue(item._id)}
                            />
                            <span></span>
                            {item.option}
                          </label>
                        )
                      })}
                  </div>
                </>
              )}
            </Card.Body>
            <Card.Footer>
              {questions && (
                <Row>
                  <Col>
                    <Button
                      variant='light'
                      className='moreIcon float-left'
                      onClick={() => {
                        previousPage()
                      }}
                    >
                      &#x2190; previous
                    </Button>
                  </Col>
                  <Col className={'text-center'}>
                    <Button
                      className='moreIcon  btn  btn-primary'
                      onClick={() => {
                        var message  =  window.confirm("are you sure you want to submit the ");
                        if(message){
                          clearInterval(intervalId)
                          forblock(true)
                          saveResult()
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant='light'
                      className='moreIcon float-right'
                      onClick={() => {
                        nextPage()
                      }}
                    >
                      Next &#10132;
                    </Button>
                  </Col>
                </Row>
              )}
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>
            {t && <Card.Header as='h5' style={{ backgroundColor : timeClass() }}>Time : &nbsp; {`${t.hours} : ${t.minutes} : ${t.seconds} `}</Card.Header>}

            <Card.Header as='h5'>Paper Question Attempt</Card.Header>
            <Card.Body>
              <Row className='btn-group-inline'>
                <Button className='CustomBtnSm' variant='outline-danger'>
                  1
                </Button>
                <Button className='CustomBtnSm' variant='outline-success'>
                  2
                </Button>
                <Button className='CustomBtnSm' variant='outline-secondary'>
                  3
                </Button>
                <Button className='CustomBtnSm' variant='outline-warning'>
                  20
                </Button>
              </Row>
              <div className='separator separator-dashed mt-3 mb-3'></div>
              <Row className='btn-group-inline'>
                {questions &&
                  questions.map((question, index) => {
                    return (
                      <Button
                        className='CustomBtn'
                        variant={getButtonVarient(question)}
                        onClick={() => {
                          setPage(index + 1)
                        }}
                      >
                        {index + 1}
                      </Button>
                    )
                  })}

                {/* <Button className='CustomBtn' variant='danger'>
                  1
                </Button>
                <Button className='CustomBtn' variant='success'>
                  2
                </Button>
                <Button className='CustomBtn' variant='secondary'>
                  3
                </Button>
                <Button className='CustomBtn' variant='danger'>
                  4
                </Button> */}
              </Row>
              <div className='separator separator-dashed mt-8 mb-5'></div>
              <Row>
                <Col>
                  <Button variant='light' className='moreIcon float-left'>
                    &#x2190; previous
                  </Button>
                </Col>
                <Col>
                  <Button variant='light' className='moreIcon float-right'>
                    Next &#10132;
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row className='btn-group'>
                <Button variant='danger'>No Action</Button>
                <Button variant='success'>Answer Submitted</Button>
                <Button variant='secondary'>Soch kar Likh Dena</Button>
                <Button variant='warning'>Question Skip</Button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
