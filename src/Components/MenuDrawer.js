import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import UserActions from '../Redux/user'
const { Sider } = Layout

class MenuDrawer extends Component {
  state = {}
  onClick = (info) => {
    if (info.key === "7") {
      console.log('key logout clicked')
      this.props.logout()
    }
  }

  render() {
    if (this.props.user.authorize) return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="logo" />
          <Menu onClick={this.onClick} theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="rocket" />
              <span>Profile</span>
              <NavLink to="/profile" />
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="eye" />
              <span>Research</span>
              <NavLink to="/" />
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="rocket" />
              <span>Recomended</span>
              <NavLink to="/" />
            </Menu.Item>
            <Menu.Item key="7">
              <Icon type="form" />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        {this.props.children}
      </Layout>
    )
      else 
        return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider>
            <div className="logo" />
            <Menu theme="dark" defaultSelecanttedKeys={['1']} mode="inline">
              <Menu.Item key="4">
                <Icon type="form" />
                <span>Register</span>
                <NavLink to="/auth/register" />
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="form" />
                <span>Login</span>
                <NavLink to="/auth/login" />
              </Menu.Item>
            </Menu>
          </Sider>
          {this.props.children}
        </Layout>)
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer)
