import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './components/Home';
import LinkRedirect from './components/LinkRedirect';
import LinkInfo from './components/LinkInfo';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:lid" component={LinkRedirect} />
              <Route exact path="/:lid/info" component={LinkInfo} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;