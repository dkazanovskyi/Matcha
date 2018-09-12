import React from 'react'
import { SpinLoader } from 'react-css-loaders'
import axios from 'axios'
import {Layout, Row, Col, Button , notification } from 'antd'
import { withRouter } from 'react-router-dom'

const { Header, Content, Footer } = Layout

class AuthPage extends React.Component {

	actionRedirect = () => {
		console.log("DAROVAAA")
		this.props.history.push("/")
	}

	openNotification = (type, msg, desc, action) => {
		const key = `open${Date.now()}`
		const btn = (
			<Button type="primary" size="small" onClick={() => {
				action()
				notification.close(key)}}>
				Confirm
			</Button>
		)
		notification.open({
			type: type,
			message: msg,
			description: desc,
			btn,
			key,
			onClose: action,
		})
	}

	componentDidMount() {
		
		axios.post('/signup/mail_verify', {
			code: this.props.match.params.code
		})
			.then(response => {
				console.log("RESPONSE", response)
				if (response.status === 200) {
					
					let msg = "Success verify"
					let desc = 'Now you can log in with your username and password.'
					this.openNotification('success', msg, desc, () => {})
					this.props.history.push("/")
				} else {
					let msg = "Verify error"
					let desc = response.data.error
					this.openNotification('error', msg, desc, this.actionRedirect)
				}
			}).catch((error) => {
				let msg = "API error"
				let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
				this.openNotification('error', msg, desc, this.actionRedirect)
			})
	}

	render() {
		console.log("Darova")
		return (
			<Layout>
        <Header style={{ color: 'white' }}>Matcha</Header>
        <Content style={{ padding: '50px 0', backgroundColor: '#fff' }}>
          <Row>
            <Col span={12} offset={6}>
							<SpinLoader color="#006B50"/>
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

export default withRouter(AuthPage)
