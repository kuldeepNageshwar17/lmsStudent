import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import TestScreen from "./pages/TestScreen"
import SectionTestList from './pages/SectionTestList'
import SectionTestScreen from './pages/SectionTestScreen'
import TestList from './pages/testList'
import MyCommonTestResultScreen from './pages/commonTestResultScreen'

export default function MyTest () {
  return (
    <Switch>      
      <Route exact path='/MyTest/:courseId/CourseTest/:id'>
        <TestScreen />
      </Route>
      <Route exact path='/MyTest/sectionTests/:sid'>
        <SectionTestList />
      </Route>
      <Route exact path='/MyTest/:sId/SectionTest/:testId'>
        <SectionTestScreen />
      </Route>
      <Route exact path='/MyTest'>
        <TestList />
      </Route>
      <Route exact path='/MyTest/:testId?/testResult/:resultId?'>
        <MyCommonTestResultScreen />
      </Route>
      
      
    </Switch>
  )
}
