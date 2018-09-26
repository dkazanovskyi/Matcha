import React from 'react'
import { SpinLoader } from 'react-css-loaders'
import { Layout, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import UserActions from '../Redux/user'

const { Header, Content, Footer } = Layout

class VerifyCode extends React.Component {

	actionRedirect = () => {
		this.props.history.push("/")
	}

	componentDidMount() {
		this.props.verifyCode({
			code: this.props.match.params.code
		}, this.actionRedirect)
	}

	render() {
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

const mapDispatchToProps = dispatch => {
	return {
		verifyCode: (payload, actionRedirect) => dispatch(UserActions.verifyCodeRequest(payload, actionRedirect))
	}
}

export default withRouter( 
	connect(null, mapDispatchToProps)(VerifyCode))
