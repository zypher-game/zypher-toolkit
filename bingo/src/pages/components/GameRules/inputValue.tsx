import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ChainId, formatMoney, LngNs, preStaticUrl, useAaWallet, useCustomTranslation, useIsTelegram, useIsW768, useRecoilValue } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { Space, Tooltip } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

import bingoLobbyFee from '@/contract/bingoLobbyFee'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import useIntervalAsync from '@/hooks/useIntervalAsync'
import { GetGameListBoxImg } from '@/hooks/useMText'
import { usePrice } from '@/hooks/usePrice'
import { bingoVersionState, IBingoVersion } from '@/pages/state/state'
import { env } from '@/utils/config'

import TgPointImg from '../TgPointImg/TgPointImg'
const BoxImgWrap = styled.div<{ isMobile: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  img {
    width: ${({ isMobile }) => (isMobile ? '38px' : '78px')};
  }
  p {
    font-family: Lemon;
    color: ${({ isMobile }) => (isMobile ? '#613c17' : 'rgb(255, 240, 207)')};
    font-size: 24px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`
const AmountValueItem = styled.div<{ isMobile: boolean }>`
  padding-bottom: ${({ isMobile }) => (isMobile ? '6px' : '5px')};
  display: ${({ isMobile }) => (isMobile ? 'flex' : '')};
  align-items: center;
  justify-content: space-between;
  font-size: ${({ isMobile }) => (isMobile ? '12px' : '16px')};
  line-height: ${({ isMobile }) => isMobile && '18px'};
  &:last-child {
    padding-bottom: 0px;
  }
`
const Label = styled.div<{ color?: string }>`
  color: ${({ color }) => (color ? color : '#613c17')};

  line-height: 30px;
  font-weight: 600;

  @media (max-width: 768px) {
    line-height: 18px;
  }
`
const AmountValue = styled.div<{ isMobile: boolean }>`
  color: #db5f16;
  font-weight: 600;
  font-size: ${({ isMobile }) => (isMobile ? '13px' : '16px')};
  line-height: ${({ isMobile }) => (isMobile ? '18px' : '30px')};
  text-align: right;
`

const Icon = styled(ExclamationCircleOutlined)<{ color?: string }>`
  color: ${({ color }) => (color ? color : '#613c17')};
`
type InputValueProps = {
  color?: string
  playersNumber?: number
  room?: boolean
  betSize?: string | number
}

const InputValue: React.FC<InputValueProps> = ({ color, playersNumber, room, betSize }) => {
  const bingoVersion = useRecoilValue(bingoVersionState)
  const isMobile = useIsW768()
  const { winAmount, lossAmount } = usePrice()
  const IS_TELEGRAM = useIsTelegram()
  return (
    <>
      {bingoVersion === IBingoVersion.beta ? (
        <AmountValueItem isMobile={isMobile} style={!room && !isMobile ? { paddingBottom: '5px' } : {}}>
          <div>
            <Label color={color}>Prize</Label>
          </div>
          <BoxImgWrap isMobile={isMobile}>
            {IS_TELEGRAM ? (
              <>
                <TgPointImg />
                <p>Win: {winAmount}</p>
                <p>Loss: {lossAmount}</p>
              </>
            ) : (
              <>
                <GetGameListBoxImg />
                <p> X1</p>
              </>
            )}
          </BoxImgWrap>
        </AmountValueItem>
      ) : (
        <InputValueBeta color={color} playersNumber={playersNumber} room={room} betSize={betSize} />
      )}
    </>
  )
}
const InputValueBeta: React.FC<InputValueProps> = ({ color, playersNumber, room, betSize }) => {
  const { chainId } = useActiveWeb3ReactForBingo()
  const isMobile = useIsW768()
  const [gameRate, setGameRate] = useState(0)
  const [gameFee, setGameFee] = useState('0%')
  const realMultiplier = useMemo(() => {
    const Rate = new BigNumberJs(gameRate)
    if (!playersNumber) {
      return 0
    }
    return Rate.multipliedBy(playersNumber).toNumber().toFixed(2)
  }, [gameRate, playersNumber])

  const MultiplierLeft = useMemo(() => {
    const a = new BigNumberJs(2)
    return a.multipliedBy(gameRate).toNumber().toFixed(2)
  }, [gameRate])
  const MultiplierRight = useMemo(() => {
    const a = new BigNumberJs(5)
    return a.multipliedBy(gameRate).toNumber().toFixed(2)
  }, [gameRate])
  const get = useCallback(async () => {
    let DefaultChainId = chainId as ChainId
    if (!DefaultChainId) {
      // DefaultChainId = supportedChainIds[0]
      DefaultChainId = ChainId.OPBNB //因为合约不全 这里暂时默认opbnb testnet
    }
    const Contract = bingoLobbyFee(DefaultChainId, env)
    const txnReceipt = await Contract.read.getGameFeeRatio()
    const Rate = new BigNumberJs(txnReceipt)
    const divisor = new BigNumberJs('1000000')
    const a = Rate.dividedBy(divisor).toNumber()
    const result = Rate.dividedBy(divisor)
    const percentage = result.times(100)
    const b = new BigNumberJs(1)
    const c = b.minus(a).toNumber()
    setGameFee(percentage.toFixed(2) + '%')
    setGameRate(c)
  }, [chainId])
  useIntervalAsync(get, 2000, true)
  const { t } = useCustomTranslation([LngNs.zBingo])
  return (
    <>
      <AmountValueItem isMobile={isMobile} style={!room && !isMobile ? { paddingBottom: '5px' } : {}}>
        <div>
          <Space size={8}>
            <Label color={color}>{t('Pledged per player')}</Label>
            {/* <Icon color={color} /> */}
          </Space>
        </div>
        <Space align="center">
          <AmountValue isMobile={isMobile}>{playersNumber && betSize ? formatMoney(betSize, 0) : '5,000～20,000'}</AmountValue>
          <img decoding="async" loading="lazy" src={preStaticUrl + `/img/bingo/radish.svg`} alt="radish" width={isMobile ? 16 : ''} />
        </Space>
      </AmountValueItem>
      <AmountValueItem isMobile={isMobile} style={!room && !isMobile ? { paddingBottom: '5px' } : {}}>
        <div>
          <Space size={8}>
            <Label color={color}>{t('Game Fee')}</Label>
            <Tooltip title={t('GameFeeRule')}>
              <Icon color={color} />
            </Tooltip>
          </Space>
        </div>
        <Space align="center">
          <AmountValue isMobile={isMobile}>{gameFee}</AmountValue>
        </Space>
      </AmountValueItem>
      <AmountValueItem isMobile={isMobile} style={!room && !isMobile ? { paddingBottom: '5px' } : {}}>
        <div>
          <Space size={8}>
            <Label color={color}>{t('Multiplier')}</Label>
            <Tooltip title={t('MultiplierRule')}>
              <Icon color={color} />
            </Tooltip>
          </Space>
        </div>
        <Space align="center">
          <AmountValue isMobile={isMobile}>
            {playersNumber ? (
              realMultiplier
            ) : (
              <>
                {MultiplierLeft}~{MultiplierRight}
              </>
            )}
          </AmountValue>
        </Space>
      </AmountValueItem>
      <AmountValueItem isMobile={isMobile}>
        <div>
          <Space align="center" size={8}>
            <Label color={color}>{t('Prize pool')}</Label>
            <Tooltip title={t('PrizepoolRule')}>
              <Icon color={color} />
            </Tooltip>
          </Space>
        </div>
        <Space align="center">
          <AmountValue isMobile={isMobile}>
            {playersNumber && betSize ? formatMoney(Number(betSize) * playersNumber, 0) : <>{'10,000～100,000'}</>}
          </AmountValue>
          <img decoding="async" loading="lazy" src={preStaticUrl + `/img/bingo/radish.svg`} width={isMobile ? 16 : ''} alt="radish" />
        </Space>
      </AmountValueItem>
    </>
  )
}

export default InputValue
