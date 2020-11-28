import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Search from './pages/search'

export default function SearchIndex () {
  return (
    <Switch>      
      <Route exact path='/search/'>
        <Search />
      </Route>
    </Switch>
  )
}
