import {
  bingoBetaSupportedChainId,
  bingoV1SupportedChainId,
  ChainId,
  getShortenAddress,
  IGameList,
  IGameStatus,
  LngNs,
  preStaticUrl,
  useCustomTranslation,
  useIsW768
} from '@ui/src'
import { Carousel } from 'antd'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { IGameListBeta } from '@/hooks/useRecentGames'

const CarouselText = styled.div<{ isMobile: boolean }>`
  font-size: ${({ isMobile }) => (isMobile ? '12px' : '16px')};
  color: #fff0cf;

  height: ${({ isMobile }) => (isMobile ? '30px' : '50px')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  img {
    width: ${({ isMobile }) => (isMobile ? '24px' : '')};
  }
`
const CarouselContent = styled.div<{ isMobile: boolean }>`
  max-width: ${({ isMobile }) => (isMobile ? '260px' : '663px')};
  margin: 0 auto;
`
const CarouselWrap = styled.div`
  position: relative;
  background: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0) 0.03%,
    rgba(0, 0, 0, 0.15) 19.08%,
    rgba(0, 0, 0, 0.25) 31.77%,
    rgba(0, 0, 0, 0.31) 46.15%,
    rgba(0, 0, 0, 0.25) 60.54%,
    rgba(0, 0, 0, 0.17) 77.68%,
    rgba(0, 0, 0, 0) 98.97%
  );
  &::before {
    content: '';
    height: 2px;
    width: 100%;
    display: block;
    left: 0;
    top: 0;
    position: absolute;
    background: linear-gradient(270deg, rgba(255, 171, 84, 0) 0.03%, rgba(216, 136, 30, 0.4) 45.42%, rgba(255, 156, 53, 0) 98.97%);
  }
  &::after {
    content: '';
    height: 2px;
    display: block;
    width: 100%;
    left: 0;
    bottom: 0;
    position: absolute;
    background: linear-gradient(269.95deg, rgba(255, 171, 84, 0) 0.03%, rgba(216, 136, 30, 0.4) 45.42%, rgba(255, 156, 53, 0) 98.97%);
  }
`
const CarouselList = memo(
  ({ bingoMapList, bingoHasError }: { bingoMapList: Map<ChainId, (IGameList | IGameListBeta)[]> | undefined; bingoHasError: boolean }) => {
    const [carouselList, setCarouselList] = useState<(IGameList | IGameListBeta)[]>([])
    const { account, chainId } = useActiveWeb3ReactForBingo()
    const { t } = useCustomTranslation([LngNs.zBingo])
    const isMobile = useIsW768()
    const featchData = useCallback(async () => {
      if (!bingoMapList) {
        return
      }
      const _chainId = [...bingoBetaSupportedChainId, ...bingoV1SupportedChainId].includes(chainId) || !chainId ? ChainId.LineaMainnet : chainId
      const list: (IGameList | IGameListBeta)[] | undefined = bingoMapList.get(_chainId)
      if (list && list.length) {
        setCarouselList(list.filter(v => v.status !== IGameStatus.Overtime))
      }
    }, [bingoMapList])
    useEffect(() => {
      featchData()
    }, [chainId, account, bingoMapList?.size])

    return carouselList && carouselList.length > 0 ? (
      <CarouselContent isMobile={isMobile} style={{ padding: '10px 0' }}>
        <CarouselWrap>
          <Carousel autoplay dots={false} dotPosition="left" adaptiveHeight>
            {carouselList.map((item, index) => (
              <CarouselContent isMobile={isMobile} key={index}>
                {item.status === 'end' && (
                  <CarouselText isMobile={isMobile}>
                    <img decoding="async" loading="lazy" src={preStaticUrl + `/img/bingo/crown.svg`} alt="" />
                    {t('game broadcast1', {
                      account: getShortenAddress(item.winner)
                    })}
                  </CarouselText>
                )}
                {item.status === 'live' && (
                  <CarouselText isMobile={isMobile}>
                    <img decoding="async" loading="lazy" src={preStaticUrl + `/img/bingo/star.svg`} alt="" />
                    {t('game broadcast2', {
                      chainId: item.roomIDStr
                    })}
                  </CarouselText>
                )}
              </CarouselContent>
            ))}
          </Carousel>
        </CarouselWrap>
      </CarouselContent>
    ) : (
      <div style={{ padding: '10px 0' }} />
    )
  },
  isEqual
)
export default CarouselList
