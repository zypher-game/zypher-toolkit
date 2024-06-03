import './Banner.styl'

import { preStaticUrl, refreshAvatarState, SvgComponent, useIsW768, useRecoilValue, useSetRecoilState } from '@ui/src'
import { ActivePixelCard } from '@ui/src'
import React, { memo, useCallback } from 'react'

import PixelTooltip from '@/pages/Active/components/PixelTooltip/PixelTooltip'
import ShareLink from '@/pages/Active/components/ShareLink/ShareLink'
import { useActiveData } from '@/pages/Active/hooks/useActiveData'
import { changeNameDialogState } from '@/pages/Active/state/activeState'
import { getNicknameStr } from '@/pages/Active/utils/getNicknameStr'

import Avatar from '../../../../components/Avatar/Avatar'
import PointText from '../PointText/PointText'
import css from './Banner.module.styl'
import ShareLinkcss from './ShareLink.module.styl'
const Banner = memo(() => {
  const refreshAvatar = useRecoilValue(refreshAvatarState)
  const { activeData } = useActiveData()
  const { avatar, nickname } = activeData
  const isW768 = useIsW768()
  const setIsModalOpen = useSetRecoilState(changeNameDialogState)
  const editNicknameHandle = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  return (
    <ActivePixelCard pixel_height={4} backgroundColor="#FF5EAA" className="active_tvl_banner">
      <div className={css.top}>
        <div className={css.top_fl}>
          <Avatar src={avatar + '?' + refreshAvatar} nickname={nickname} width="48px" />
          <p>{getNicknameStr(nickname)}</p>
          <img src={preStaticUrl + '/img/icon/pixel_edit.svg'} className={css.edit} onClick={editNicknameHandle} />
        </div>
        <ShareLink
          css={ShareLinkcss}
          pixel_styled={{
            pixel_height: 3,
            height: isW768 ? '54px' : '36px',
            themeType: 'yellow'
          }}
          preWidth={isW768 ? '79%' : '280px'}
          nextWidth={isW768 ? '20%' : '78px'}
        />
      </div>
      <div className={css.bottom}>
        <img src={preStaticUrl + '/img/tvl/box.png'} className={css.box} />
        <ul className={css.bottom_card}>
          <LiItem title={'#' + activeData.rankingStr ?? ''} label={'Ranking'} iconPath={preStaticUrl + '/img/icon/pixel_ranking.svg'} />
          <LiItem
            title={activeData.airdropPointsStr}
            label={'Airdrop Points'}
            warnText={[
              'Here is the total airdrop points, including:',
              '1. Initial airdrop points;',
              '2. Airdrop points obtained by staking;',
              '3. Take a commission from the airdrop points obtained by inviting friends;',
              '4. Airdrop point rewards for completing group goals'
            ]}
            iconPath={preStaticUrl + '/img/icon/pixel_airdrop.svg'}
          />
        </ul>
        {isW768 ? <PointText className={css.bottom_card_text} /> : null}
      </div>
    </ActivePixelCard>
  )
})
const LiItem = memo(({ title, label, iconPath, warnText }: { title: string; label: string; iconPath: string; warnText?: string[] }) => {
  return (
    <li className={css.liItem}>
      <ActivePixelCard pixel_height={4} backgroundColor="#9A3262" className="banner_liItem_card">
        <SvgComponent src={iconPath} />
        <div className={css.liItemFr}>
          <h5>{title}</h5>
          <p>
            {label}
            {warnText ? <PixelTooltip title={warnText} /> : null}
          </p>
        </div>
      </ActivePixelCard>
    </li>
  )
})
export default Banner