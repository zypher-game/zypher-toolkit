import './Banner.styl'

import { preStaticUrl, SvgComponent, useSetRecoilState } from '@ui/src'
import { ActivePixelCard } from '@ui/src'
import React, { memo, useCallback } from 'react'

import ShareLink from '@/pages/Active/components/ShareLink/ShareLink'
import { useActiveData } from '@/pages/Active/hooks/useActiveData'
import { changeNameDialogState } from '@/pages/Active/state/activeState'
import { getNicknameStr } from '@/pages/Active/utils/getNicknameStr'

import Avatar from '../../../../components/Avatar/Avatar'
import css from './Banner.module.styl'
import ShareLinkcss from './ShareLink.module.styl'
const Banner = memo(() => {
  const { activeData } = useActiveData()
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
          <p>{getNicknameStr(nickname)}</p>
          <img src={preStaticUrl + '/img/icon/pixel_edit.svg'} className={css.edit} onClick={editNicknameHandle} />
        </div>
        <ShareLink
          css={ShareLinkcss}
          pixel_styled={{
            pixel_height: 3,
            height: '36px',
            themeType: 'yellow'
          }}
          preWidth="280px"
          nextWidth="78px"
        />
      </div>
      <div className={css.bottom}>
        <ul className={css.bottom_card}>
          <LiItem title={'#' + activeData.ranking ?? ''} label={'Ranking'} iconPath={preStaticUrl + '/img/icon/pixel_ranking.svg'} />
          <LiItem title={activeData.airdropPoints} label={'Airdrop Points'} iconPath={preStaticUrl + '/img/icon/pixel_airdrop.svg'} />
        </ul>
        <p className={css.bottom_card_text}>Get more points and improve your ranking by staking more assets or inviting more friends!</p>
      </div>
    </ActivePixelCard>
  )
})
const LiItem = memo(({ title, label, iconPath }: { title: string; label: string; iconPath: string }) => {
  return (
    <li className={css.liItem}>
      <ActivePixelCard pixel_height={4} backgroundColor="#BD3E79" className="banner_liItem_card">
        <SvgComponent src={iconPath} />
        <div className={css.liItemFr}>
          <h5>{title}</h5>
          <p>{label}</p>
        </div>
      </ActivePixelCard>
    </li>
  )
})
export default Banner
