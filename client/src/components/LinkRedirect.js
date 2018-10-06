import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { API_BASE } from '../index';

class LinkRedirect extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      link: null
    };
    this.lid = this.props.match.params.lid;
  }

  async componentDidMount() {
    const res = await fetch(API_BASE + '/api/links/' + this.lid);
    const json = await res.json();
    if (!json.ok) {
      this.setState({ link: null });
    } else {
      this.setState({ link: json.link });
      window.location.replace(json.link.long);
    }
  }

  render() {
    return (
      <div>
        {!this.state.link && <Message error icon>
          <Icon name='dont' />
          <Message.Header>Link not found</Message.Header>
          <p>Are you sure you have the correct link? jlz.fun links are typically 1-8 characters long and are case-sensitive</p>
        </Message>}
        {this.state.link && <Message success icon>
          <Icon name='circle notched' loading />
          <Message.Header>Redirecting...</Message.Header>
          <p>You are now being redirected to your destination</p>
        </Message>}
      </div>
    );
  }
}

export default LinkRedirect;
