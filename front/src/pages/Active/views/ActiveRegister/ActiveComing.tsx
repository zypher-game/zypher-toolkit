import React, { memo } from 'react'

import ActiveComing from '../../components/ActiveComp/ActiveComing'
import css from './ActiveRegister.module.styl'
import EarthPart from './components/EarthPart/EarthPart'
import InvitationCode from './components/InvitationCode/InvitationCode'
const ActiveComingIndex = memo(() => {
  return (
    <ActiveComing>
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
            <p>Coming Soon</p>
          </div>
          <div className={css.process}>
            <InvitationCode isComing={true} />
          </div>
        </div>
        <EarthPart />
      </div>
    </ActiveComing>
  )
})
export default ActiveComingIndex
