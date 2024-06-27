import { PixelTable, useCustomTranslation } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { LngNs } from '@ui/src'
import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'

import { I2048GameList } from '@/pages/GamesIndex/hook/useRecentZ2048FromContract'

import css from '../../../bingo/tableRow/m/MobileRow.modules.stylus'
import RenderNormalText from '../../../bingo/tableRow/pc/RenderNormalText'
import NftTokenIdCol from '../nftTokenIdCol'

interface IProps {
  item: I2048GameList
  showFilter: boolean
}
const Z2048MobileRow: FC<IProps> = memo(({ showFilter, item }: IProps) => {
  const isMobile = useIsW768()
  const { t } = useCustomTranslation([LngNs.home])

  return (
    <PixelTable
      className={css.mItem}
      pixel_height={4}
      backgroundColor="#161E2E"
      borderColor="#3A4254"
      headerBackgroundColor="#293457"
      classNameHeader={`${css.header} row_header`}
      header_children={
        <div className={css.mTop}>
          <div className={css.mTable}>
            <div className={css.mTableHeader}>
              <p>{t('Tiles')}</p>
              <p>{t('2048 NFT')}</p>
              <p>{t('Win')}</p>
            </div>
            <div className={css.mTableBody}>
              <RenderNormalText label={item.maxTile} showPoint={true} isMobile={isMobile} chainId={item.chainId} />
              <NftTokenIdCol chainId={item.chainId} tokenId={item.tokenId} showFilter={showFilter} tokenIdLink={item.tokenIdLink} />
              <RenderNormalText label={item.reward} showPoint={true} isMobile={isMobile} chainId={item.chainId} />
            </div>
          </div>
        </div>
      }
      body_children={
        <div className={css.mBottom}>
          <RenderNormalText label={item.player} showPoint={false} isMobile={isMobile} chainId={item.chainId} />
          <p className={css.grey}>{item.beginTimeStr}</p>
        </div>
      }
    />
  )
}, isEqual)
export default Z2048MobileRow
