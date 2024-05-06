import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ChainId, divisorBigNumber, formatMoney } from '@ui/src'
import { isEqual } from 'lodash'
import { Address } from 'wagmi'

import { IDefenceRankDataItem } from '@/pages/Monster/hooks/monster.types'
import BigNumberJs from '@/utils/BigNumberJs'

import { fetchAccountMonster } from './fetchAccountMonster'
import { fetchAccountMonsterNft } from './fetchAccountMonsterNft'
import { fetchMonster } from './fetchMonster'
import { fetchAccountMonsterGraphql, fetchMonsterGraphql } from './fetchMonsterGraphql'
export enum MonsterKeyType {
  name = 'name',
  symbol = 'symbol',
  challengeEndedAt = 'challengeEndedAt',
  challengeStartedAt = 'challengeStartedAt', // 开始挑战的时间
  nftStartedAt = 'nftStartedAt',
  nftEndedAt = 'nftEndedAt',
  totalDamage = 'totalDamage',
  maxHP = 'maxHP', // 總血量
  stages = 'stages', // 打怪兽的阶段
  purchasePrice = 'purchasePrice', // 所需GP
  purchasePriceStr = 'purchasePriceStr' // 所需GP
}

export enum AccountMonsterKeyType {
  balance = 'balance',
  record = 'record', //  打了幾場, 用來確認可否 claim
  matchRestriction = 'matchRestriction' // 是否符合 claim 的條件
}
export type IMonsterData = Record<MonsterKeyType, string>
export type IAccountMonsterData = Record<AccountMonsterKeyType, string>

export type IMonster = {
  monsterLoading: boolean
  monster?: IMonsterData
  accountMonsterLoading: boolean
  accountMonster?: IAccountMonsterData
  defenceRankData?: IDefenceRankDataItem[]
  defenceAccountRankData?: IDefenceRankDataItem
  hasMonsterNft: boolean // for profile
}

const initialState: IMonster = {
  monsterLoading: false,
  monster: undefined,
  accountMonsterLoading: false,
  accountMonster: undefined,
  defenceRankData: undefined,
  hasMonsterNft: false
}
export const fetchMonsterAsync = createAsyncThunk<any, { chainId: ChainId }>('monster/fetchMonsterAsync', async ({ chainId }) => {
  const monster = await fetchMonster({ chainId })
  return monster
})

export const fetchAccountMonsterAsync = createAsyncThunk<any, { chainId: ChainId; account: Address }>(
  'monster/fetchAccountMonsterAsync',
  async ({ chainId, account }) => {
    const accountMonster = await fetchAccountMonster({ chainId, account })
    return accountMonster
  }
)

export const fetchMonsterGraphqlAsync = createAsyncThunk<any, { chainId: ChainId }>('monster/fetchMonsterGraphqlAsync', async ({ chainId }) => {
  const monsterGraphqlData = await fetchMonsterGraphql({ chainId })
  return monsterGraphqlData
})

export const fetchAccountMonsterGraphqlAsync = createAsyncThunk<any, { chainId: ChainId; account: Address; defenceRankData: IDefenceRankDataItem[] }>(
  'monster/fetchAccountMonsterGraphqlAsync',
  async ({ chainId, account, defenceRankData }) => {
    const monsterGraphqlData = await fetchAccountMonsterGraphql({ chainId, account, defenceRankData })
    return monsterGraphqlData
  }
)

export const fetchAccountMonsterNftAsync = createAsyncThunk<boolean | undefined, { chainId: ChainId; account: Address }>(
  'monster/fetchAccountMonsterNftAsync',
  async ({ chainId, account }) => {
    const monsterGraphqlData = await fetchAccountMonsterNft({ chainId, account })
    return monsterGraphqlData
  }
)
const monsterSlice = createSlice({
  name: 'monster',
  initialState,
  reducers: {
    changeMonsterStateValue: (state, action) => {
      const key = action.payload.key
      const value = action.payload.value
      if (!isEqual(state[key], value)) {
        state[key] = value
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchMonsterAsync.pending, (state, action) => {
      state.monsterLoading = true
    }),
      builder.addCase(fetchMonsterAsync.fulfilled, (state, action) => {
        state.monsterLoading = false
        if (action.payload) {
          const obj: any = {}
          for (const [key, value] of Object.entries(action.payload)) {
            obj[key as MonsterKeyType] = value
            if (key === MonsterKeyType.purchasePrice) {
              obj[MonsterKeyType.purchasePriceStr] = formatMoney(new BigNumberJs(`${value}`).dividedBy(divisorBigNumber).toNumber())
            }
          }
          if (!isEqual(state.monster, obj)) {
            state.monster = obj as IMonsterData
          }
        }
      }),
      builder.addCase(fetchAccountMonsterAsync.pending, (state, action) => {
        state.accountMonsterLoading = true
      }),
      builder.addCase(fetchAccountMonsterAsync.fulfilled, (state, action) => {
        state.accountMonsterLoading = false
        if (action.payload) {
          const obj: any = {}
          for (const [key, value] of Object.entries(action.payload)) {
            obj[key as AccountMonsterKeyType] = value
          }
          if (!isEqual(state.accountMonster, obj)) {
            state.accountMonster = obj as IAccountMonsterData
          }
        }
      }),
      builder.addCase(fetchMonsterGraphqlAsync.fulfilled, (state, action) => {
        if (action.payload) {
          if (!isEqual(state.defenceRankData, action.payload)) {
            state.defenceRankData = action.payload
          }
        }
      }),
      builder.addCase(fetchAccountMonsterGraphqlAsync.fulfilled, (state, action) => {
        if (action.payload) {
          if (!isEqual(state.defenceAccountRankData, action.payload)) {
            state.defenceAccountRankData = action.payload
          }
        } else {
          state.defenceAccountRankData = undefined
        }
      }),
      builder.addCase(fetchAccountMonsterNftAsync.fulfilled, (state, action) => {
        if (!isEqual(state.hasMonsterNft, action.payload)) {
          state.hasMonsterNft = action.payload ?? false
        }
      })
  }
})
export const { changeMonsterStateValue } = monsterSlice.actions
export default monsterSlice.reducer
