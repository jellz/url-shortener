import React, { Component } from 'react';
import { API_BASE } from './index';
import Router from './Router';

class App extends Component {
  render() {
    console.log('Using API base ' + API_BASE);
    return (
      <div>
        <Router />
      </div>
    );
  }
}

export default App;
