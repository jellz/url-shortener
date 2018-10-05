import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './components/Home';
import LinkRedirect from './components/LinkRedirect';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/:lid" component={LinkRedirect} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;