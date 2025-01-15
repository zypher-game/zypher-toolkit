import { motion, preStaticUrl, SvgComponent, useIsW768 } from '@ui/src'
import React, { memo } from 'react'

import ActiveComp from '../../components/ActiveComp/ActiveComp'
import Audited from '../../components/Audited/Audited'
import { useSign } from '../../hooks/activeHooks'
import { useBind } from '../../hooks/bindHooks'
import { useActiveData } from '../../hooks/useActiveData'
import { useActiveRouterV2 } from '../../hooks/useActiveRouter'
import css from './ActiveRegister_v2.module.styl'
import Bind from './components/Bind/Bind'
import Checking from './components/Checking/Checking'
import EarthPart from './components/EarthPart/EarthPart'
import InvitationCode from './components/InvitationCode/InvitationCode'

const ActiveRegisterV2 = memo(() => {
  const isW768 = useIsW768()
  const { activeData } = useActiveData()
  const { invitationCode, checkRewardPointsLoading } = activeData
  useSign()
  const { CheckPointHandle, CheckDiscordHandle, CheckTwitterHandle } = useBind()
  useActiveRouterV2()
  return (
    <ActiveComp>
      <div className={css.register}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className={css.textPart}>
          {checkRewardPointsLoading && isW768 ? (
            <></>
          ) : (
            <div className={css.textPartInner}>
              <h2>{'Treasure Ark:'}</h2>
              <h3>A Fun & Rewarding Journey</h3>
              <p className={css.textGrey}>
                In this virtual contest, participants will accumulate wealth through strategic staking, assert their dominance through competitive
                rankings, and experience the thrill of rivalry and camaraderie in collaborative team efforts. Together, they will compete for the
                ultimate title of supremacy within the Digital Kingdom.
              </p>
              <Audited />
              <div className={css.textPixelBorder}>
                <p>
                  First Phase Competition Schedule<i>Feb 6, 2025 ~ Token Emission</i>
                </p>
              </div>
              <div className={css.warn}>
                <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} className={css.tooltip_pixel_warn} />
                <div className={css.warn_fr}>
                  <p>The first phase staking assets can be withdrawn,</p>
                  <p>and the second phase re-staking opens on February 6th.</p>
                </div>
              </div>
            </div>
          )}
          <div className={css.process}>
            {!invitationCode ? (
              <InvitationCode />
            ) : checkRewardPointsLoading ? (
              <Checking />
            ) : (
              <Bind CheckPointHandle={CheckPointHandle} CheckDiscordHandle={CheckDiscordHandle} CheckTwitterHandle={CheckTwitterHandle} />
            )}
          </div>
        </motion.div>
        {checkRewardPointsLoading && isW768 ? <></> : <EarthPart />}
      </div>
    </ActiveComp>
  )
})

export default ActiveRegisterV2
