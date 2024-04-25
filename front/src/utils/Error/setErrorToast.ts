import { changeUserStateValue } from '../../store/user/reducer'
import extractError, { TransactionErrorOptions } from './extractError'

export const setErrorToast = function (dispatch: any, rawError: any, options?: TransactionErrorOptions): void {
  const obj = {
    title: '',
    message: ''
  }
  if (typeof rawError === 'string') {
    obj.message = rawError
  } else {
    const { title, message, shortMessage } = rawError
    if (title && title !== 'Error') {
      obj.title = title
      obj.message = shortMessage ?? message
    } else {
      const res = extractError(rawError, options)
      obj.title = res.reason ?? 'Error'
      obj.message = res.message ?? ''
    }
  }
  console.log(1111, rawError, obj)
  dispatch(
    changeUserStateValue({
      key: 'error',
      value: obj
    })
  )
}

export const setSuccessToast = function (
  dispatch: any,
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
  dispatch(
    changeUserStateValue({
      key: 'success',
      value: obj
    })
  )
}
