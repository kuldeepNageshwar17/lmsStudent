import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import TestScreen from "./pages.js/TestScreen"

export default function Examinations () {
  return (
    <Switch>      
      <Route exact path='/test/CourseTest:id'>
        <TestScreen />
      </Route>
    </Switch>
  )
}
