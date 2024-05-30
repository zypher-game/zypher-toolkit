import { IsMdProvider, IsW1100Provider, IsW1220Provider, NavKey } from '@ui/src'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import { useConnectWallet } from '@/hooks/useConnectWallet'
import { airdropPathname, getAirdropPathname, preAirdropPathname, tvlPath } from '@/pages/Active/hooks/activeHooks'
import ActiveRegister from '@/pages/Active/views/ActiveRegister/ActiveRegister'
import { ThemeProvider } from '@/theme'

import Layout from '../components/Layout'
import { useInit } from '../hooks/useInit'
import { useToastMessage } from '../hooks/useToastMessage'
import { usePollPrice } from '../store/price/hooks'

const ZeroGas = lazy(() => import('@/pages/ZeroGas/ZeroGas'))

const ActiveChooseHunter = lazy(() => import('@/pages/Active/views/ActiveChooseHunter/ActiveChooseHunter'))
const MoreActive = lazy(() => import('@/pages/Active/views/ActiveGetAirdrop/MoreActive/MoreActive'))
const MoreActiveNormal = lazy(() => import('@/pages/Active/views/ActiveGetAirdrop/MoreActiveNormal/MoreActiveNormal'))
const MoreActiveSuccess = lazy(() => import('@/pages/Active/views/ActiveGetAirdrop/MoreActiveSuccess/MoreActiveSuccess'))
const NoActive = lazy(() => import('@/pages/Active/views/ActiveGetAirdrop/NoActive/NoActive'))
const NormalActive = lazy(() => import('@/pages/Active/views/ActiveGetAirdrop/NormalActive/NormalActive'))
const ActiveLoading = lazy(() => import('@/pages/Active/views/ActiveLoading/ActiveLoading'))
// const ActiveComing = lazy(()=>import('@/pages/Active/views/ActiveRegister/ActiveComing'))
const ActiveStaking = lazy(() => import('@/pages/Active/views/ActiveStaking/ActiveStaking'))
const ActiveTVLLeaderboard = lazy(() => import('@/pages/Active/views/ActiveTVLHome/view/ActiveTVLLeaderboard/ActiveTVLLeaderboard'))
const ActiveTVLStakingV2 = lazy(() => import('@/pages/Active/views/ActiveTVLHome/view/ActiveTVLStaking/ActiveTVLStaking'))
const ActiveTVLTeam = lazy(() => import('@/pages/Active/views/ActiveTVLHome/view/ActiveTVLTeam/ActiveTVLTeam'))
const GameIndex = lazy(() => import('@/pages/GamesIndex/view/GamesIndex/GamesIndex'))

export default (): JSX.Element => {
  useInit()
  const { toastContainerRef } = useToastMessage()
  useConnectWallet()
  usePollPrice()
  return (
    <Suspense fallback={null}>
      <IsW1220Provider>
        <IsW1100Provider>
          <IsMdProvider>
            <ThemeProvider>
              <Layout>
                <ScrollToTop>
                  <>
                    <Routes>
                      {/* <Route path={`/${NavKey[0][0]}`} element={<ActiveRegister />} /> */}
                      <Route path={`/${NavKey[0][1]}/${NavKey[0][2]}`} element={<ActiveLoading />} />
                      <Route path={`/${preAirdropPathname}/${airdropPathname.register}`} element={<ActiveRegister />} />
                      <Route
                        path={`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.MoreActive}`}
                        element={<MoreActive />}
                      />
                      <Route
                        path={`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.MoreActiveNormal}`}
                        element={<MoreActiveNormal />}
                      />
                      <Route
                        path={`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.MoreActiveSuccess}`}
                        element={<MoreActiveSuccess />}
                      />
                      <Route
                        path={`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.NormalActive}`}
                        element={<NormalActive />}
                      />
                      <Route path={`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.NoActive}`} element={<NoActive />} />
                      <Route path={`/${preAirdropPathname}/${airdropPathname.staking}`} element={<ActiveStaking />} />
                      <Route path={`/${preAirdropPathname}/${airdropPathname.chooseHunter}`} element={<ActiveChooseHunter />} />
                      <Route path={tvlPath[0]} element={<ActiveTVLTeam />} />
                      <Route path={tvlPath[1]} element={<ActiveTVLStakingV2 />} />
                      <Route path={tvlPath[2]} element={<ActiveTVLLeaderboard />} />

                      <Route path={`/${NavKey[2][0]}`} element={<ZeroGas />} />
                      <Route path={`/${NavKey[1][0]}`} element={<GameIndex />} />
                      {/* <Route path="/defense" element={<Monster />} /> */}
                      {/* <Route path="/invitation" element={<Invitation />} /> */}
                      {/* <Route path="/gbBox" element={<GBBox />} /> */}
                      {/* <Route path="/ranking" element={<Ranking />} /> */}
                      {/* <Route path="/dp" element={<DP />} />*/}
                      {/* <Route path="/games/list" element={<GamesList />} /> */}
                      {/* 404页面 */}
                      {/* <Route path="/:code" element={<ActiveRegister />} /> */}
                      <Route path="*" element={<ActiveRegister />} />
                    </Routes>
                  </>
                </ScrollToTop>
              </Layout>
            </ThemeProvider>
          </IsMdProvider>
        </IsW1100Provider>
      </IsW1220Provider>
      <div className="toast__" ref={ref => (toastContainerRef.current = ref)} />
    </Suspense>
  )
}
