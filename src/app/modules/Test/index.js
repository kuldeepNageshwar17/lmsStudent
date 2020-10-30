import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import TestScreen from "./pages/TestScreen"
import SectionTestList from './pages/SectionTestList'
import SectionTestScreen from './pages/SectionTestScreen'
import TestList from './pages/testList'
import CommonTestResultScreen from './pages/commonTestResultScreen'

export default function Test () {
  return (
    <Switch>      
      <Route exact path='/test/:courseId/CourseTest/:id'>
        <TestScreen />
      </Route>
      <Route exact path='/test/sectionTests/:sid'>
        <SectionTestList />
      </Route>
      <Route exact path='/test/:sId/SectionTest/:testId'>
        <SectionTestScreen />
      </Route>
      <Route exact path='/test'>
        <TestList />
      </Route>
      <Route exact path='/test/:testId/testResult/:resultId'>
        <CommonTestResultScreen />
      </Route>
      
      
    </Switch>
  )
}
