import React , {useEffect ,useState , useRef} from 'react'
import { Row, Col,Card , Button} from 'react-bootstrap'
import axios from 'axios'
import {
  useParams,
  useHistory
} from 'react-router'
import JoditEditor from 'jodit-react'
export default function Reviews(){
  const [review , setReview] = useState({
    review : ""
  })
  const [reviews , setReviews]  = useState()

  const editor = useRef(null)
  const config = {
    defaultActionOnPaste: 'insert_as_html',
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  }
  const {id} = useParams()
  useEffect(() => {
    update()
  }, [])
  const update =() => {
    axios.get('/api/course/getUserReviews/' + id).then((res)=>{
      setReviews(res.data)
    }).catch((res)=>{

    })
  }
  const handleReview = e => {
    setReview({
      ...review , 
      review : e.target.innerText })
  }
  const saveReview =  async event => {
    event.preventDefault()
    debugger;
    await axios.post('/api/course/saveReview/' + id , review).then((res) => {
    }).catch((error) => {

    })
    setReview({
      ...review , 
      review : ""
    })
    update()

  }
    return (
        <Card classNameName='col-md-12'>
          <div>Give Us Review
            <JoditEditor
              ref={editor}
              value={review.review}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={handleReview} // preferred to use only this option to update the content for performance reasons
            />
          </div>
          <Button onClick={saveReview}>Post</Button>
        <Card.Header as='h5'>Student Reviews</Card.Header>
        <Card.Body>
          <Row>
            <Col>
            {reviews && reviews.length && reviews.map((element) => 
              <div style={{ width: '80%' }} key={element._id} >
                <b><h3>{element.reviews.reviewBy[0].name}</h3></b>
                <p>
                  {element.reviews.review}
                </p>
               
                <p>
                  Created At : {element.reviews.createdAt.slice(0, 10)}
                </p>
              </div>
            )
            }
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}
