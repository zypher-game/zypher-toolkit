import { useAaWallet, useActiveWeb3React, useSetRecoilState, walletModalOpenState } from '@ui/src'
import React, { useEffect, useRef } from 'react'

import { gameUrl } from '@/constants/constants'
import useWalletFunctions from '@/hooks/useGameHandlers'
import { setupMessageHandler } from '@/utils/messageHandler'

import css from './home.module.styl'
const Home: React.FC = () => {
  const { account } = useActiveWeb3React()
  const iframeRef = useRef<HTMLIFrameElement>(null) // 获取 iframe 引用
  const { handleWeb3Info, handleWasm } = useWalletFunctions()
  const { aaWalletClient: walletClient, aa_mm_address } = useAaWallet()
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  useEffect(() => {
    // 将处理函数作为参数传递给 setupMessageHandler
    const cleanup = setupMessageHandler(walletClient, aa_mm_address, {
      setDialogOpen,
      handleWeb3Info,
      handleWasm
    })
    return cleanup // 清理事件监听器
  }, [account]) // 添加所有相关依赖项

  return (
    <div className={css.gameContainer}>
      <iframe ref={iframeRef} src={gameUrl} />
    </div>
  )
}

export default Home
