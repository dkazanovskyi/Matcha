import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import Button from 'antd/lib/button';
import './App.css';
import HomePage from './Containers/HomePage';
import 'antd/dist/antd.css';
class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <HomePage/>
      </div>
    );
  }
}

export default App;
