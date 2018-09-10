import React from 'react'
import { Form, Icon, Input, Button, Card } from 'antd'
import { append, propOr } from 'ramda'

const FormItem = Form.Item

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.props)
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', err, values)
    })
  }

  validateUsername = (rule, value, cb) => {
    let errors = []

    errors = propOr(0, 'length', value) < 6 ? append(new Error('Username should be at least 6 characters !'), errors) : errors
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
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          </FormItem>
          <FormItem {...formItemLayout}>
            <a className="login-form-forgot" href="" style={{ float: 'left' }}>Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

const WrappedLoginForm = Form.create()(LoginForm)

export default WrappedLoginForm
