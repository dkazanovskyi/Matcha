import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import HomePage from './Containers/HomePage'
import { Provider } from 'react-redux'
import store from './Store'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './Store'

class App extends React.Component {
  state = {
    response: ''
  }

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
  }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              <Switch>
                <Route exact path="/404" render={() => <div>Miss</div>} />
                <Route path="/" component={HomePage} />
              </Switch>
            </div>
          </ConnectedRouter>
        </Provider>
      </div>
    )
  }
}

export default App
