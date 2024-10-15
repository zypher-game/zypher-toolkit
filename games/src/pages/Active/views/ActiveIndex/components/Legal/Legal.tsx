import React, { memo } from 'react'

import { legalPath } from '../../config/config'
import css from './Legal.module.styl'
const Legal = memo(() => {
  return (
    <div className={css.legal}>
      <img src={legalPath + '/bg.jpg'} className={css.bg} />
      <div className={css.inner}>
        <img src={legalPath + '/Title.png'} className={css.title} />
        <img src={legalPath + '/line.png'} className={css.line1} />
        <div className={css.text}>
          <p>
            {
              'The Treasure Ark campaign, including all associated events, rewards, and promotions, is subject to change at the discretion of Zypher Network without prior notice. All rewards, including $GP, airdrop points, SBTs, and other game-related benefits, are distributed based on the terms and conditions specified within the campaign and are not guaranteed. Participation in the campaign does not constitute a guarantee of financial return, and participants should be aware of the inherent risks involved in staking and cryptocurrency-based activities.'
            }
          </p>
          <p>
            {
              'Zypher Network reserves all rights regarding the modification, suspension, or termination of the campaign. Any actions, including staking, participation in games, or claiming rewards, are performed at the participant’s own risk. Zypher Network is not liable for any financial losses, technical issues, or disruptions arising from participation in the campaign.'
            }
          </p>
          <p>
            {
              'By participating in the Treasure Ark campaign, you agree to comply with the terms and conditions set forth by Zypher Network and acknowledge that all decisions regarding rewards, eligibility, and participation are final.'
            }
          </p>
        </div>
        <img src={legalPath + '/line.png'} className={css.line2} />
      </div>
    </div>
  )
})
export default Legal
