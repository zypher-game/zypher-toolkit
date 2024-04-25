import './Banner.styl'

import { preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@UI/src/'
import React, { memo, useCallback } from 'react'

import { ActivePixelCard } from '@UI/src/'
import ShareLink from '@/pages/Active/components/ShareLink/ShareLink'
import { activeDataState, changeNameDialogState } from '@/pages/Active/state/activeState'

import Avatar from '../../../../components/Avatar/Avatar'
import css from './Banner.module.styl'
import ShareLinkcss from './ShareLink.module.styl'
const Banner = memo(() => {
  const activeData = useRecoilValue(activeDataState)
  const { avatar, nickname } = activeData
  const setIsModalOpen = useSetRecoilState(changeNameDialogState)
  const editNicknameHandle = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  return (
    <ActivePixelCard pixel_height={4} backgroundColor="#FF5EAA" className="active_tvl_banner">
      <div className={css.top}>
        <div className={css.top_fl}>
          <Avatar src={avatar} nickname={nickname} width="48px" />
          <p>{nickname}</p>
          <img src={preStaticUrl + '/img/icon/pixel_edit.svg'} className={css.edit} onClick={editNicknameHandle} />
        </div>
        <ShareLink
          css={ShareLinkcss}
          pixel_styled={{
            pixel_height: 3,
            small_pixel_height: 3,
            borderBottomColor: '#D99716',
            borderTopColor: '#FFE99A',
            backgroundColor: '#FFD02B',
            height: '36px'
          }}
          preWidth="280px"
          nextWidth="78px"
        />
      </div>
      <div className={css.bottom}>
        <ul className={css.bottom_card}>
          <LiItem title={'#23456'} label={'Ranking'} iconPath={preStaticUrl + '/img/icon/pixel_ranking.svg'} backgroundColor={'#FF7A00'} />
          <LiItem title={'1,234'} label={'Airdrop Points'} iconPath={preStaticUrl + '/img/icon/pixel_airdrop.svg'} backgroundColor={'#2A59FF'} />
        </ul>
        <p className={css.bottom_card_text}>Get more points and improve your ranking by restaking more assets or inviting more friends!</p>
      </div>
    </ActivePixelCard>
  )
})
const LiItem = memo(({ title, label, iconPath, backgroundColor }: { title: string; label: string; iconPath: string; backgroundColor: string }) => {
  return (
    <li className={css.liItem}>
      <ActivePixelCard pixel_height={4} backgroundColor="#9F3365" className="banner_liItem_card">
        <ActivePixelCard className="banner_liItem_card_icon" pixel_height={2} width="36px" height="36px" backgroundColor={backgroundColor}>
          <SvgComponent src={iconPath} />
        </ActivePixelCard>

        <div className={css.liItemFr}>
          <h5>{title}</h5>
          <p>{label}</p>
        </div>
      </ActivePixelCard>
    </li>
  )
})
export default Banner
