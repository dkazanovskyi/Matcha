import React, { Component } from 'react'
import axios from 'axios'
import { SpinLoader } from 'react-css-loaders'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserActions from '../Redux/user'
import HomePage from '../Containers/HomePage'
import AuthPage from '../Containers/AuthPage'
import VerifyCode from './VerifyCode'
import ConnectChat from '../Containers/ConnectChat'
import { Route, Switch } from 'react-router-dom'

class GetUser extends Component {

  componentDidMount() {
    console.log("Get USER")
    this.getUser()
  }

  getUser = () => {
    axios.get('/user/').then(response => {
      if (response.data.user) {
        this.props.createUser(response.data.user)
      }
    })
  }

  render() {
    if (this.props.user.authorize) return (
      <div>
        <p>Join the party, {this.props.user.data.username}!</p>
        <Switch>
          <Route exact path="/" component={ HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/profile" component={ HomePage} />
          <Route path="/signup/mail_verify/:code" component={VerifyCode}/>
          <Route exact path="/chat/:user" component={ConnectChat}/>
          <Route render={() => <div>Not Found</div>} />
        </Switch>
      </div>
    )
    else return (
      <SpinLoader color="#006B50"/>
    )
  }
}

const mapStateToProps = (state) => ({
	user: state.user,
})

const mapDispatchToProps = dispatch => {
	return {
		createUser: (payload) => dispatch(UserActions.createUserSuccess(payload))
	}
}

export default withRouter( 
	connect(mapStateToProps, mapDispatchToProps)(GetUser))
