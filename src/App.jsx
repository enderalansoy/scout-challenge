import React, { Component } from 'react';
import {
  Button,
  Col,
  FormControl,
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  Panel,
} from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <br />
        <div className="container">
          <div className="row">
            <div className="col">
              <Navbar inverse>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/index.html">Scrapr</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem eventKey={1} href="#">About</NavItem>
                  </Nav>
                  <Nav pullRight>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                      <MenuItem eventKey={3.1}>My Github</MenuItem>
                      <MenuItem eventKey={3.2}>My LinkedIn</MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </div>
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
                <Button bsStyle="danger" block>Scrape</Button>
              </Col>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
