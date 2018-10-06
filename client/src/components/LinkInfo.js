import React, { Component } from 'react';
import { Table, Message } from 'semantic-ui-react';
import { API_BASE } from '../index';

class LinkInfo extends Component {
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
    }
  }

  render() {
    return (
      <div>
        {!this.state.link && <Message error>
          <Message.Header>Link not found</Message.Header>
          <p>Are you sure you have the correct link? jlz.fun links are typically 1-8 characters long and are case-sensitive</p>
        </Message>}
        {this.state.link && <h2>Link Information</h2>}
        {this.state.link && <Table definition>
          <Table.Row>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell>{this.state.link.id}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Created at</Table.Cell>
            <Table.Cell>{new Date(this.state.link.createdAt).toUTCString()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Redirect link</Table.Cell>
            <Table.Cell><a href={this.state.link.long}>{this.state.link.long}</a></Table.Cell>
          </Table.Row>
        </Table>}
      </div>
    );
  }
}

export default LinkInfo;
