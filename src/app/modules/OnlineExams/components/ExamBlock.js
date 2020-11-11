import React , {useState , useEffect} from 'react'

import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'

export default function ExamBlock ({ Exam, GoToExam }) {
  
    const  shuffle = (array) => {
      var currentIndex = array.length, temporaryValue, randomIndex;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    }
    
    // Used like so
    var colors = [`#22272e`, `#478381`, `#79b492`, `#33525d`,`#cbe09c`]
    useEffect(() => {
      var newColor =  shuffle(colors);
      setColor(newColor)
    }, [])
  
  const [color , setColor] = useState([])
  return (
    <>
      <Col xs={12} md={4} sm={4}>
        {color && color.length && <Card className='examBlockCard' style={{background: `linear-gradient(to right top,${color[0]} ,${color[1]},${color[2]},${color[3]},${color[4]})` }} >
          <Card.Body>
            <Card.Title>{Exam.examId[0].name}</Card.Title>
            <Card.Text>
              <div
                dangerouslySetInnerHTML={{
                  __html: Exam.examId[0].description ? Exam.examId[0].description : ''
                }}
              ></div>
            </Card.Text>
            <div className='cardDetails'>
              <div></div>
              {/* <svg>
                <use xlinkHref={"http://localhost:3000/media/svg/icons/Devices/Watch2.svg#img"}>                  
                </use>
              </svg> */}
              <img
                src={'http://localhost:3000/media/svg/icons/Devices/Watch2.svg'}
                alt='time'
              />
              {Exam.examId[0].timeInHours} : {Exam.examId[0].timeInMinutes} hrs.
              
              <br></br>
              Schedule :  {Exam.startDate.slice(0,10)} to {Exam.endDate.slice(0,10)}
              <p className='mt-5'>
                <span className='ExPassingMarks'>
                  Min Marks &nbsp; - &nbsp; {Exam.examId[0].passingMarks}
                </span>
                <span className='ExTotalMarks'>
                  Max Marks &nbsp; -&nbsp; {Exam.examId[0].totalMarks}
                </span>
              </p>
            </div>
            <div className='startExam'>
              <button
                onClick={() => {
                  debugger
                  GoToExam(Exam.examId[0]._id)
                }}
                className=' btn btn-link'
              >
                Go to Exam
              </button>
            </div>
          </Card.Body>
        </Card>
}
      </Col>
    </>
  )
}
