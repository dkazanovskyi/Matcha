import React from 'react'
import { Form, Icon, Input, Button, Card } from 'antd'

const FormItem = Form.Item

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.props)
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', values)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 8, offset: 4 },
        sm: { span: 12, offset: 6 }
      }
    }
    return (
      <Card title="Login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem {...formItemLayout}>
            {getFieldDecorator('userName', {
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('password', {
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
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