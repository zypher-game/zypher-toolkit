import { getProvider } from '@ui/src'

import storage from './storage'

export interface IRecord {
  hash?: string
  type:
    | 'supply'
    | 'borrow'
    | 'redeem'
    | 'repay'
    | 'approve'
    | 'enterMarket'
    | 'exitMarkets'
    | 'Stake'
    | 'Unstake'
    | 'claim'
    | 'claimDon'
    | 'claimAllDon'
  time: Date
  symbol: string
  num?: string
  success: boolean
  title?: string
}

export const addRecord = async (item: IRecord): Promise<void> => {
  const provider = await getProvider()
  const network = await provider.getNetwork()
  const chainId = Number(network.chainId)
  const accounts = await provider.listAccounts()
  const account = accounts[0].toLocaleLowerCase()
  const res = storage.get(`record_${chainId}_${account}`) || []
  const record = {
    ...item,
    title: ((): string => {
      if (item.type === 'enterMarket' || item.type === 'exitMarkets') {
        if (item.type === 'enterMarket') {
          return `Use ${item.symbol} as collateral`
        }
        return `Disable ${item.symbol} as collateral`
      }
      if (item.type === 'approve') {
        return `Enable ${item.symbol}`
      }
      if (item.type === 'claimDon') {
        return item.success ? `Claim ${item.symbol}` : `Failed to claim ${item.symbol}`
      }
      if (item.type === 'claimAllDon') {
        return item.success ? `Claim All ${item.symbol}` : `Failed to claim ${item.symbol}`
      }
      return item.success ? `${item.type.toUpperCase()} ${item.num} ${item.symbol}` : `Failed to ${item.type} ${item.num} ${item.symbol}`
    })()
  }
  res.unshift(record)
  if (res.length > 5) {
    res.splice(5)
  }
  storage.set(`record_${chainId}_${account}`, res)
}

export const clearRecord = (account: string, chainId: number): void => {
  storage.set(`record_${chainId}_${account.toLocaleLowerCase()}`, [])
}

export const getRecord = (account: string, chainId: number): IRecord[] => {
  return storage.get(`record_${chainId}_${account.toLocaleLowerCase()}`) || []
}
