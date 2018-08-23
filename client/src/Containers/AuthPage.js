import React from 'react'
import { Layout, Row, Col, Card } from 'antd'
import RegistrationForm from '../Components/RegistrationForm.js'

const { Header, Content, Footer } = Layout

class AuthPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Layout>
        <Header style={{ color: 'white' }}>Matcha</Header>
        <Content style={{ padding: '50px 0', backgroundColor: '#fff' }}>
          <Row>
            <Col span={12} offset={6}>
              <Card title="Registration">
                <RegistrationForm />
              </Card>
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
