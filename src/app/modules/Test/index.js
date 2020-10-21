import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import TestScreen from "./pages/TestScreen"

export default function Test () {
  return (
    <Switch>      
      <Route exact path='/test/:courseId/CourseTest/:id'>
        <TestScreen />
      </Route>
    </Switch>
  )
}
