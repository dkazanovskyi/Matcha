import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import HomePage from './Containers/HomePage'
import AuthPage from './Containers/AuthPage'
import VerifyCode from './Components/VerifyCode'
import GetUser from './Components/GetUser'
import { Provider } from 'react-redux'
import store from './Store'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './Store'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              <GetUser />
              <Switch>
                <Route exact path="/" component={ HomePage} />
                <Route path="/auth" component={AuthPage} />
                <Route path="/profile" component={ HomePage} />
                <Route path="/signup/mail_verify/:code" component={VerifyCode}/>
                <Route render={() => <div>Not Found</div>} />
              </Switch>
            </div>
          </ConnectedRouter>
        </Provider>
      </div>
    )
  }
}

export default App
