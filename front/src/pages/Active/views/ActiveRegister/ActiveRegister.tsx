import { useRecoilValue } from '@UI/src/'
import React, { memo } from 'react'

import ActiveComp from '../../components/ActiveComp/ActiveComp'
import { useSign } from '../../hooks/activeHooks'
import { useBind } from '../../hooks/bindHooks'
import { activeDataState, IActiveData } from '../../state/activeState'
import css from './ActiveRegister.module.styl'
import Bind from './components/Bind/Bind'
import Checking from './components/Checking/Checking'
import EarthPart from './components/EarthPart/EarthPart'
import InvitationCode from './components/InvitationCode/InvitationCode'

const ActiveRegister = memo(() => {
  const activeData = useRecoilValue<IActiveData>(activeDataState)
  const { invitationCode, checkAirdropPointsLoading } = activeData
  useSign()
  const { CheckPointHandle, CheckDiscordHandle, CheckTwitterHandle } = useBind()
  return (
    <ActiveComp>
      <div className={css.register}>
        <div className={css.textPart}>
          <div className={css.textPartInner}>
            <h2>{"King's League:"}</h2>
            <h3>Asset Domination Tournament</h3>
            <p>
              In this virtual contest, participants will amass wealth through strategic staking, assert their dominance via competitive rankings, and
              partake in the joy of both rivalry and camaraderie within team collaborations. Together, they vie for the ultimate crown of supremacy
              within the Digital Kingdom.
            </p>
            <p>This round of competition time: April 20, 2024 ~ July 20, 2024</p>
          </div>
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
        <EarthPart />
      </div>
    </ActiveComp>
  )
})

export default ActiveRegister