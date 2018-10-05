import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './components/Home';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;