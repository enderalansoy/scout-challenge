import React, { Component } from 'react';
import { Button, Col, FormControl, Panel } from 'react-bootstrap';

class FormArea extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Panel>
            <Col className="btn" md={10}>
              <FormControl
                type="text"
                placeholder="Enter URL here."
              />
            </Col>
            <Col className="btn" md={2}>
              <Button onClick={this.changeUrl} bsStyle="danger" block>Scrape</Button>
            </Col>
          </Panel>
        </div>
      </div>
    );
  }
}
export default FormArea;
