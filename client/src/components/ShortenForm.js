import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { API_BASE } from '../index';

class ShortenForm extends Component {
  constructor() {
    super();
    
    this.state = {
      long: null,
      short: null,
      errorText: null,
      linkId: null
    }
    
    this.handleLongChange = (e) => this.setState({ long: e.target.value.trim() === '' ? null : e.target.value.trim() });
    this.handleShortChange = (e) => this.setState({ short: e.target.value.trim() === '' ? null : e.target.value.trim() });
    this.handleSubmit = async (e) => {
      e.preventDefault();
      this.setState({ errorText: null, linkId: null });
      const res = await fetch(API_BASE + '/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          long: this.state.long,
          short: this.state.short
        })
      });
      const json = await res.json();
      if (!json.ok) {
        this.setState({ errorText: json.details[0] });
      } else {
        this.setState({ linkId: json.link.id })
      }
    }
  }

  render() {
    return (
      <div style={{ paddingTop: '2%' }}>
        <Form onSubmit={this.handleSubmit} error={true} success={true}>
          <Form.Field required>
            <label>Original link</label>
            <input onChange={this.handleLongChange} type='text' placeholder='https://github.com/danielgulic/url-shortener' />
          </Form.Field>
          <Form.Field inline>
            <label>jlz.fun/</label>
            <input onChange={this.handleShortChange} type='text' placeholder='url-shortener' maxLength='20' />
          </Form.Field>
          {this.state.errorText !== null && <Message 
            error
            header='An error occurred'
            content={this.state.errorText}
          />}
          {this.state.linkId !== null && <Message 
            success
            header='Link shortened'
            content={<div>Your shortened link: <a href={`https://jlz.fun/${this.state.linkId}`}>https://jlz.fun/{this.state.linkId}</a></div>}
          />}
          <Button type='submit'>Shorten!</Button>
        </Form>
      </div>
    );
  }
}

export default ShortenForm;
