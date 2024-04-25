import { useCustomTranslation } from '@UI/src/'
import { useIsMobile } from '@UI/src/'
import { LngNs } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'

import { I2048GameList } from '@/pages/Home/hooks/useRecentZ2048FromContract'

import css from '../../../bingo/tableRow/m/MobileRow.modules.stylus'
import RanderNormalText from '../../../bingo/tableRow/pc/RanderNormalText'
import NftTokenIdCol from '../nftTokenIdCol'

interface IProps {
  item: I2048GameList
  showFilter: boolean
}
const Z2048MobileRow: FC<IProps> = memo(({ showFilter, item }: IProps) => {
  const isMobile = useIsMobile()
  const { t } = useCustomTranslation([LngNs.home])

  return (
    <div className={css.mItem}>
      <div className={css.mTop}>
        <div className={css.mTable}>
          <div className={css.mTableHeader}>
            <p>{t('Tiles')}</p>
            <p>{t('2048 NFT')}</p>
            <p>{t('Win')}</p>
          </div>
          <div className={css.mTableBody}>
            <RanderNormalText label={item.maxTile} showPoint={true} isMobile={isMobile} />
            <NftTokenIdCol chainId={item.chainId} tokenId={item.tokenId} showFilter={showFilter} tokenIdLink={item.tokenIdLink} />
            <RanderNormalText label={item.reward} showPoint={true} isMobile={isMobile} />
          </div>
        </div>
      </div>
      <div className={css.mBottom}>
        <RanderNormalText label={item.player} showPoint={false} isMobile={isMobile} />
        <p className={css.grey}>{item.beginTimeStr}</p>
      </div>
    </div>
  )
}, isEqual)
export default Z2048MobileRow
