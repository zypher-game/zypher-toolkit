import { motion, PixelBorderCard, useIsW768, useRecoilValue } from '@ui/src'
import React, { memo } from 'react'

import ActiveComp from '../../components/ActiveComp/ActiveComp'
import { useSign } from '../../hooks/activeHooks'
import { useBind } from '../../hooks/bindHooks'
import { useActiveData } from '../../hooks/useActiveData'
import { useActiveRouterV2 } from '../../hooks/useActiveRouter'
import css from './ActiveRegister.module.styl'
import Bind from './components/Bind/Bind'
import Checking from './components/Checking/Checking'
import EarthPart from './components/EarthPart/EarthPart'
import InvitationCode from './components/InvitationCode/InvitationCode'

const ActiveRegister = memo(() => {
  const isW768 = useIsW768()
  const { activeData } = useActiveData()
  const { invitationCode, checkAirdropPointsLoading, id } = activeData
  useSign()
  const { CheckPointHandle, CheckDiscordHandle, CheckTwitterHandle } = useBind()
  useActiveRouterV2()
  // useEffect(() => {
  //   const link = getActiveRouterFn()
  //   if (link && link !== window.location.pathname) {
  //     // navigate(link)
  //   }
  // }, [id, location, pathname])
  return (
    <ActiveComp>
      <div className={css.register}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className={css.textPart}>
          {checkAirdropPointsLoading && isW768 ? (
            <></>
          ) : (
            <div className={css.textPartInner}>
              <h2>{"King's League:"}</h2>
              <h3>Asset Domination Tournament</h3>
              <p className={css.textGrey}>
                In this virtual contest, participants will accumulate wealth through strategic staking, assert their dominance through competitive
                rankings, and experience the thrill of rivalry and camaraderie in collaborative team efforts. Together, they will compete for the
                ultimate title of supremacy within the Digital Kingdom.
              </p>
              <PixelBorderCard
                // width='305px'
                // height=''
                className={css.textPixelBorder}
                pixel_height={4}
                backgroundColor="#161E2E"
                borderColor="#3A4254"
              >
                <p>
                  Current Competition Schedule<i>Oct. 17, 2024 ~ Jan. 16, 2025</i>
                </p>
              </PixelBorderCard>
            </div>
          )}
          <div className={css.process}>
            {!invitationCode ? (
              <InvitationCode />
            ) : checkAirdropPointsLoading ? (
              <Checking />
            ) : (
              <Bind CheckPointHandle={CheckPointHandle} CheckDiscordHandle={CheckDiscordHandle} CheckTwitterHandle={CheckTwitterHandle} />
            )}
          </div>
        </motion.div>
        {checkAirdropPointsLoading && isW768 ? <></> : <EarthPart />}
      </div>
    </ActiveComp>
  )
})

export default ActiveRegister
