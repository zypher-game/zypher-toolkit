import { ActivePixelButtonColor, ActivePixelCard, Currency, PixelBorderCard, useActiveWeb3React } from '@ui/src'
import React, { memo } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'

import css from './Card.module.styl'
const Card = memo(() => {
  const { chainId } = useActiveWeb3React()
  return (
    <div className={css.card}>
      <div className={css.cardOne}>
        <PixelCardOne title={`Obtained by staking $${Currency[chainId]}`} />
        <PixelCard>
          <div className={css.fr_title}>
            <p>Airdrop Points</p>
            <PixelTooltip title="prompt text" />
            <p>growth coefficient</p>
            <PixelTooltip title="prompt text" />
          </div>
          <div className={css.fr_title_content}>
            <p>269,982.00</p>
            <p>10</p>
          </div>
        </PixelCard>
      </div>
      <div className={css.cardTwo}>
        <PixelCard>
          <div className={css.fr_title}>
            <p>CR Hero Mystery Box</p>
            <PixelTooltip title="prompt text" />
          </div>
          <div className={css.fr_title_content}>
            <p>1</p>
          </div>
          <ActivePixelButtonColor pixel_height={3} width="144px" height="36px" className={css.fr_btn}>
            <p>Open</p>
          </ActivePixelButtonColor>
        </PixelCard>
        <PixelCard>
          <div className={css.fr_title}>
            <p>CR Hero Mystery Box</p>
            <PixelTooltip title="prompt text" />
          </div>
          <div className={css.fr_title_content}>
            <p>1</p>
          </div>
          <ActivePixelButtonColor pixel_height={3} width="144px" height="36px" className={css.fr_btn}>
            <p>Open</p>
          </ActivePixelButtonColor>
        </PixelCard>
        <PixelCard>
          <div className={css.fr_title}>
            <p>Rewards</p>
            <PixelTooltip title="prompt text" />
          </div>
          <div className={css.fr_title_content}>
            <p>
              5,902.3463 <i>$GP</i>
            </p>
          </div>
          <ActivePixelButtonColor pixel_height={3} width="144px" height="36px" className={css.fr_btn}>
            <p>Claim</p>
          </ActivePixelButtonColor>
        </PixelCard>
      </div>
    </div>
  )
})
const PixelCardOne = memo(({ title }: { title: string }) => {
  return (
    <PixelCard>
      <h4 className={css.cardOneTitle}>{title}</h4>
      <div className={css.fr_title_content}>
        <p>
          1.9874 <i>ETH</i>
        </p>
        <p>1.67%</p>
      </div>
      <div className={css.fr_title}>
        <div className={css.fr_title_fl}>
          <p>Restaked</p>
          <PixelTooltip title="prompt text" />
        </div>
        <div className={css.fr_title_fr}>
          <p>Restaked ratio</p>
          <PixelTooltip title="prompt text" />
        </div>
      </div>
    </PixelCard>
  )
})
const PixelCard = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <PixelBorderCard className="tvl_card_one" pixel_height={7} backgroundColor="#0d1425" borderColor="#3A4254">
      {children}
    </PixelBorderCard>
  )
})
export default Card
