import React from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import AppHeader from './../../components/AppHeader'
import Movies from './Movies';

export default class OMDBApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props)
  }
  render() {
//    let { path, url } = useRouteMatch();
    return (
      <div className="app-wrapper">
        <AppHeader title="OMDBApp"/>
        <div className="app-content">
          <Switch>
            <Route component={Movies} exact/>
          </Switch>
        </div>
      </div>
    )
  }
}