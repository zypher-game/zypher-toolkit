import { useWalletHandler } from '@ui/src'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useConnectWallet } from '@/hooks/useConnectWallet'
import { useToastMessage } from '@/hooks/useToastMessage'
import { ThemeProvider } from '@/theme'

import { useInit } from '../hooks/useInit'

const HomeIndex = lazy(() => import('@/pages/Home/home'))

export default (): JSX.Element => {
  const { toastContainerRef } = useToastMessage()
  useConnectWallet()
  useWalletHandler()
  useInit()
  return (
    <Suspense fallback={null}>
      <ThemeProvider>
        <Routes>
          <Route path="*" element={<HomeIndex />} />
        </Routes>
      </ThemeProvider>
      <div className="toast__" ref={ref => (toastContainerRef.current = ref)} />
    </Suspense>
  )
}
