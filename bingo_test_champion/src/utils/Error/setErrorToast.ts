import { GlobalVar } from '@ui/src'

import { changeUserStateValue } from '../../store/user/reducer'
import extractError, { TransactionErrorOptions } from './extractError'

export const setErrorToast = function (rawError: any, options?: TransactionErrorOptions): void {
  const { name, message, shortMessage } = rawError
  const obj = {
    name: '',
    message: ''
  }
  if (name && name !== 'Error') {
    obj.name = name
    obj.message = shortMessage ?? message
  } else {
    const res = extractError(rawError, options)
    obj.name = res.reason ?? 'Error'
    obj.message = res.message ?? ''
  }
  if (obj.message.indexOf('Execution') > -1 && window.IS_TELEGRAM) {
    return
  }
  GlobalVar.dispatch(
    changeUserStateValue({
      key: 'error',
      value: obj
    })
  )
}

export const setSuccessToast = function (msg: { title?: string; message?: string }): void {
  GlobalVar.dispatch(
    changeUserStateValue({
      key: 'success',
      value: msg
    })
  )
}
