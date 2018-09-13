import React from 'react'
import { Form, Icon, Input, Button, Card, notification} from 'antd'
import { append, propOr } from 'ramda'
import axios from 'axios'

const FormItem = Form.Item

class LoginForm extends React.Component {
	
	actionRedirect = () => {
		this.props.history.push("/")
	}

	actionError = (button) => {
		button.disabled = false
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

	handleSubmit = (e) => {
		const button = e.target.querySelector("button")
		const password = document.getElementById("password")
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				button.disabled = true
				console.log("VALUES", values.userName, password.value)
				axios.post('/login/', {
					username: values.userName,
					password: password.value
				})
					.then(response => {
						if (response.status === 200) {
							notification.config({ duration: 3 })
							let msg = "Success registration"
							let desc = 'Letter confirmation email has been sent. After 3 seconds you will be redirected to the main page.'
							this.openNotification('success', msg, desc, this.actionRedirect)
							setTimeout( this.actionRedirect, 3000)
						} else {
							notification.config({ duration: 2 })
							let msg = "Fetch error"
							let desc = 'An attempt to contact the database resulted in an error. Try again.\n'+response.data.error
							this.openNotification('error', msg, desc, this.actionError(button))
						}
					}).catch(error => {
						notification.config({ duration: 2 })
						let msg = "API error"
						let desc = 'An attempt to contact the API resulted in an error. Try again.\n'+error
						this.openNotification('error', msg, desc, this.actionError(button))
					})
			} else {
				notification.config({ duration: 1 })
				let msg = "Fields error"
				let desc = 'Fill in all required fields'
				this.openNotification('warning', msg, desc, this.actionError(button))
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

export default WrappedLoginForm
