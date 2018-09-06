import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Tooltip, Icon, Button } from 'antd'
import { ValidationTypes } from '../Redux/inputValidator'

const FormItem = Form.Item

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  }

  handleSubmit = e => {
    e.preventDefault()
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

  handleWebsiteChange = value => {
    let autoCompleteResult
    if (!value) {
      autoCompleteResult = []
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      )
    }
    this.setState({ autoCompleteResult })
  }

  requiredField = () => {
    console.log('VALIDATE', this, this.props)
    this.props.validateInput()
  }

  render() {
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
          <Input onChange={this.requiredField} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          <Input />
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          <Input type="password" />
        </FormItem>
        <FormItem {...formItemLayout} label="Confirm Password">
          <Input type="password" onBlur={this.handleConfirmBlur} />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  console.log('VALIDATION TYPES', ValidationTypes)
  return {
    validateInput: () => dispatch(ValidationTypes.validateInputRequest())
  }
}

export default connect(null, mapDispatchToProps)(RegistrationForm)

