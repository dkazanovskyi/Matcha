import React from 'react'
import { Layout, Row, Col } from 'antd'
import ChatPage from '../Components/ChatPage.js'
import { Route, Switch, Link } from 'react-router-dom'

const { Header, Content, Footer } = Layout

class ConnectChat extends React.Component {

	render() {
		return (
			<Layout>
				<Header style={{ color: 'white' }}><Link to="/" >Matcha </Link> </Header>
				<Content style={{ padding: '50px 0', backgroundColor: '#fff' }}>
					<Row>
						<Col span={12} offset={6}>
							<ChatPage />
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

export default ConnectChat
