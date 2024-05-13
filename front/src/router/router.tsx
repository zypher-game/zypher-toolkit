import { IsMd1100Provider, IsMd1220Provider, IsMdProvider } from '@ui/src'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { NavKey } from '@/components/Layout/Navigation'
import ScrollToTop from '@/components/ScrollToTop'
import { airdropPathname, getAirdropPathname, preAirdropPathname, tvlPath } from '@/pages/Active/hooks/activeHooks'
import ActiveChooseHunter from '@/pages/Active/views/ActiveChooseHunter/ActiveChooseHunter'
import MoreActive from '@/pages/Active/views/ActiveGetAirdrop/MoreActive/MoreActive'
import MoreActiveNormal from '@/pages/Active/views/ActiveGetAirdrop/MoreActiveNormal/MoreActiveNormal'
import MoreActiveSuccess from '@/pages/Active/views/ActiveGetAirdrop/MoreActiveSuccess/MoreActiveSuccess'
import NoActive from '@/pages/Active/views/ActiveGetAirdrop/NoActive/NoActive'
import NormalActive from '@/pages/Active/views/ActiveGetAirdrop/NormalActive/NormalActive'
// import ActiveComing from '@/pages/Active/views/ActiveRegister/ActiveComing'
import ActiveRegister from '@/pages/Active/views/ActiveRegister/ActiveRegister'
import ActiveStaking from '@/pages/Active/views/ActiveStaking/ActiveStaking'
import ActiveTVLLeaderboard from '@/pages/Active/views/ActiveTVLHome/view/ActiveTVLLeaderboard/ActiveTVLLeaderboard'
import ActiveTVLStakingV2 from '@/pages/Active/views/ActiveTVLHome/view/ActiveTVLStaking/ActiveTVLStakingV2'
import ActiveTVLTeam from '@/pages/Active/views/ActiveTVLHome/view/ActiveTVLTeam/ActiveTVLTeam'
import GameIndex from '@/pages/GamesIndex/view/GamesIndex/GamesIndex'
// import Bingo from '@/pages/Bingo'
// import DP from '@/pages/DP'
import GamesList from '@/pages/GamesList'
// import Invitation from '@/pages/invitation'
// import Monster from '@/pages/Monster'
// import NotFound from '@/pages/NotFound'
import { ThemeProvider } from '@/theme'

// import Ranking from '@/pages/Ranking'
import Layout from '../components/Layout'
// import ProfileBox from '@/pages/Profile/profileBox'
// import GBBox from '@/pages/GBBox'
import { useConnectWallet } from '../hooks/useConnectWallet'
import { useInit } from '../hooks/useInit'
import { useToastMessage } from '../hooks/useToastMessage'
// import { useGetInvitationAddress } from '../pages/invitation/hooks/invitationHooks'
import { usePollPrice } from '../store/price/hooks'

// const Home = lazy(() => import('@/pages/Home'))
// const Monster = lazy(() => import('@/pages/Monster'))
// const NotFound = lazy(() => import('@/pages/NotFound'))
// const Ranking = lazy(() => import('@/pages/Ranking'))
// const GamesList = lazy(() => import('@/pages/GamesList'))
// // const Invitation = lazy(() => import('@/pages/invitation'))
// const Bingo = lazy(() => import('@/pages/Bingo'))
// const StartGame = lazy(() => import('@/pages/Bingo/zBingoPage/StartGame'))
// const GameRoom = lazy(() => import('@/pages/Bingo/zBingoPage/GameRoom'))

export default (): JSX.Element => {
  useInit()
  // useGetInvitationAddress()
  const { toastContainerRef } = useToastMessage()
  useConnectWallet()
  usePollPrice()
  return (
    <Suspense fallback={null}>
      <IsMd1220Provider>
        <IsMd1100Provider>
          <IsMdProvider>
            <ThemeProvider>
              <Layout>
                <ScrollToTop>
                  <>
                    <Routes>
                      <Route path={`/${NavKey[0][0]}`} element={<ActiveRegister />} />
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
                      <Route path={`/${NavKey[1][0]}`} element={<GameIndex />} />
                      {/* <Route path="/defense" element={<Monster />} /> */}
                      {/* <Route path="/invitation" element={<Invitation />} /> */}
                      {/* <Route path="/gbBox" element={<GBBox />} /> */}
                      {/* <Route path="/ranking" element={<Ranking />} /> */}
                      {/* <Route path="/dp" element={<DP />} />*/}
                      <Route path="/games/list" element={<GamesList />} />
                      {/* 404页面 */}
                      <Route path="*" element={<GamesList />} />
                    </Routes>
                  </>
                </ScrollToTop>
              </Layout>
            </ThemeProvider>
          </IsMdProvider>
        </IsMd1100Provider>
      </IsMd1220Provider>
      <div className="toast__" ref={ref => (toastContainerRef.current = ref)} />
    </Suspense>
  )
}
