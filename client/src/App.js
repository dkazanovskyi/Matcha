import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import HomePage from './Containers/HomePage'
import { Provider } from 'react-redux'
import store from './Store'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './Store'
import AuthPage from './Containers/AuthPage'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              <Switch>
                <Route exact path="/404" render={() => <div>Miss</div>} />
                <Route path="/auth" exact component={AuthPage} />
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
