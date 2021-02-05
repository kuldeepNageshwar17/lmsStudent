import React  , {useEffect,  useRef , useState} from 'react'
import { Row, Col,Card ,Button  , Form } from 'react-bootstrap'
import axios from 'axios'
import JoditEditor from 'jodit-react'
import {
  useParams,
  useHistory
} from 'react-router'
export default function Announcement({data}){

const [announcements , setannoucements] = useState()

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
    axios.get('/api/course/getAnnouncement/' + id).then((res)=>{
      setannoucements(res.data)
    }).catch((res)=>{

    })
  }

 
    return (
        <Card classNameName='col-md-12'>
            
        <Card.Header as='h5'>Announcements</Card.Header>
        <Card.Body>
          <Row>
            <Col>
            {announcements && announcements.length && announcements.map((element) => 
                
              <div style={{ width: '80%' }} key={element.announcement._id}>
                
                <h3>{element.announcement.title}</h3>
                <p>
                  {element.announcement.Description}
                </p>
               
                <p>
                  Created at {element.announcement.createDate.slice(0, 10)}
                </p>
              </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
}
