import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class Output extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: props.titleValue,
      h1Value: props.h1Value,
      h2Value: props.h2Value,
      h3Value: props.h3Value,
      h4Value: props.h4Value,
      h5Value: props.h5Value,
      h6Value: props.h6Value,
      intLinks: props.intLinks,
      extLinks: props.extLinks,
      invLinks: props.invLinks,
      isLogin: props.isLogin,
    };
  }

  render() {
    return (
      <div className="output">
        <div className="container">
          <div className="row">
            <Panel header="Page Title">
              <p>{this.props.titleValue}</p>
            </Panel>
            <Panel header="Headings">
              <h1>h1: {this.props.h1Value}</h1>
              <h2>h1: {this.props.h2Value}</h2>
              <h3>h1: {this.props.h3Value}</h3>
              <h4>h1: {this.props.h4Value}</h4>
              <h5>h1: {this.props.h5Value}</h5>
              <h6>h1: {this.props.h6Value}</h6>
            </Panel>
            <Panel header="Links">
              <p># of Internal Links (#): {this.props.intLinks}</p>
              <p># of External Links: {this.props.extLinks}</p>
              <p># of Invisible Links: {this.props.invLinks}</p>
            </Panel>
            <Panel header="Login Form">
              <p>{this.props.isLogin}</p>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default Output;
