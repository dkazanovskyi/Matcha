import React, { Component } from 'react'
import MenuDrawer from '../Components/MenuDrawer'
import { connect } from 'react-redux'
import UserActions from '../Redux/user'

class HomePage extends Component {
  state = {}

  render() {
    return (<MenuDrawer/>)
  }
}

const mapStateToProps = (state) => ({
	user: state.user,
})

export default connect(mapStateToProps, null)(HomePage)
