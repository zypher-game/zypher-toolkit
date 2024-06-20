import { PixelBorderCard, useIsW768 } from '@ui/src'
import React, { memo } from 'react'

import ActiveComp from '../../components/ActiveComp/ActiveComp'
import { useSign } from '../../hooks/activeHooks'
import { useBind } from '../../hooks/bindHooks'
import { useActiveData } from '../../hooks/useActiveData'
import css from './ActiveRegister.module.styl'
import Bind from './components/Bind/Bind'
import Checking from './components/Checking/Checking'
import EarthPart from './components/EarthPart/EarthPart'
import InvitationCode from './components/InvitationCode/InvitationCode'

const ActiveRegister = memo(() => {
  const isW768 = useIsW768()
  const { activeData } = useActiveData()
  const { invitationCode, checkAirdropPointsLoading } = activeData
  useSign()
  const { CheckPointHandle, CheckDiscordHandle, CheckTwitterHandle } = useBind()
  console.log({ activeData })
  return (
    <ActiveComp>
      <div className={css.register}>
        <div className={css.textPart}>
          {checkAirdropPointsLoading && isW768 ? (
            <></>
          ) : (
            <div className={css.textPartInner}>
              <h2>{"King's League:"}</h2>
              <h3>Asset Domination Tournament</h3>
              <p className={css.textGrey}>
                In this virtual contest, participants will amass wealth through strategic staking, assert their dominance via competitive rankings,
                and partake in the joy of both rivalry and camaraderie within team collaborations. Together, they vie for the ultimate crown of
                supremacy within the Digital Kingdom.
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
                  This round of Competition dates<i>April 20, 2024 ~ July 20, 2024</i>
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
        </div>
        {checkAirdropPointsLoading && isW768 ? <></> : <EarthPart />}
      </div>
    </ActiveComp>
  )
})

export default ActiveRegister
