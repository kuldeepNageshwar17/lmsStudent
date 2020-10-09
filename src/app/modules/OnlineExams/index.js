import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import OnlineExams from "./pages/OnlineExams"
import ExamScreen from "./pages/ExamScreen"

export default function Examinations () {
  return (
    <Switch>
      <Route exact path='/OnlineExam'>
        <OnlineExams />
      </Route>
      <Route exact path='/OnlineExam/Exam/:id'>
        <ExamScreen />
      </Route>
    </Switch>
  )
}
