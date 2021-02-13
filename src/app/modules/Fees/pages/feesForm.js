import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card  ,Row ,ListGroup , Col} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

function FeesForm() {
  const { user } = useSelector(state => state.auth)
  const [feeAmount , setFeeAmount] = useState()
  const [feeDetail , setFeeDetail] = useState()

  const saveStudentFees = () => {
debugger
    if(feeDetail && feeDetail.length && feeDetail[0].TotalFeeSubmitted && feeAmount > ( user.fees - feeDetail[0].TotalFeeSubmitted) || feeAmount > user.fees)
    {return alert("Please check the amount it greater than your remaining amount ") }
    if(feeAmount == 0 || !feeAmount){
      return alert("Amount cannot be zero ")
    }

    axios.post('/api/fee/submitClassFee' ,{fee : feeAmount}).then((res) => {
      getFee();
    }).catch((error) => {

    })
    setFeeAmount("")
    getFee()
  }
  const getFee = () => {
    axios.get('/api/fee/getOwnFeeDetails').then((res) => {
      console.log(res.data)
        setFeeDetail(res.data)
    }).catch((error) => {

    })
  }
  var remainingFee = (fee) => {
   return user.fees - fee
  }
  useEffect(() => {
    getFee()
  },[])
  const convertDate = (date) => {
    // initialize new Date object
    var date_ob = new Date(date);

    // year as 4 digits (YYYY)
    var year = date_ob.getFullYear();

    // month as 2 digits (MM)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // date as 2 digits (DD)
    var date = ("0" + date_ob.getDate()).slice(-2);
    date = date  + "-" + month  + "-" +year 
    return date
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <Card>
           
            <Form  className='form'>
              <Card.Body>
                <Row>
                  <Col> {user && <div>Your Total Fee To Submit &nbsp; {user.fees} </div>}</Col>
              
              
              </Row>
                <Form.Group className='row'>
                
                  <div className='col-md-4' controlId='fromName'>
                    <Form.Label>Fees Amount</Form.Label>
                    <Form.Control
                      type='Number'
                      placeholder='Fee Amount'
                      required
                      value={feeAmount}
                      onChange ={e => {
                        setFeeAmount(e.target.value)
                      }}
                    />
                  </div>
                 

                </Form.Group>

                <Button variant='primary'  onClick={saveStudentFees}>
                  Submit
                </Button>
              </Card.Body>
            </Form>
            
          </Card>
          <br></br>
          <Card>
            <Card.Title>Submitted Fee Structure</Card.Title>
            <Card.Text>{feeDetail &&  feeDetail.length   && <div> Your Remaining Fee &nbsp; {remainingFee(feeDetail[0].TotalFeeSubmitted)} </div> || ""}</Card.Text>
            <Card.Body>
              
            {feeDetail && feeDetail.length &&
            <ListGroup>
              {feeDetail.map((single) => {

                var date = convertDate(single.submittedFee.Date)
                return <ListGroup.Item key={single.submittedFee._id}>Fee Amount < p style={{color : 'green'}}>{single.submittedFee.fee}</p> SubMitted on {date} </ListGroup.Item>
              })
              
              }
            </ListGroup> || <p>You Have Not Submitted Any Fees Yet</p>}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default FeesForm
