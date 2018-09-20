import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button, Card} from 'antd'
import UserActions from '../Redux/user'
import { append, propOr } from 'ramda'
import { showNotification } from './showNotif'

const FormItem = Form.Item

class LoginForm extends React.Component {
	
	actionRedirect = () => {
		this.props.history.push("/")
	}

	actionError = () => {
		const button = document.querySelector("button")
		button.disabled = false
	}

	handleSubmit = (e) => {
		const button = e.target.querySelector("button")
		button.disabled = true
		const password = document.getElementById("password")
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log("VALUES", values.userName, password.value)
				this.props.createUser({
					username: values.userName,
					password: password.value
				}, this.actionRedirect, this.actionError)
			} else {
				button.disabled = false
				let msg = "Fields error"
				let desc = 'Fill in all required fields'
				showNotification('warning', msg, desc, this.actionError(button), 1)
			}
		})
	}

	validateUsername = (rule, value, cb) => {
		let errors = []

		errors = propOr(0, 'length', value) < 3 ? append(new Error('Username should be at least 3 characters !'), errors) : errors
		setTimeout(() => cb(errors), 1000)
		return 
	}

	render() {
		const formItemLayout = {
			wrapperCol: {
				xs: { span: 8, offset: 4 },
				sm: { span: 12, offset: 6 }
			}
		}
		const { getFieldDecorator } = this.props.form
		return (
			<Card title="Login">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem
						{...formItemLayout}
						hasFeedback
					>
						{getFieldDecorator('userName', {
							rules: [
								{
									validator: this.validateUsername
								}
							],
						})(
							<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
						)}
					</FormItem>
					<FormItem {...formItemLayout}>
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" id="password"/>
					</FormItem>
					<FormItem {...formItemLayout}>
						<Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
							Log in
						</Button>
						<a className="login-form-forgot" href="" style={{ float: 'left' }}>Forgot password</a>
						Or <a href="">register now!</a>
					</FormItem>
				</Form>
			</Card>
		)
	}
}

const WrappedLoginForm = Form.create()(LoginForm)

const mapDispatchToProps = dispatch => {
	console.log('VALIDATION TYPES', UserActions)
	return {
		createUser: (payload, actionSuccess, actionFail) => dispatch(UserActions.createUserRequest(payload, actionSuccess, actionFail))
	}
}

export default withRouter( 
	connect(null, mapDispatchToProps)(WrappedLoginForm))