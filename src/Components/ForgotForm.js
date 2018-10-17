import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button, Card} from 'antd'
import axios from 'axios'
import UserActions from '../Redux/user'
import { append, propOr } from 'ramda'
import { showNotification } from './showNotif'

const FormItem = Form.Item

class ForgotForm extends React.Component {
	
	state = {
		buttonDisabled: false
	}

	actionRedirect = () => {
		this.props.history.push("/")
	}

	actionError = () => {
		this.setState({ buttonDisabled: false })
	}

	handleSubmit = (e) => {
		this.setState({ buttonDisabled: true })
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.forgotUser({
					username: values.username,
				}, this.actionRedirect, this.actionError)
			} else {
				this.setState({ buttonDisabled: false })
				let msg = "Fields error"
				let desc = 'Fill in all required fields'
				showNotification('warning', msg, desc, this.actionError, 1)
			}
		})
	}

	validateUsername = (rule, value, cb) => {
		let errors = []

		errors = propOr(0, 'length', value) < 3 ? append(new Error('Username should be at least 3 characters !'), errors) : errors
		console.log(errors ,errors === [])
		axios.post('/signup/checkExists', {
			type: rule.field,
			value: value
		})
			.then(response => {
				if (response.status === 200) {
					errors = append(new Error('This username does not exist!'), errors)
				}
			}).catch(() => {
				errors = append(new Error('Unknown error!'), errors)
			})
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
			<Card title="Forgot">
				<Form onSubmit={this.handleSubmit} className="forgot-form">
					<FormItem
						{...formItemLayout}
						hasFeedback
					>
						{getFieldDecorator('username', {
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
						<Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}} disabled={this.state.buttonDisabled}>
							Send mail
						</Button>
					</FormItem>
				</Form>
			</Card>
		)
	}
}

const WrappedForgotForm = Form.create()(ForgotForm)

const mapDispatchToProps = dispatch => {
	return {
		forgotUser: (payload, actionSuccess, actionFail) => dispatch(UserActions.forgotUserRequest(payload, actionSuccess, actionFail))
	}
}

export default withRouter( 
	connect(null, mapDispatchToProps)(WrappedForgotForm))