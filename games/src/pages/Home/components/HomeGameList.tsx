import { blankLinkList, DivWrap, LinkList, LngNs, preStaticUrl, useActiveWeb3React, useCustomTranslation, useIsMd } from '@ui/src'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo } from 'react'

import css from './HomeGameList.module.stylus'
import { HomeListItem, HomeTitle } from './widget'

const HomeGameList = memo(() => {
  const { t } = useCustomTranslation([LngNs.home])
  const isMd = useIsMd()
  const { chainId } = useActiveWeb3React()
  const imgList = useMemo(() => {
    let _imgList = ['game_2048.jpg', 'game_candy02.jpg', 'game_bingo.jpg', 'game_ace02.jpg', 'game_tcg.jpg', 'game_mahjong.jpg', 'game_muder.jpg']

    if (isMd) {
      const _mImgList = ['game_bingo.jpg', 'game_2048.jpg', 'game_ace.jpg', 'game_candy.jpg', 'game_tcg.jpg', 'game_mahjong.jpg', 'game_muder.jpg']
      _imgList = _mImgList.map(_img => {
        const lastDotIndex = _img.lastIndexOf('.')
        const pre = _img.slice(0, lastDotIndex)
        return pre + '_m' + _img.slice(lastDotIndex)
      })
    }
    return _imgList.map((v, index) => {
      let _index = index
      if (!isMd) {
        if (index === 0) {
          _index = 1
        }
        if (index === 1) {
          _index = 3
        }
        if (index === 2) {
          _index = 0
        }
        if (index === 3) {
          _index = 2
        }
      }
      return (
        <div key={v} className={css.listItem}>
          <img
            decoding="async"
            loading="lazy"
            src={preStaticUrl + '/img/home/' + v}
            style={{ cursor: LinkList[_index] !== '' ? 'pointer' : 'auto' }}
            onClick={() =>
              onclikHandle({
                blank: blankLinkList[_index],
                linkUrl: LinkList[_index]
              })
            }
          />
        </div>
      )
    })
  }, [isMd])
  const onclikHandle = useCallback(
    ({ blank, linkUrl }: { blank: boolean; linkUrl: string }) => {
      if (linkUrl === '') {
        return
      }
      if (chainId && linkUrl.indexOf('/bingo/') > -1) {
        return window.open(`${linkUrl}${chainId}/`, '_blank')
      }
      return window.open(linkUrl, '_blank')
    },
    [chainId]
  )
  const MBing = useMemo(() => {
    if (isMd) {
      return (
        <div
          className={classnames(css.bing, css.listItem)}
          style={{ cursor: 'pointer' }}
          onClick={() =>
            onclikHandle({
              blank: blankLinkList[0],
              linkUrl: LinkList[0]
            })
          }
        >
          <img decoding="async" loading="lazy" src={preStaticUrl + '/img/home/game_bingo_bg.jpg'} className={css.bingoBg} />
          <img decoding="async" loading="lazy" src={preStaticUrl + '/img/home/game_bingo_01.png'} className={css.bingo01} />
          <img decoding="async" loading="lazy" src={preStaticUrl + '/img/home/game_bingo_02.png'} className={css.bingo02} />
        </div>
      )
    }
    if (!imgList) {
      return
    }
    return imgList[0]
  }, [imgList, isMd])
  if (!imgList) {
    return null
  }
  return (
    <HomeListItem>
      <HomeTitle label={t('Games')} label_icon="games.svg" />
      <div className={classnames(css.list, css.top)}>
        {MBing}
        <DivWrap showDiv={isMd} className={css.img}>
          {imgList[1]}
          {imgList[2]}
        </DivWrap>
      </div>
      <div className={classnames(css.list, css.bottom)}>
        {imgList[3]}
        {imgList[4]}
        {isMd ? null : (
          <>
            {imgList[5]}
            {imgList[6]}
          </>
        )}
      </div>
      {isMd ? (
        <div className={classnames(css.list, css.bottom)}>
          {imgList[5]}
          {imgList[6]}
        </div>
      ) : null}
    </HomeListItem>
  )
}, isEqual)

export default HomeGameList
