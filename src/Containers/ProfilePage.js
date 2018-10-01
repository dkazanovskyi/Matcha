  import {
      Form, Select, InputNumber, Switch, Radio,
      Slider, Button, Upload, Icon, Rate,
  } from 'antd'
  import React from 'react'
  import TagsInput from '../Components/TagsInput'

  const FormItem = Form.Item
  const Option = Select.Option
  const RadioButton = Radio.Button
  const RadioGroup = Radio.Group
  
  class Profile extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault()
      console.log(this.props.form.getFieldsValue())
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  
    normFile = (e) => {
      console.log('Upload event:', e)
      if (Array.isArray(e) && e.length > 1) return
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    }

    getTags = (tags) => {
      console.log(tags)
      this.props.form.setFields({
        tags: {
          value: tags
        }
      })
    }
  
    render() {
      const { getFieldDecorator } = this.props.form
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="Gender"
            hasFeedback
          >
            {getFieldDecorator('gender', {
              rules: [
                { required: true, message: 'Please select your gender!' },
              ],
            })(
              <Select placeholder="Please select a gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Sexual preferences"
            hasFeedback
          >
            {getFieldDecorator('sexualPreferences', {
              rules: [
                { required: true, message: 'Please select your sexual preferences!' },
              ],
            })(
              <Select placeholder="Please select a sexual preferences">
                <Option value="getero">Getero</Option>
                <Option value="gay">Gay/Lesbian</Option>
                <Option value="bisexual">Bisexual</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
              label="Interests"
              hasFeedback
            >
              {getFieldDecorator('tags', {
                rules: [
                  { required: true, message: 'Please select interests!' },
                ],
                valuePropName: 'tags',
                getValueFromEvent: 'onPressEnter'
              })(
                <TagsInput getTags={this.getTags} />
              )}
          </FormItem>
         
          <FormItem
            {...formItemLayout}
            label="Rate"
          >
            {getFieldDecorator('rate', {
              initialValue: 3.5,
            })(
              <Rate />
            )}
          </FormItem>
  
          <FormItem
            {...formItemLayout}
            label="Upload profile photo"
          >
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture" accept="image/*">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </FormItem>
  
          <FormItem
            {...formItemLayout}
            label="Extra photos"
          >
            <div className="dropbox">
              {getFieldDecorator('dragger', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload.Dragger name="files" action="/upload.do" accept="image/*">
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              )}
            </div>
          </FormItem>
  
          <FormItem
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>
      )
    }
  }
  
  const WrappedProfile = Form.create()(Profile)
  
export default WrappedProfile