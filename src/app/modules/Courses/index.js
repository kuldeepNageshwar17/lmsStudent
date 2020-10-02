import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Courses = React.lazy(() => import('./pages/courses'));

export default function User() {
  return (
    <Switch>
      <Route exact path='/Courses'>
        <Courses/>
      </Route>    
    </Switch>
  )
}
