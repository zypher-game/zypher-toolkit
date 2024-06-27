import { preStaticUrl, SvgComponent } from '@ui/src'
import { message } from 'antd'
import copy from 'copy-to-clipboard'
import React from 'react'

export default (text: string, toastContainerRef?: React.MutableRefObject<HTMLElement | null>): void => {
  message.destroy()
  if (toastContainerRef) {
    setTimeout(() => {
      toastContainerRef.current!.style.opacity = '1'
    }, 100)
  }
  if (copy(text)) {
    message.success({
      content: 'Copy Success',
      className: 'customNotification success',
      duration: 3,
      icon: <SvgComponent src={preStaticUrl + '/img/icon/pixel_success.svg'} />,
      getContainer: () => (toastContainerRef ? toastContainerRef.current : undefined)
    })
  } else {
    message.error({
      content: 'Copy fail',
      className: 'customNotification failed',
      duration: 3,
      icon: <SvgComponent src={preStaticUrl + '/img/icon/pixel_fail.svg'} />,
      getContainer: () => (toastContainerRef ? toastContainerRef.current : undefined)
    })
  }
  if (toastContainerRef) {
    setTimeout(() => {
      toastContainerRef.current!.style.opacity = '0'
    }, 2000)
  }
}
