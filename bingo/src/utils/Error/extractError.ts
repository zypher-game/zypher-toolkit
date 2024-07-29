import { ErrorDescription } from '@ethersproject/abi/lib/interface'
import { ethers } from 'ethers'

import { TransactionErrorReason, TX_ERROR_PATTERNS } from './transactionError'

export type TransactionError = {
  code?: number
  message?: string
  data?: any
  description?: ErrorDescription | null
  reason?: TransactionErrorReason
  rawError: any
}

export type TransactionErrorOptions = ethers.Contract

const extractError = (rawError: any, options?: TransactionErrorOptions): TransactionError => {
  const error = rawError?.error?.error ?? rawError?.error ?? rawError?.reason ?? rawError
  const errorCode = error?.code
  const errorData = error?.data?.data ?? error?.data

  let errorDescription: ErrorDescription | null = null
  if (errorData && options) {
    try {
      errorDescription = options.interface.parseError(errorData)
    } catch (_err) {}
  }

  const errorMessage = typeof error === 'string' ? error : error?.message ?? error?.data?.message ?? error?.reason ?? rawError?.reason

  const ethQueryParts = errorMessage?.split('[ethjs-query] while formatting outputs from RPC ')
  if (ethQueryParts && ethQueryParts.length > 1) {
    const newError = ethQueryParts[1].replaceAll("'", '')
    const parsedError = JSON.parse(newError)
    return extractError(parsedError.value ?? parsedError, options)
  } else if (errorMessage && errorMessage.includes('Error: {')) {
    const errorParts = errorMessage?.split('Error: ')
    const newError = errorParts[1].replaceAll("'", '"')
    return extractError(JSON.parse(newError), options)
  }

  for (const [reason, patterns] of Object.entries(TX_ERROR_PATTERNS)) {
    for (const pattern of patterns) {
      const matchCode = pattern.code && errorCode === pattern.code
      const matchMessage = pattern.message && errorMessage && errorMessage.toLowerCase().includes(pattern.message.toLowerCase())
      const matchName = pattern.name && errorDescription && errorDescription.name.toLowerCase().includes(pattern.name.toLowerCase())
      if (matchCode || matchMessage || matchName) {
        return {
          code: errorCode,
          message: errorMessage,
          data: errorData,
          description: errorDescription,
          reason: reason as TransactionErrorReason,
          rawError
        }
      }
    }
  }

  return {
    code: errorCode,
    message: errorMessage,
    data: errorData,
    description: errorDescription,
    rawError
  }
}

export default extractError
