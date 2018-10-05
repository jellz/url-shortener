import React, { Component } from 'react';
import { API_BASE } from '../index';

class LinkRedirect extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      link: null,
      text: 'Please wait while you are redirected...'
    };
    this.lid = this.props.match.params.lid;
  }

  async componentDidMount() {
    const res = await fetch(API_BASE + '/api/links/' + this.lid);
    const json = await res.json();
    if (!json.ok) {
      this.setState({ text: json.details[0] });
    } else {
      window.location.replace(json.link.long);
    }
  }

  render() {
    return (
      <div>
        {this.state.text}
      </div>
    );
  }
}

export default LinkRedirect;
