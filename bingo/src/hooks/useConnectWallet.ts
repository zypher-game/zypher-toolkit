import { useConnectModal, useRecoilValue, walletModalOpenState } from '@zypher-game/toolkit/ui'
import { useEffect, useState } from 'react'

export const useConnectWallet = () => {
  const dialogOpen = useRecoilValue(walletModalOpenState)
  const { openConnectModal } = useConnectModal()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true) // 组件挂载时将标志位设置为 true
    // 返回清理函数，在组件卸载时执行
    return () => {
      setIsMounted(false) // 组件卸载时将标志位设置为 false
    }
  }, [])

  useEffect(() => {
    if (isMounted && dialogOpen && openConnectModal) {
      openConnectModal()
    }
  }, [isMounted, dialogOpen, openConnectModal])
}
