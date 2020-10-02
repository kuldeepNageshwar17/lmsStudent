import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Tabs, Tab, Form, ProgressBar, Alert } from 'react-bootstrap'
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar
} from '../../../../_metronic/_partials/controls'
import {actions} from "../../Auth/_redux/authRedux" 

import {connect } from "react-redux"
function StudentProfile ({requestUser}) {
  const [User, setUser] = useState(null)
  const history = useHistory()
  const uploadFile = useRef(null)

  const uploadProfile = () => {
    debugger
    console.log(uploadFile.current.files)
    if (uploadFile.current.files.length) {
      var files = uploadFile.current.files[0]

      let formData = new FormData()
      formData.append('file', files)
      axios
        .post('/api/student/ChangeMyProfileImage/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          if (res.data.status) {
            alert(' profile updated')
            setUser({ ...User, profileImage: res.data.name })
            debugger;
            requestUser();
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    axios
      .get('/api/student/myprofile/')
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log('Errore in getting student')
      })
  }, [])
  return (
    <>
      {User && User.branch && (
        <div>
          <div className='row'>
            <div className='col-md-12'>
              <Card>
                <CardHeader title='Profile'>
                  <CardHeaderToolbar></CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                  {' '}
                  <form method='post'>
                    <div className='row'>
                      <div className='col-md-4'>
                        <div className='profile-img'>
                          {User.profileImage ? (
                            <img
                              src={`${window.$apihost}/uploads/Profiles/${User.profileImage}`}
                              alt=''
                            />
                          ) : (
                            <img
                              src={
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog'
                              }
                              alt=''
                            />
                          )}

                          <div className='file btn btn-lg btn-primary'>
                            Change Photo
                            <input
                              onChange={uploadProfile}
                              ref={uploadFile}
                              type='file'
                              name='file'
                            />
                          </div>
                        </div>
                        <div className='col-md-12 text-center proBtn'>
                          <button
                            type='button'
                            onClick={e => {
                             // history.push('/user/EditProfile/')
                            }}
                            className='btn btn-text EBtn mr-3'
                            name='btnAddMore'
                            value='Edit Profile'
                          >
                            Edit Profile
                          </button>
                          <button
                            type='button'
                            onClick={e => {
                              history.push('/user/ChangePassword')
                            }}
                            className='btn btn-text CPass'
                            name='btnAddMore'
                            value='Edit Profile'
                          >
                            Change Password
                          </button>
                        </div>
                        <div className='col-md-8 mt-5 offset-md-2'>
                          <Form.Label readOnly>Study Progress</Form.Label>
                          <ProgressBar variant='success' now={60} label='60%' />
                        </div>
                      </div>
                      <div className='col-md-8'>
                        <div className='profile-head'>
                          <h5>{User.name}</h5>
                        </div>
                        <div className='col-md-12'>
                          <div className='row'></div>
                        </div>
                        <div className='separator separator-dashed mt-8 mb-5'></div>
                        <Form.Group className='row'>
                          <div className='col-md-6 StdPrfl'>
                            <Form.Label readOnly>{User.name}</Form.Label>
                          </div>
                          <div className='col-md-6 StdPrfl'>
                            <Form.Label readOnly>{User.email}</Form.Label>
                          </div>
                          <div className='col-md-6 StdPrfl'>
                            <Form.Label readOnly>{User.mobile}</Form.Label>
                          </div>
                          <div className='col-md-6 StdPrfl'>
                            <Form.Label readOnly>{User.branch.name}</Form.Label>
                          </div>
                          <div className='col-md-6 StdPrfl'>
                            <Form.Label readOnly>{User.createdAt}</Form.Label>
                          </div>
                        </Form.Group>
                      </div>

                      <div className='col-md-12' style={{ display: 'none' }}>
                        <Tabs defaultActiveKey='profile'>
                          <Tab eventKey='home' title='Home'>
                            <div className='tab-item-wrapper'>
                              <h5>Home Dashbord</h5>
                              <p>
                                At vero eos et accusamus et iusto odio
                                dignissimos
                              </p>
                            </div>
                          </Tab>

                          <Tab eventKey='profile' title='Profile'>
                            <div className='tab-item-wrapper'>
                              <h5>Profile Details</h5>
                              <p>
                                At vero eos et accusamus et iusto odio
                                dignissimos
                              </p>
                            </div>
                          </Tab>

                          <Tab eventKey='contact' title='Contact'>
                            <div className='tab-item-wrapper'>
                              <h5>Contact Info</h5>
                              <p>
                                At vero eos et accusamus et iusto odio
                                dignissimos
                              </p>
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='separator separator-dashed mt-10 mb-10'></div>
                      <div className='col-md-4 mt-10 mb-10'>
                        <Alert variant='success'>
                          <Alert.Heading>Hey, nice to see you</Alert.Heading>
                          <p>
                            Aww yeah, you successfully read this important alert
                            message. This example text is going to run a bit
                            longer so that you can see how spacing within an
                            alert works with this kind of content.
                          </p>
                        </Alert>
                      </div>
                      <div className='col-md-4 mt-10 mb-10'>
                        <Alert variant='success'>
                          <Alert.Heading>Hey, nice to see you</Alert.Heading>
                          <p>
                            Aww yeah, you successfully read this important alert
                            message+. This example text is going to run a bit
                            longer so that you can see how spacing within an
                            alert works with this kind of content.
                          </p>
                        </Alert>
                      </div>
                      <div className='col-md-4 mt-10 mb-10'>
                        <Alert variant='success'>
                          <Alert.Heading>Hey, nice to see you</Alert.Heading>
                          <p>
                            Aww yeah, you successfully read this important alert
                            message. This example text is going to run a bit
                            longer so that you can see how spacing within an
                            alert works with this kind of content.
                          </p>
                        </Alert>
                      </div>
                    </div>{' '}
                  </form>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )}
      {!User && <div>loading</div>}
    </>
  )
}

export default connect(null,actions)(StudentProfile)  
