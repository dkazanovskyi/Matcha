import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Tooltip, Icon, Button } from 'antd'
import ValidationActions from '../Redux/inputValidator'
import axios from 'axios'

const FormItem = Form.Item

class RegistrationForm extends React.Component {
	state = {
		confirmDirty: false
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
				axios.post('/signup/', values)
					.then(response => {
						console.log(response)
						if (response.status === 200) {
							console.log('successful signup')
						} else {
							console.log(response.data.error)
						}
					}).catch(error => {
						console.log('check error: ')
						console.log(error)
					})
			} else {
				console.log("HELLO", err)
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
		console.log("DAROV", rule,  value)
		axios.post('/signup/checkExists', {
			type: rule.field,
			value: value
		})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					console.log('successful check')
					callback()
				} else {
					console.log(response.data.error)
					callback(false)
				}
			}).catch(error => {
				console.log('check error: ')
				console.log(error)
				callback(false)
			})
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
							Username&nbsp;
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
					<Button type="primary" htmlType="submit" onClick={this.onSubmit}>
						Register
					</Button>
				</FormItem>
			</Form>
		)
	}
}

const mapDispatchToProps = dispatch => {
  console.log('VALIDATION TYPES', ValidationActions)
  return {
    validateInput: () => dispatch(ValidationActions.validateInputRequest())
  }
}

export default connect(null, mapDispatchToProps)(RegistrationForm)

