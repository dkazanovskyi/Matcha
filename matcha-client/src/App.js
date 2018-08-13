import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import HomePage from 'containers/HomePage'

class App extends React.Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => err)
  }

  callApi = async () => {
    const response = await fetch('/api/hello')
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)
    return body
  };

  render() {
    return (
      <div className="App">
        <HomePage/>
      </div>
    )
  }
}

export default App
