import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
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
                  <Nav pullRight>
                    <NavDropdown eventKey={3} title="About me" id="basic-nav-dropdown">
                      <MenuItem eventKey={3.1} href="https://github.com/enderalansoy">
                        My Github
                      </MenuItem>
                      <MenuItem eventKey={3.2} href="https://www.linkedin.com/in/enderalansoy">
                        My LinkedIn
                      </MenuItem>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
