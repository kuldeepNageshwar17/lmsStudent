import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Courses = React.lazy(() => import('./pages/courses'))
// const  Course= React.lazy(() => import('./pages/testCourse'));
// const  Exam  = React.lazy(() => import('./pages/testExam'));
const CourseDetails = React.lazy(() => import('./pages/CourseDetails'))

export default function User () {
  return (
    <Switch>
      <Route exact path='/Courses'>
        <Courses />
      </Route>
      <Route exact path='/Courses/Course/:id'>
        <CourseDetails />
      </Route>
    </Switch>
  )
}
