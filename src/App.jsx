import React, { Component } from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import FormArea from './components/FormArea';
import Output from './components/Output';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: '/api',
      text: 'Loading...',
      url: 'http://github.com',
    };
  }

  componentWillMount() {
    this.scrape();
  }

  scrape() {
    axios.get(`${this.state.api}/?url=${this.state.url}`).then((res) => {
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
        <FormArea />
        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
