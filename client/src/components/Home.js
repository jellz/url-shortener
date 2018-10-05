import React, { Component } from 'react';
import ShortenForm from './ShortenForm';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>jlz.fun</h1>
        <h3>Shorten long links to share easily on the web</h3>
        <ShortenForm />
      </div>
    );
  }
}

export default Home;
