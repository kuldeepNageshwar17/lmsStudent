import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Profile from './pages/profile'
import ChangePassword from './pages/changePassword'


export default function User() {
  return (
    <Switch>
      <Route exact path='/user/profile'>
        <Profile/>
      </Route>
      <Route exact path='/user/ChangePassword'>
        <ChangePassword/>
      </Route>
      
      {/* <Route exact path='/Student/Student/:id'>
        <StudentProfile />
      </Route> */}
      
      {/* <Route  exact path='/Student/testprofile' component={StudentProfile} /> */}

     
    </Switch>
  )
}
