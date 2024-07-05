import { preStaticUrl, SvgComponent } from '@ui/src'
import { message } from 'antd'
import copy from 'copy-to-clipboard'
import React from 'react'

export default (text: string): void => {
  message.destroy()
  if (copy(text)) {
    message.success({
      content: 'Copy Success',
      className: 'customNotification success',
      duration: 3,
      icon: <SvgComponent src={preStaticUrl + '/img/icon/pixel_success.svg'} />
    })
  } else {
    message.error({
      content: 'Copy fail',
      className: 'customNotification failed',
      duration: 3,
      icon: <SvgComponent src={preStaticUrl + '/img/icon/pixel_fail.svg'} />
    })
  }
  setTimeout(() => {
    message.destroy()
  }, 3500)
}
