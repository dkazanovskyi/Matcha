import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Tooltip, Icon, Button } from 'antd'
import UserActions from '../Redux/user'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { append, propOr } from 'ramda'
import { showNotification } from './showNotif'

const FormItem = Form.Item

class RegistrationForm extends React.Component {
	state = {
		confirmDirty: false,
		buttonDisabled: false
	}

	actionRedirect = () => {
		this.props.history.push("/")
	}

	actionError = () => {
		this.setState({ buttonDisabled: false })
	}


	handleSubmit = e => {
		this.setState({ buttonDisabled: true })
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.registerUser(values, this.actionRedirect, this.actionError)
			} else {
				this.setState({ buttonDisabled: false })
				let msg = "Fields error"
				let desc = 'Fill in all required fields'
				showNotification('warning', msg, desc, this.actionError, 2)
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

		errors = propOr(0, 'length', value) < 3 ? append(new Error('Username should be at least 3 characters !'), errors) : errors
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
							trigger: 'onBlur',
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
					<Button type="primary" htmlType="submit" disabled={this.state.buttonDisabled}>
						Register
					</Button>
				</FormItem>
			</Form>
		)
	}
}
const WrappedRegistrationForm = Form.create()(RegistrationForm)

const mapDispatchToProps = dispatch => {
	return {
		registerUser: (payload, actionSuccess, actionFail) => dispatch(UserActions.registerUserRequest(payload, actionSuccess, actionFail))
	}
}

export default withRouter( 
	connect(null, mapDispatchToProps)(WrappedRegistrationForm))
