import { GlobalVar } from '@ui/src'

import { changeUserStateValue } from '../../store/user/reducer'
import extractError, { TransactionErrorOptions } from './extractError'

export const setErrorToast = function (
  msg:
    | string
    | {
        title?: string
        message?: string
        shortMessage?: string
      }
    | any,
  options?: TransactionErrorOptions
): void {
  const obj = {
    title: '',
    message: ''
  }
  if (typeof msg === 'string') {
    obj.message = msg
  } else {
    const { title, message, shortMessage } = msg
    if (title && title !== 'Error') {
      obj.title = title
      obj.message = shortMessage ?? message ?? ''
    } else {
      const res = extractError(msg, options)
      obj.title = res.reason ?? 'Error'
      obj.message = res.message ?? ''
    }
  }
  GlobalVar.dispatch(
    changeUserStateValue({
      key: 'error',
      value: obj
    })
  )
}

export const setSuccessToast = function (
  msg:
    | string
    | {
        title?: string
        message?: string
      }
): void {
  const obj = {
    title: '',
    message: ''
  }
  if (typeof msg === 'string') {
    obj.message = msg
  } else {
    obj.title = msg.title ?? ''
    obj.message = msg.message ?? ''
  }
  GlobalVar.dispatch(
    changeUserStateValue({
      key: 'success',
      value: obj
    })
  )
}
