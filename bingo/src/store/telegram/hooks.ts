import { pathnameState, useRecoilValue } from '@ui/src'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { GlobalVar } from '@/constants/constants'

import { IState } from '..'
import { updateTelegram } from './reducer'
export const useTelegram = (): void => {}

export const useTelegramData = () => {
  return useSelector((state: IState) => state.telegram)
}

export const useIsTelegram = () => {
  return useSelector((state: IState) => state.telegram.isTelegram)
}
