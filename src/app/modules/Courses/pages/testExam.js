import React from 'react'
import {Row, Col, Card, ButtonGroup, Button} from 'react-bootstrap'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
export default function testExam() {
    return (
        <div>
           <Row>
               <Col><Card><Card.Header  as="h5">Questions</Card.Header><Card.Body>
                   <Card.Title>Questin Here</Card.Title>
                   <Card.Text>Text Here</Card.Text>
                   </Card.Body></Card></Col>
               <Col><Card><Card.Header  as="h5">Option</Card.Header><Card.Body>
               {/* <ToggleButtonGroup vertical type="radio" name="options" defaultValue={1}>
    <ToggleButton value={1}>Radio 1 (pre-checked)</ToggleButton>
    <ToggleButton value={2}>Radio 2</ToggleButton>
    <ToggleButton value={3}>Radio 3</ToggleButton>
  </ToggleButtonGroup> */}
  <div className="checkbox-list">
    <label className="checkbox checkbox-outline">
     <input type="checkbox"/>
     <span></span>
     Email
    </label>
    <label className="checkbox checkbox-outline">
     <input type="checkbox"/>
     <span></span>
     SMS
    </label>
    <label className="checkbox checkbox-outline">
     <input type="checkbox"/>
     <span></span>
     Phone
    </label>
    <label className="checkbox checkbox-outline">
     <input type="checkbox"/>
     <span></span>
     Car
    </label>
   </div>
                   </Card.Body></Card></Col>
               <Col><Card><Card.Header  as="h5">Paper Question Attempt</Card.Header>
               <Card.Body>
               <Row className='btn-group-inline'>
    <Button className='CustomBtnSm' variant='outline-danger'>1</Button>
    <Button className='CustomBtnSm'variant="outline-success">2</Button>
    <Button className='CustomBtnSm'variant="outline-secondary">3</Button>
    <Button className='CustomBtnSm' variant='outline-warning'>20</Button></Row>
               <div className="separator separator-dashed mt-3 mb-3"></div>
               <Row className='btn-group-inline'>
    <Button className='CustomBtn' variant='danger'>1</Button>
    <Button className='CustomBtn'variant="success">2</Button>
    <Button className='CustomBtn'variant="secondary">3</Button>
    <Button className='CustomBtn' variant='danger'>4</Button>
    <Button className='CustomBtn'variant="success">5</Button>
    <Button className='CustomBtn'variant="secondary">6</Button>
    <Button className='CustomBtn' variant='danger'>7</Button>
    <Button className='CustomBtn'variant="success">8</Button>
    <Button className='CustomBtn'variant="secondary">9</Button>
    <Button className='CustomBtn'variant="secondary">10</Button>    
  </Row>
  <div className="separator separator-dashed mt-8 mb-5"></div>
  <Row><Col><Button variant="light" className='moreIcon float-right'>More &#10132;</Button></Col></Row>
  {/* <a href='' className='CustomBtn'>1</a> */}
                   </Card.Body></Card></Col>
           </Row>
           <Row>
           <Col><Card>
               <Card.Body>
               <Row className='btn-group'>
    <Button variant='danger'>No Action</Button>
    <Button variant="success">Answer Submitted</Button>
    <Button variant="secondary">Soch kar Likh Dena</Button>
    <Button variant='warning'>Question Skip</Button></Row>
               </Card.Body>
                   </Card></Col>
           </Row>
        </div>
    )
}
