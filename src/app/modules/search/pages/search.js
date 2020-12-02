import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Form, Card  ,Row} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchIndex() {
    const history = useHistory()
const [searchData , setSearchData] =useState()
const [SearchComplete , setSearchComplete] = useState(false)
 const SearchByKeyWord = (keyword) => {
     var data  = {search : keyword}
    if(keyword.length >= 3){
        axios.post('/api/course/regexMatch' , data ).then((res) => {
            setSearchData(res.data)
        }).catch((error) => {

        })
        setSearchComplete(true)
    }
 }
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
            <Form  className='form'>
              <Form.Group>
                <Form.Control type="text" onChange={(event) =>{console.log(event.target.value); SearchByKeyWord(event.target.value)}} placeholder="Normal text" />    
              </Form.Group>
            </Form>  
            {searchData && searchData.institute.length && 
                searchData.institute.map((single) => {
                   return( <Card key={single._id}>
                            <Card.Body>
                                <Card.Title>
                                Institute Name : {single.name}
                                <span
                                    style={{ float: 'right' }}
                                    className='badge badge-secondary'
                                >
                                    {}
                                </span>
                                </Card.Title>
                                
                                <Card.Text>No Of Branches : &nbsp; {single.noOfBranches}</Card.Text>
                                <Card.Text>No Of Classes : &nbsp; {single.noOfClasses}</Card.Text>
                                <Card.Text>No Of Courses : &nbsp; {single.noOfCourses}</Card.Text>
                             
                            </Card.Body>
                            </Card>      
                        )
                    })|| SearchComplete && ""
                }
                {searchData && searchData.institute.length >= 3 && 
                <Card >
                            <Card.Body>
                              <Button onClick={() => alert("More Institute !")}>See More Institute</Button>
                            </Card.Body>
                            </Card>      
                    || SearchComplete && ""
                }


                {searchData && searchData.course.length && 
                searchData.course.map((single) => {
                   return( <Card key={single._id}>
                            <Card.Body>
                                <Card.Title>
                                Course Name : {single.title}
                                <span
                                    style={{ float: 'right' }}
                                    className='badge badge-secondary'
                                >
                                    {}
                                </span>
                                </Card.Title>
                                
                                <Card.Text>
                                Description :{' '}
                                <div
                                    dangerouslySetInnerHTML={{ __html: single.Description }}
                                ></div>
                                </Card.Text>
                                <div>
                                {/* <Card.Text>Ratings : {item.courses.numberOfRatings}</Card.Text> */}
                                <Card.Text>
                                    Total No Of Test : {single.noOfTests}
                                </Card.Text>
                                <Card.Text>

                                    {/* Overview : <div  dangerouslySetInnerHTML={{    __html: item.courses.overview }}></div> */}
                                </Card.Text>
                                <Card.Text>Sections : {single.noOfSections}</Card.Text>
                                </div>
                                <img src={`${window.$apihost }/uploads/CourseProfile/`+single.posterImageUrl} alt ={single.title} width={200} height={200} className="p-5"></img>

                                <Button
                                variant='primary'
                                className="mr-10"
                                onClick={() => {
                                    history.push(`/Courses/Course/${single._id}`)
                                }}
                                >
                                Details
                                </Button>
            
                            </Card.Body>
                            </Card> 
                        )
                    }) || SearchComplete && ""
                }

                {searchData && searchData.course.length >= 3 && 
                    <Card >
                        <Card.Body>
                            <Button onClick={() => alert("More Courses !")}>See More Courses</Button>
                        </Card.Body>
                        </Card>      
                || SearchComplete && ""
                } 
        </div>
      </div>
    </div>
  )
}
export default SearchIndex
