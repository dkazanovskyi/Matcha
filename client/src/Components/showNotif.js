import React from 'react'
import { Button , notification } from 'antd'

export const showNotification = (type, msg, desc, action, duration) => {
  const key = `open${Date.now()}`
  const btn = (
    <Button type="primary" size="small" onClick={() => {
      action()
      notification.close(key)}}>
      Confirm
    </Button>
  )
  notification.config({ duration: duration })
  notification.open({
    type: type,
    message: msg,
    description: desc,
    btn,
    key,
    onClose: action,
  })
}
