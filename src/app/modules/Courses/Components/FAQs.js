import React , {useEffect , useState } from 'react'
import { Row, Col,Card } from 'react-bootstrap'
import axios from 'axios'
import {
  useParams,
  useHistory
} from 'react-router'
export default function FAQs(){
  const {id} = useParams()
  const [faq , setfaq] = useState([])
  useEffect(() => {
    update()
  }, [])
  const update =() => {
    axios.get('/api/course/getFaq/' + id).then((res)=>{
       setfaq(res.data)
    }).catch((res)=>{

    })
  }
    return (
        <Card classNameName='col-md-12'>
        <Card.Header as='h5'>Frequently Asked Questions</Card.Header>
       {faq && faq.length && faq.map((ele) => 
       
       <Card.Body>

          <Row>
            <Col>
              <div style={{ width: '80%' }}>
                <h3>{ele.faq.question}</h3>
                <p>
                  {ele.faq.answer}
                </p>
               
                <p>
                  Created by <b>{ele.faq.createdBy[0].name}</b> Last updated {ele.faq.createdAt.slice(0,10)}
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
       )}
      </Card>
    )
}
