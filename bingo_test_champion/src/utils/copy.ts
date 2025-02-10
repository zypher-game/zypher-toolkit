import { message } from 'antd'
import copy from 'copy-to-clipboard'

export default (text: string): void => {
  message.destroy()
  if (copy(text)) {
    message.success({
      content: 'Copy Success',
      className: 'customMessage',
      style: {
        marginTop: '50vh'
      }
    })
  } else {
    message.error({
      content: 'Copy fail',
      className: 'customMessage',
      style: {
        marginTop: '50vh'
      }
    })
  }
}
