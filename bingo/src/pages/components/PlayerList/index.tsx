import {
  addressIsEqual,
  ChainId,
  getShortenAddress,
  GlobalVar,
  graphqlApiUrl,
  IPlayer,
  LngNs,
  PlayerAvatarList as PlayerAvatar,
  PointsIcon,
  preStaticUrl,
  request,
  useCustomTranslation,
  useIsW768,
  useRecoilValue
} from '@ui/src'
import { Col, List, Row, Space } from 'antd'
import BigNumber from 'bignumber.js'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import bingoLobby from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { GetGameListBoxImg } from '@/hooks/useMText'
import { bingoVersionState, IBingoVersion } from '@/pages/state/state'
import { env } from '@/utils/config'

import TgPointImg from '../TgPointImg/TgPointImg'
import css from './index.module.stylus'

const Text = styled.div`
  font-size: 20px;
  @media screen and (max-width: 830px) {
    font-size: 12px;
  }
`
const BoxImgWrap = styled.div<{ isMobile: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2px;
  img {
    width: 38px !important;
  }
  p {
    color: rgb(255, 240, 207);
    font-size: 14px;
  }
`
const Content = styled.div<{ isMobile: boolean; isWinner: boolean }>`
  padding: ${({ isMobile }) => (isMobile ? '50px 0px' : '80px 0px')};
  width: 100%;
  margin: 0 auto;
  background: linear-gradient(
    90.2deg,
    rgba(0, 0, 0, 0) 0.65%,
    rgba(0, 0, 0, 0.4) 30.31%,
    rgba(0, 0, 0, 0.5) 51.58%,
    rgba(0, 0, 0, 0.43) 67.53%,
    rgba(0, 0, 0, 0) 99.83%
  );
  &::before,
  &::after {
    content: '';
    height: 1px;
    width: ${({ isMobile }) => (isMobile ? '90vw' : '60vw')};
    max-width: 1120px;
    min-width: 355px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
  &::before {
    content: '';
    top: 0px;
    ${({ isWinner }) => {
      return isWinner
        ? 'background: linear-gradient(90deg,rgba(255, 194, 57, 0) 0%,#fac12e 49.2%,rgba(249, 193, 43, 0.726521) 70.13%,rgba(246, 193, 36, 0) 100%)'
        : 'background: linear-gradient(90deg, rgba(209, 209, 209, 0.00) 0%, rgba(215, 215, 215, 0.69) 29.97%, #D8D8D8 49.20%, rgba(193, 193, 193, 0.73) 70.13%, rgba(207, 207, 207, 0.00) 100%)'
    }};
  }
  &::after {
    position: absolute;
    bottom: 0px;
    content: '';
    ${({ isWinner }) => {
      return isWinner
        ? 'background: linear-gradient(90deg,rgba(255, 194, 57, 0) 0%,#fac12e 49.2%,rgba(249, 193, 43, 0.726521) 70.13%,rgba(246, 193, 36, 0) 100%)'
        : 'background: linear-gradient(90deg, rgba(209, 209, 209, 0.00) 0%, rgba(215, 215, 215, 0.69) 29.97%, #D8D8D8 49.20%, rgba(193, 193, 193, 0.73) 70.13%, rgba(207, 207, 207, 0.00) 100%)'
    }};
  }
`

function customShort(arr: IPlayer[], condition: string): string[][] {
  const newArr: string[][] = []
  arr.forEach(item => {
    if (item.user === condition) {
      newArr.unshift([item.user, item?.tgName ?? ''])
    } else {
      newArr.push([item.user, item?.tgName ?? ''])
    }
  })
  return newArr
}

interface WinProps {
  chainId: ChainId | undefined
  account: string
}

export const WinBeta = ({ chainId, account }: { chainId: ChainId | undefined; account: string }) => {
  const [count, setCount] = useState<number | string>('--')
  const { bingoVersion } = useActiveWeb3ReactForBingo()
  const data = useCallback(async () => {
    if (!account || !chainId) {
      return
    }
    const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
    const txnReceipt = await lobbyContract.read.userRecords([account]) // [current , overall]
    const tx = new BigNumber(txnReceipt[0].wins).multipliedBy(100).dividedBy(txnReceipt[0].joined).toFixed(2) || '0'
    setCount(tx)
  }, [account, chainId, bingoVersion])

  useEffect(() => {
    data()
  }, [account, chainId])

  return <div style={{ lineHeight: '35px' }}>{count} %</div>
}
export const Win: React.FC<WinProps> = ({ chainId, account }) => {
  const [count, setCount] = useState<number | string>('--')
  const [loading, setLoading] = useState(false)
  const data = useCallback(
    async item => {
      if (!chainId) {
        return
      }
      const api = graphqlApiUrl[chainId as ChainId]
      if (!api || !account) {
        return
      }
      setLoading(true)
      const result = await request(api, {
        method: 'POST',
        data: JSON.stringify({
          query: `
          query MyQuery {
            playerData(id: "${item.toLowerCase()}") {
              jCount
              id
              joinAmount
              player
              wCount
              winAmount
            }
          }
        `,
          variables: {},
          operationName: 'MyQuery'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (result.data && result.data.data && result.data.data.playerData) {
        const res = result.data.data.playerData
        const r = new BigNumber(res.wCount).multipliedBy(100).dividedBy(new BigNumber(res.jCount)).toFixed(2)
        setCount(r)
      }
    },
    [chainId]
  )

  useEffect(() => {
    data(account)
  }, [account])

  return <p className={css.count}>{count} %</p>
}
const PlayerList = memo((props: { data: IPlayer[]; winner: string; isWinner: boolean; winAmount: number | string; loseAmount: number | string }) => {
  const bingoVersion = useRecoilValue(bingoVersionState)
  return bingoVersion === IBingoVersion.beta ? <PlayerListBeta {...props} /> : <PlayerListV1 {...props} />
})
const PlayerListBeta = memo(({ data, winner, isWinner }: { data: IPlayer[]; winner: string; isWinner: boolean }) => {
  const { account, chainId } = useActiveWeb3ReactForBingo()
  const isMobile = useIsW768()
  const list = account ? customShort(data, account) : []
  const Header = (
    <Row className={css.header}>
      <Col span={12} />
      <Col span={6}>Win</Col>
      <Col span={6} style={{ textAlign: 'right' }}>
        Winning %
      </Col>
    </Row>
  )
  return (
    <Content isWinner={isWinner} isMobile={isMobile}>
      <List
        header={Header}
        dataSource={list}
        split={false}
        renderItem={([item, tgName]) => {
          return (
            <List.Item className={css.listBox}>
              <div className={css.content}>
                <Row align="middle">
                  <Col span={12}>
                    <List.Item.Meta
                      style={{ alignItems: 'center' }}
                      avatar={<PlayerAvatar size={40} account={item} winner={addressIsEqual(winner, item)} />}
                      title={
                        <div className={css.name}>
                          Player {data.findIndex(i => addressIsEqual(i.user, item)) + 1} {addressIsEqual(item, account) && '(you)'}
                        </div>
                      }
                      description={<div className={css.address}>{tgName && tgName !== '' ? tgName : getShortenAddress(item)}</div>}
                    />
                  </Col>
                  <Col span={6}>
                    {addressIsEqual(winner, item) ? (
                      GlobalVar.IS_TELEGRAM ? (
                        <div className={css.pointCol}>
                          <TgPointImg className={css.pointImg} />
                          <p>+20</p>
                        </div>
                      ) : (
                        <BoxImgWrap isMobile={isMobile}>
                          <GetGameListBoxImg />
                          <p>X1</p>
                        </BoxImgWrap>
                      )
                    ) : GlobalVar.IS_TELEGRAM ? (
                      <div className={css.pointCol}>
                        <TgPointImg className={css.pointImg} />
                        <p>+10</p>
                      </div>
                    ) : (
                      <Text>--</Text>
                    )}
                  </Col>
                  <Col span={6} style={{ textAlign: 'right' }}>
                    <Text style={addressIsEqual(item, account) ? { color: '#E8421E' } : {}}>
                      <Space align="center" size={1}>
                        <WinBeta chainId={chainId} account={item} />
                        <img
                          src={preStaticUrl + `${addressIsEqual(winner, item) ? '/img/bingo/arrow-up.svg' : '/img/bingo/arrow-down.svg'}`}
                          alt=""
                        />
                      </Space>
                    </Text>
                  </Col>
                </Row>
              </div>
            </List.Item>
          )
        }}
      />
    </Content>
  )
})
const PlayerListV1 = memo(
  ({
    data,
    winner,
    isWinner,
    winAmount,
    loseAmount
  }: {
    data: IPlayer[]
    winner: string
    isWinner: boolean
    winAmount: number | string
    loseAmount: number | string
  }) => {
    const { t } = useCustomTranslation([LngNs.zBingo])
    const { account, chainId } = useActiveWeb3ReactForBingo()
    const list = account ? customShort(data, account) : []
    const isMobile = useIsW768()
    const Header = (
      <Row className={css.header}>
        <Col span={12} />
        <Col span={6} style={{ whiteSpace: 'nowrap', fontSize: isMobile ? '12px' : '14px' }}>
          {t('Winnings')}
        </Col>
        <Col
          span={6}
          style={{
            textAlign: 'right',
            whiteSpace: 'nowrap',
            fontSize: isMobile ? '12px' : '14px'
          }}
        >
          {t('Winning %')}
        </Col>
      </Row>
    )
    return (
      <Content isWinner={isWinner} isMobile={isMobile}>
        <List
          header={Header}
          dataSource={list}
          split={false}
          renderItem={([item]) => (
            <List.Item className={css.listBox}>
              <div className={css.content}>
                <Row align="middle">
                  <Col span={12}>
                    <List.Item.Meta
                      style={{ alignItems: 'center' }}
                      avatar={
                        <PlayerAvatar winner={winner === item} size={winner !== item ? 'small' : undefined} account={item} isGrey={winner !== item} />
                      }
                      title={
                        <p className={css.name}>
                          {t('Player', {
                            you: `${data.findIndex(i => i.user === item) + 1} ${item === account && '(you)'}`
                          })}
                        </p>
                      }
                      description={<p className={css.address}>{getShortenAddress(item)}</p>}
                    />
                  </Col>
                  <Col span={6}>
                    <Space>
                      <Text className={css.amount}>{winner === item ? '+' + winAmount : '-' + loseAmount}</Text>
                      <PointsIcon isMobile={isMobile} />
                    </Space>
                  </Col>
                  <Col span={6} style={{ textAlign: 'right' }}>
                    <Text style={item === account ? (isWinner ? { color: '#54E127' } : { color: '#E8421E' }) : {}}>
                      <Space align="center" size={1}>
                        <Win chainId={chainId} account={item} />
                        {item === account &&
                          (isWinner ? (
                            <img decoding="async" loading="lazy" src={preStaticUrl + `/img/arrow-up.svg`} className={css.arrowDown} alt="" />
                          ) : (
                            <img decoding="async" loading="lazy" src={preStaticUrl + `/img/arrow-down.svg`} className={css.arrowDown} alt="" />
                          ))}
                      </Space>
                    </Text>
                  </Col>
                </Row>
              </div>
            </List.Item>
          )}
        />
      </Content>
    )
  },
  isEqual
)

export default PlayerList
