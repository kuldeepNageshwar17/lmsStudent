import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function CourseBlock ({ course }) {
  return (
    <>
      <Card style={{ width: '20rem' }}>
        <Card.Img
          variant='top'
          src={
            window.$apihost + '/uploads/CourseProfile/' + course.posterImageUrl
          }
        />
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>{course.Description}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
