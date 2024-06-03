import { DialogClose, ITvlHero, PixelCube5, preStaticUrl, SvgComponent, useActiveWeb3React, useIsW768, useSetRecoilState } from '@ui/src'
import { ActivePixelButtonColor, PixelBorderCard } from '@ui/src'
import React, { memo, useCallback, useMemo } from 'react'

import HeroImageLoader from '@/pages/Active/components/ImageLoader/HeroImageLoader'
import { ITeamMember } from '@/pages/Active/hooks/useTeam'
import { useTvlStakingDialogState } from '@/pages/Active/hooks/useTvlStakingDialogState'
import { tvlStakingDialogState } from '@/pages/Active/state/activeState'
import { getHeroLevel } from '@/pages/Active/utils/getHeroLevel'

import css from './TeamWarn.module.styl'
const TeamWarn = memo(
  ({
    showTeamWarn,
    setShowTeamWarn,
    teamMembers
  }: {
    showTeamWarn: number
    setShowTeamWarn: React.Dispatch<React.SetStateAction<number>>
    teamMembers: ITeamMember[]
  }) => {
    const isW768 = useIsW768()

    const setTvlStakingDialog = useTvlStakingDialogState()

    const { chainId } = useActiveWeb3React()
    const showTeamWarnHandle = useCallback(() => {
      if (showTeamWarn === 1) {
        setShowTeamWarn(2)
      } else if (showTeamWarn === 2) {
        setShowTeamWarn(0)
      }
    }, [showTeamWarn])
    const handleCancel = useCallback(() => {
      setShowTeamWarn(0)
    }, [])
    const stakingHandle = useCallback(() => {
      setTvlStakingDialog(chainId, true)
    }, [chainId])
    const { title, content, img, btn, imgClassName } = useMemo(() => {
      if (showTeamWarn === 1) {
        return {
          title: 'Invitation reward rules',
          content: [
            "You'll earn points when your invites earn points, and when their invites earn points. You'll earn +20% bonus points, and when their invitations earn points, you'll earn +10% bonus points.",
            '',
            'Invite big players -> Earn more points and move up the leaderboard.'
          ],
          img: preStaticUrl + '/img/tvl/my_team_warn_01.png',
          imgClassName: 'tvl_team_bg_01',
          btn: (
            <>
              <p>Next page</p>
              <SvgComponent src={preStaticUrl + '/img/icon/pixel_arrow_right.svg'} />
            </>
          )
        }
      }
      return {
        title: 'Team goal reward rules',
        content: [
          'Your direct invitation will form your group. When your group deposits a total of 1 Ethereum, you will receive an additional point card reward and an additional invitation.',
          'The more you deposit, the higher the points rewards you may receive.',
          'There are 5 set goals: 1ETH, 2ETH, 3ETH, 4ETH, 5ETH（including stETH, etc.)'
        ],
        img: preStaticUrl + '/img/tvl/my_team_warn_02.png',
        imgClassName: 'tvl_team_bg_02',
        btn: (
          <>
            <p>Close</p>
          </>
        )
      }
    }, [showTeamWarn])
    if (showTeamWarn === 0) {
      return (
        <div className={css.team_hero}>
          <PixelCube5 className={css.team_hero_middle} pixel_height={2} borderColor="#fff" backgroundColor="#000" onClick={stakingHandle}>
            <ActivePixelButtonColor themeType="yellow" pixel_height={4} className={css.team_hero_middle_in}>
              <p>Staking more to update your hunter!</p>
            </ActivePixelButtonColor>
          </PixelCube5>
          <div className={css.show_team_hero}>
            {teamMembers.map((v, index) => (
              <HeroImageLoader
                key={index}
                className={css.hero_big}
                heroKey={v.role as unknown as ITvlHero}
                level={getHeroLevel({ stake: v.staking, chainId: chainId })}
              />
            ))}
          </div>
          <img src={`${preStaticUrl}/img/tvl/${isW768 ? 'tvl_team_bg_m' : 'tvl_team_bg'}.png`} alt="tvl_team_bg" className={css.tvl_team_bg} />
        </div>
      )
    }
    if (showTeamWarn === 1 || showTeamWarn === 2) {
      return (
        <PixelBorderCard className={css.teamWarn_card} pixel_height={7} backgroundColor="#1D263B" borderColor="#3A4254">
          <h3 className={css.title}>{title}</h3>
          {content.map((v, index) => (
            <p key={index} className={css.grey}>
              {v}
            </p>
          ))}
          <img src={img} alt={title} className={css[imgClassName]} />
          <ActivePixelButtonColor
            themeType="brightBlue"
            className={css.btn}
            pixel_height={3}
            width="144px"
            height="36px"
            onClick={showTeamWarnHandle}
          >
            {btn}
          </ActivePixelButtonColor>
          <DialogClose onClick={handleCancel} />
        </PixelBorderCard>
      )
    }

    return <></>
  }
)
export default TeamWarn