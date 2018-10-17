import React, { Component } from 'react'
import MenuDrawer from '../Components/MenuDrawer'
import { connect } from 'react-redux'
import UserActions from '../Redux/user'

class HomePage extends Component {
  state = {}
  onClick = (info) => {
    if (info.key === "7") {
      console.log('key logout clicked')
      this.props.logout()
    }
  }

  render() {
    return (<MenuDrawer/>)
  }
}

const mapStateToProps = (state) => ({
	user: state.user,
})


const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(UserActions.logoutRequest())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
