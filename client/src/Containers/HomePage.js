import React, { Component } from 'react'
// import AuthPage from './AuthPage'
import { Layout, Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
const { Sider } = Layout
class HomePage extends Component {
  state = {}
  render() {
    console.log("object")
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="profile" />
              <span>Profile</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="eye" />
              <span>Research</span>
              <NavLink to="/signup" />
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="rocket" />
              <span>Recomended</span>
              <NavLink to="/login" />
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="form" />
              <span>Auth</span>
              <NavLink to="/auth" />
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    )
  }
}

export default HomePage
