import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import UserActions from '../Redux/user'
const { Sider, Content } = Layout

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
          <Menu onClick={this.onClick} theme="dark" mode="inline">
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
        <Layout style={{ padding: '24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
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
          <Layout style={{ padding: '24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
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
