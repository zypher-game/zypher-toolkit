import { useIsTelegram, useRecoilValue } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { useBingoVersion } from '@/hooks/useBingoVersion'
import { useRecentGames } from '@/hooks/useRecentGames'

import StartGameDialog from '../components/StartGameDialog/StartGameDialog'
import { bingoVersionState, IBingoVersion } from '../state/state'
import Inner from './components/Inner/Inner'
import InnerBeta from './components/InnerBeta/InnerBeta'
import RightBar from './components/rightBar/rightBar'
import SideBar from './components/sideBar'
import UserCenter from './components/userCenter/userCenter'
import { useAnim } from './hooks/useAnim'
import { useRead } from './hooks/useRead'

const zBingoIndex = memo(() => {
  useBingoVersion()
  const IS_TELEGRAM = useIsTelegram()
  const bingoVersion = useRecoilValue(bingoVersionState)
  useAnim()
  useRead()
  const { list: bingoMapList, listBeta: listBetaMapList, hasError: bingoHasError } = useRecentGames()
  return (
    <>
      <UserCenter />
      <SideBar bingoMapList={bingoMapList} listBetaMapList={listBetaMapList} bingoHasError={bingoHasError} />
      <RightBar />
      {bingoVersion === IBingoVersion.beta ? <InnerBeta listBetaMapList={listBetaMapList} bingoHasError={bingoHasError} /> : null}
      {bingoVersion === IBingoVersion.v1 ? <Inner bingoMapList={bingoMapList} bingoHasError={bingoHasError} /> : null}
      {IS_TELEGRAM ? <StartGameDialog isFromIndex={true} /> : null}
    </>
  )
}, isEqual)
export default zBingoIndex
