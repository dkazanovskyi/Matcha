import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout

class HomePage extends Component {
  state = {}
  render() {
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
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="rocket" />
              <span>Recomended</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    )
  }
}

export default HomePage
