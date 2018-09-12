import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import HomePage from './Containers/HomePage'
import AuthPage from './Containers/AuthPage'
import VerifyCode from './Components/VerifyCode'
import LoginForm from './Containers/login-form'
import { Provider } from 'react-redux'
import store from './Store'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './Store'
import axios from 'axios'

class App extends React.Component {
//тимчасовий стейт
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser = (userObject) => {
    this.setState(userObject)
  }
  getUser = () => {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user')
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              {/* <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} /> */}
              {/* greet user if logged in: */}
              {this.state.loggedIn &&
                <p>Join the party, {this.state.username}!</p>
              }
              <Switch>
                <Route exact path="/" component={ HomePage} />
                <Route path="/auth" component={AuthPage} />
                <Route path="/profile" component={ HomePage} />
                <Route
                  path="/login"
                  render={() =>
                    <LoginForm
                      updateUser={this.updateUser}
                    />}
                />
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
