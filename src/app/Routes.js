/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React , {Suspense} from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { Logout, AuthPage } from './modules/Auth'
import ErrorsPage from './modules/ErrorsExamples/ErrorsPage'
import CoursePlayer from './modules/Courses/pages/CoursePlayer'
import BasePage from './BasePage'
import ConnectPage from './modules/DashBoard/pages/connectPage'
import   PrivateRoute  from './privateRoute'
import MyCoursePlayer from './modules/MyCourse/pages/MyCoursePlayer'

export function Routes () {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  )
  return (
    <Switch>
     
      <Redirect exact from='/' to='/dashboard' />
      
      <Route path='/connectPage/:authToken?' component={ConnectPage} />


     ///////////////////////////////////////
      {/* <PrivateRoute path="/dashboard" component={BasePage}/> */}
      <PrivateRoute path="/OnlineExam" component={BasePage} />
      <PrivateRoute path="/user" component={BasePage} />
      <PrivateRoute path="/Courses" component={BasePage} />
      <PrivateRoute path="/test" component={BasePage} />
      <PrivateRoute path="/fees" component={BasePage} />
      <PrivateRoute path="/mycourses" component={BasePage} />
      <PrivateRoute path="/MyTest" component={BasePage} />
      
      ////////////////////////////////////////
      <Route path="/dashboard" component={BasePage}/>

       <Route path='/error' component={ErrorsPage} />
      <Route path='/logout' component={Logout} />
      <Route path='/coursePlayer/:id/:sectionId?/:contentId?/:type?'>
        <CoursePlayer />
      </Route>
      <Route path='/mycoursePlayer/:id/:sectionId?/:contentId?/:type?'>
        <MyCoursePlayer />
      </Route>
      

      <Redirect exact from='*' to='/' />
    </Switch>
  )
}
