import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Mydashboard from './pages/dashboard' 


export default function NewDashboard () {
  return (
    <Switch>
      <Route exact path='/dashboard'>
        <Mydashboard />
      </Route>

    </Switch>
  )
}
