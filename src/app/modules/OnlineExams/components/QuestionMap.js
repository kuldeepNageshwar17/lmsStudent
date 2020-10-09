import React from 'react'
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap'

export default function QuestionMap() {
    return (
        <Card>
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
            <Button className='CustomBtn' variant='danger'>
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
            </Button>
            <Button className='CustomBtn' variant='success'>
              5
            </Button>
            <Button className='CustomBtn' variant='secondary'>
              6
            </Button>
            <Button className='CustomBtn' variant='danger'>
              7
            </Button>
            <Button className='CustomBtn' variant='success'>
              8
            </Button>
            <Button className='CustomBtn' variant='secondary'>
              9
            </Button>
            <Button className='CustomBtn' variant='secondary'>
              10
            </Button>
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
    )
}
