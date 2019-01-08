import React, { Component } from 'react'
import MenuDrawer from '../Components/MenuDrawer'
import { connect } from 'react-redux'
import UserActions from '../Redux/user'

class ChatsPage extends Component {
  state = {}

  render() {
    return (
      <MenuDrawer>
        
      </MenuDrawer>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatsPage)