import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card  ,Row} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

function FeesForm() {
  const { user } = useSelector(state => state.auth)
  const [fees , setfees] = useState()
  useEffect(() => {
    setfees(user.fees)
  }, [])
  const saveStudentFees = () => {
    if(fees > user.fees){return alert("Please check the amount it greater than your remaining amount ")}
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
           
            <Form onSubmit={saveStudentFees} className='form'>
              <Card.Body>
                <Row>
              {user && <div>Your Total Fee To Submit &nbsp; {user.fees}</div>}
              </Row>
                <Form.Group className='row'>
                
                  <div className='col-md-4' controlId='fromName'>
                    <Form.Label>Fees Amount</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=' Full  Name'
                      required
                      value={fees}
                      onChange ={e => {
                        setfees(e.target.value)
                      }}
                    />
                  </div>
                 

                </Form.Group>

                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Card.Body>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default FeesForm
