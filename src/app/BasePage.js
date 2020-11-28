import React, { Suspense, lazy } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout'
// import { BuilderPage } from './pages/BuilderPage'
// import { MyPage } from './pages/MyPage'
import { Layout } from '../_metronic/layout'

import { DashboardPage } from './pages/DashboardPage'
import user from './modules/user'
import Course from './modules/Courses'
import OnlineExams from './modules/OnlineExams'
import Test from './modules/Test'
import Fees from './modules/Fees'
import SearchIndex from './modules/search'

// const ReactBootstrapPage = lazy(() =>
//   import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
// );
export default function BasePage () {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
    

      <Layout>
        <Switch>
          {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from='/' to='/dashboard' />
          }
          <ContentRoute path='/dashboard' component={DashboardPage} />
          {/* <ContentRoute path="/builder" component={BuilderPage}/> */}
          {/* <ContentRoute path="/my-page" component={MyPage}/> */}
          <ContentRoute path='/user' component={user} />
          <ContentRoute path='/Courses' component={Course} />
          <ContentRoute path='/OnlineExam' component={OnlineExams} />
          <ContentRoute path='/test' component={Test} />
          <ContentRoute path ='/fees' component={Fees} />
          <ContentRoute path = '/search' component={SearchIndex} />

          {/* <Redirect to='/error/error-v1' /> */}
        </Switch>
        
      </Layout>
    
    </Suspense>
  )
}
