import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Tooltip, Icon, Button , notification } from 'antd'
import ValidationActions from '../Redux/inputValidator'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { append, propOr } from 'ramda'

const FormItem = Form.Item

class RegistrationForm extends React.Component {
	state = {
		confirmDirty: false
	}

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

	handleSubmit = e => {
		const button = e.target.querySelector("button")
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				button.disabled = true
				axios.post('/signup/', values)
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

	handleConfirmBlur = e => {
		const value = e.target.value
		this.setState({ confirmDirty: this.state.confirmDirty || !!value })
	}

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!')
		} else {
			callback()
		}
	}

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true })
		}
		callback()
	}

	checkExists = (rule, value, callback) => {
		axios.post('/signup/checkExists', {
			type: rule.field,
			value: value
		})
			.then(response => {
				if (response.status === 200) {
					callback()
				} else {
					callback(false)
				}
			}).catch(() => {
				callback(false)
			})
	}

	validateUsername = (rule, value, cb) => {
		let errors = []

		errors = propOr(0, 'length', value) < 3 ? append(new Error('Username should be at least 6 characters !'), errors) : errors
		setTimeout(() => cb(errors), 1000)
		return 
	}

	render() {
		const { getFieldDecorator } = this.props.form

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 24 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 24 }
			}
		}
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 24,
					offset: 0
				}
			}
		}

		return (
			<Form layout="vertical" onSubmit={this.handleSubmit}>
				<FormItem {...formItemLayout} label="First Name">
					{getFieldDecorator('firstname', {
						rules: [
							{
								type: 'string',
								message: 'The input is not valid first name!'
							},
							{
								required: true,
								message: 'Please input your first name!'
							}
						]
					})(<Input />)}
				</FormItem>

				<FormItem {...formItemLayout} label="Last Name">
					{getFieldDecorator('lastname', {
						rules: [
							{
								type: 'string',
								message: 'The input is not valid last name!'
							},
							{
								required: true,
								message: 'Please input your last name!'
							}
						]
					})(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="E-mail">
					{getFieldDecorator('email', {
						validate: [{
							rules: [
								{
									type: 'email',
									message: 'The input is not valid E-mail!'
								},
								{
									required: true,
									message: 'Please input your E-mail!',
									whitespace: false
								}
							]},
						{
							trigger: 'onBlur',
							rules: [{
								validator:  this.checkExists,
								message: 'This e-mail already exists!',
							}]
						}]
					})(<Input />)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label={
						<span>
							Username
							<Tooltip title="What do you want others to call you?">
								<Icon type="question-circle-o" />
							</Tooltip>
						</span>
					}
				>
					{getFieldDecorator('username', {
						validate: [{
							rules: [
								{
									type: 'string',
									message: 'The input is not valid username!'
								},
								{
									validator: this.validateUsername
								},
								{
									required: true,
									message: 'Please input your username!',
									whitespace: false
								}
							]},
						{
							trigger: 'onBlur',
							rules: [{
								validator:  this.checkExists,
								message: 'This username already exists!',
							}]
						}]
					})(<Input />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Password">
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Please input your password!'
							},
							{
								validator: this.validateToNextPassword
							},
							{
								pattern: new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"),
								message: "Wrong format!"
							}
						]
					})(<Input type="password" />)}
				</FormItem>
				<FormItem {...formItemLayout} label="Confirm Password">
					{getFieldDecorator('confirm', {
						rules: [
							{
								required: true,
								message: 'Please confirm your password!'
							},
							{
								validator: this.compareToFirstPassword
							}
						]
					})(<Input type="password" onBlur={this.handleConfirmBlur} />)}
				</FormItem>
				<FormItem {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit" >
						Register
					</Button>
				</FormItem>
			</Form>
		)
	}
}
const WrappedRegistrationForm = Form.create()(RegistrationForm)

const mapDispatchToProps = dispatch => {
	console.log('VALIDATION TYPES', ValidationActions)
	return {
		validateInput: () => dispatch(ValidationActions.validateInputRequest())
	}
}

export default withRouter( 
	connect(null, mapDispatchToProps)(WrappedRegistrationForm))
