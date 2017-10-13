import React, { Component } from 'react';
import { Button, Col, FormControl, Panel } from 'react-bootstrap';
import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import Navigation from './components/Navigation';
import Output from './components/Output';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: '/api',
      text: 'Loading...',
      url: 'https://github.com',
      value: '',
    };
  }

  componentWillMount() {
    this.scrape();
    loadProgressBar();
  }

  onChange(e) {
    this.setState({ value: e.target.value }, () => {
      console.info(this.state.value);
    });
  }

  onClick() {
    this.setState({ url: this.state.value }, () => {
      this.scrape();
    });
  }

  scrape() {
    // Using axios to access our API:
    axios.get(`${this.state.api}?url=${this.state.url}`).then((res) => {
      console.info(res);
      this.setState({ text: res.data });
    }).catch((err) => {
      console.info(err);
    });
  }

  render() {
    return (
      <div className="App">
        <br />
        <Navigation />
        <div className="container">
          <div className="row">
            <Panel>
              <Col className="btn" md={10}>
                <FormControl
                  value={this.state.value}
                  onChange={this.onChange.bind(this)}
                  type="text"
                  placeholder="https://github.com"
                />
              </Col>
              <Col className="btn" md={2}>
                <Button onClick={this.onClick.bind(this)} bsStyle="danger" block>Scrape</Button>
              </Col>
            </Panel>
          </div>
        </div>
        <Output
          titleValue={this.state.text.title}
          h1Value={this.state.text.h1}
          h2Value={this.state.text.h2}
          h3Value={this.state.text.h3}
          h4Value={this.state.text.h4}
          h5Value={this.state.text.h5}
          h6Value={this.state.text.h6}
          intLinks={this.state.text.numberOfIntLinks}
          extLinks={this.state.text.numberOfExtLinks}
          invLinks={this.state.text.numberOfInvLinks}
          isLogin={this.state.text.isLogin}
          htmlVersion={this.state.text.htmlVersion}
        />
      </div>
    );
  }
}

export default App;
