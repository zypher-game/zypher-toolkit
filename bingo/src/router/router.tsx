import { useGetInvitationAddress } from '@ui/src'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import { useAudio } from '@/hooks/useAudioManager'
import { useInitRainbowFn } from '@/hooks/useInitRainbowFn'
import { useToastMessage } from '@/hooks/useToastMessage'
import Bingo from '@/pages/'
import GameRoom from '@/pages/GameRoom'
import StartGame from '@/pages/StartGame/StartGame'
import { BASE_URL } from '@/utils/config'

import Layout from '../components/Layout'
import { useConnectWallet } from '../hooks/useConnectWallet'
import { useInit } from '../hooks/useInit'
import { usePollPrice } from '../store/price/hooks'

export default (): JSX.Element => {
  useInitRainbowFn()
  useInit()
  useGetInvitationAddress()
  useToastMessage()
  useConnectWallet()
  usePollPrice()
  useAudio()
  return (
    <Suspense fallback={null}>
      <Layout>
        <ScrollToTop>
          <Routes>
            <Route path={`/${BASE_URL}/:chainIdParams/`} element={<Bingo />} />
            <Route path={`/${BASE_URL}/:chainIdParams/play`} element={<StartGame />} />
            <Route path={`/${BASE_URL}/:chainIdParams/play/:id/gameRoom`} element={<GameRoom />} />
            {/* 404页面 */}
            <Route path="*" element={<Bingo />} />
          </Routes>
        </ScrollToTop>
      </Layout>
    </Suspense>
  )
}
