import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class Output extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  render() {
    return (
      <div className="output">
        <div className="container">
          <div className="row">
            <Panel>
              <h4>Page title: </h4><p>{this.props.value}</p>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default Output;
