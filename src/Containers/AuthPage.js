import React from 'react'
import { Layout, Row, Col } from 'antd'
import RegistrationForm from '../Components/RegistrationForm.js'
import LoginForm from '../Components/LoginForm.js'
import { Route, Switch, Link } from 'react-router-dom'

const { Header, Content, Footer } = Layout

class AuthPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Layout>
        <Header style={{ color: 'white' }}><Link to="/" >Matcha </Link> </Header>
        <Content style={{ padding: '50px 0', backgroundColor: '#fff' }}>
          <Row>
            <Col span={12} offset={6}>
              <Switch>
                <Route exact path="/auth/register" component={RegistrationForm} />
                <Route exact path="/auth/login" component={LoginForm} />
              </Switch>
            </Col>
          </Row>
        </Content>
        <Footer theme="dark" style={{ textAlign: 'center' }}>
          Matcha Project ©2018 Created by @drenkas & @dkazanov
        </Footer>
      </Layout>
    )
  }
}

export default AuthPage
