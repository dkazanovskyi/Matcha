import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserActions from '../Redux/user'

class GetUser extends Component {

  componentDidMount() {
    this.getUser()
  }
  getUser = () => {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.props.createUser(response.data.user)
      }
    })
  }

  render() {
    console.log("STAET", this.props.user)
    return (
      <div>
        {this.props.user.authorize &&
          <p>Join the party, {this.props.user.data.username}!</p>
        }
      </div>
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
