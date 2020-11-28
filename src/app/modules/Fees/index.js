import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import FeesForm from './pages/feesForm'

export default function Fees () {
  return (
    <Switch>      
      <Route exact path='/fees'>
        <FeesForm />
      </Route>
    </Switch>
  )
}
