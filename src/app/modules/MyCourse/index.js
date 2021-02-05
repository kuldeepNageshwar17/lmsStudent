import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import MyCourses from './pages/mycourse'
import MyCourseTestList from './pages/MyCourseTestList'
import MyCoursesDetails from './pages/MyCourseDetails'

export default function Mycourses () {
  return (
    <Switch>      
      <Route exact path='/MyCourses'>
        <MyCourses />
      </Route>
      <Route exact path='/MyCourses/:id/Tests'>
        <MyCourseTestList />
      </Route>
      <Route exact path='/MyCourses/Course/:id'>
        <MyCoursesDetails />
      </Route>
    </Switch>
  )
}
