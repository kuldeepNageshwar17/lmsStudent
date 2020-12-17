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
import  Dashboard  from './modules/DashBoard/pages/dashboard'
import {
  useParams,
  useHistory
} from 'react-router'

//////////////////////////////////////////
import { Layout } from '../_metronic/layout'
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout'
import user from './modules/user'
import Course from './modules/Courses'
import OnlineExams from './modules/OnlineExams'
import Test from './modules/Test'
import Fees from './modules/Fees'

export function Routes () {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  )
  return (
    <Switch>
      {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from='/' to='/dashboard' />
      }
      <Route path='/connectPage/:authToken?' component={ConnectPage} />


     ///////////////////////////////////////
      {/* <PrivateRoute path="/dashboard" component={BasePage}/> */}
      <PrivateRoute path="/OnlineExam" component={BasePage} />
      <PrivateRoute path="/user" component={BasePage} />
      <PrivateRoute path="/Courses" component={BasePage} />
      <PrivateRoute path="/test" component={BasePage} />
      <PrivateRoute path="/fees" component={BasePage} />


      ////////////////////////////////////////
      <Route path="/dashboard" component={BasePage}/>

       <Route path='/error' component={ErrorsPage} />
      <Route path='/logout' component={Logout} />
      <Route path='/coursePlayer/:id/:sectionId?/:contentId?/:type?'>
        <CoursePlayer />
      </Route>
      <Redirect exact from='*' to='/' />
    </Switch>
  )
}
