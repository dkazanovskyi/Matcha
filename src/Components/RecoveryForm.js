import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button, Card} from 'antd'
import UserActions from '../Redux/user'
import { showNotification } from './showNotif'

const FormItem = Form.Item

class RecoveryForm extends React.Component {
	
	state = {
		confirmDirty: false,
		buttonDisabled: false
	}

	actionRedirect = () => {
		this.props.history.push("/auth/login")
	}

	actionError = () => {
		this.setState({ buttonDisabled: false })
	}

	handleSubmit = (e) => {
		this.setState({ buttonDisabled: true })
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.recoveryUser({
					password: values.password,
					code: this.props.match.params.code
				}, this.actionRedirect, this.actionError)
			} else {
				this.setState({ buttonDisabled: false })
				let msg = "Fields error"
				let desc = 'Fill in all required fields'
				showNotification('warning', msg, desc, this.actionError, 1)
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

	render() {
		const formItemLayout = {
			wrapperCol: {
				xs: { span: 8, offset: 4 },
				sm: { span: 12, offset: 6 }
			}
		}
		const { getFieldDecorator } = this.props.form
		return (
			<Card title="Recovery">
				<Form onSubmit={this.handleSubmit} className="forgot-form">
					<FormItem {...formItemLayout} >
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
						})(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" id="password"/>)}
					</FormItem>
					<FormItem {...formItemLayout} >
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
						})(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm password" id="confirm" onBlur={this.handleConfirmBlur} />)}
					</FormItem>
					<FormItem {...formItemLayout}>
						<Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}} disabled={this.state.buttonDisabled}>
							Change Password
						</Button>
					</FormItem>
				</Form>
			</Card>
		)
	}
}

const WrappedRecoveryForm = Form.create()(RecoveryForm)

const mapDispatchToProps = dispatch => {
	return {
		recoveryUser: (payload, actionSuccess, actionFail) => dispatch(UserActions.recoveryUserRequest(payload, actionSuccess, actionFail))
	}
}

export default withRouter( 
	connect(null, mapDispatchToProps)(WrappedRecoveryForm))