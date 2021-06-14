import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AppHeader from './../../components/AppHeader'
import Movies from './Movies'
import MovieDetail from './MovieDetail'

export default class OMDBApp extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <AppHeader title="OMDBApp"/>
        <div className="app-content">
          <Switch>
            <Route component={Movies} path={this.props.match.path} exact/>
            <Route component={MovieDetail} path={this.props.match.path+"/movie/:id"} exact/>
          </Switch>
        </div>
      </div>
    )
  }
}