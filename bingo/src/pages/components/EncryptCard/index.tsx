import { LoadingOutlined } from '@ant-design/icons'
import { LngNs, preStaticUrl, SvgComponent, useCustomTranslation, useIsW768, useRecoilState, useSetRecoilState, useWalletClient } from '@ui/src'
import { Col, Row, Space } from 'antd'
import cx from 'classnames'
import { ethers } from 'ethers'
import React, { memo, useCallback, useState } from 'react'
import styled from 'styled-components'

import BingoBoardView from '@/components/BingoBoardView'
import bingoCard from '@/contract/bingoCard'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { gameRoomState, joinGameState, startGameStep } from '@/pages/state/state'
import { useAppDispatch } from '@/store/hooks'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import generateCardNumbers, { CardNumbersType } from '@/utils/generateCardNumbers'
import { getEIP712Sign, getWeb3Sign } from '@/utils/getSign'

import { ButtonPrimary } from '../Button'
import { SetUpSubText } from '../Text'
import css from './index.module.stylus'

const Tip = styled.div<{ isMobile?: boolean }>`
  color: #62380c;
  /* text-align: center; */
  opacity: 0.6;
  font-size: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: ${({ isMobile }) => (isMobile ? '4px' : '18px')};
`
const CustomIcon = styled(SvgComponent)`
  width: 16px;
  margin-right: 6px;
`

const RenderBoard = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '192px' : '311px')};
  height: ${({ isMobile }) => (isMobile ? '223px' : '361px')};
  margin: ${({ isMobile }) => (isMobile ? '12px' : '22px')};
  /* display: flex; */
`
const BoxRight = styled.div<{ isMobile: boolean }>`
  display: flex;
  justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'flex-end ')};
  width: 100%;
`
const Title = styled.div`
  color: #62380c;
  text-align: center;
  font-family: Lemon;
  font-size: 16px;
  /* padding-top: 15px; */
  padding-bottom: 10px;
`

const ScrollableDiv = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) => isMobile && 'height: 352px;'}
  overflow-y: scroll;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 13px;
  margin-bottom: 10px;
  /* 自定义滚动条样式（仅在Webkit浏览器中有效） */
  &::-webkit-scrollbar {
    width: 4px;
    display: block;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(143, 72, 0, 0.5); /* 滚动条拖动块的颜色 */
    border-radius: 8px; /* 滚动条拖动块的圆角 */
  }
`
const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

interface IEncryptCard {
  disabled?: boolean
}

const EncryptCard: React.FC<IEncryptCard> = memo(({ disabled }: IEncryptCard) => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const [pending, setPending] = useState(false)
  const isMobile = useIsW768()
  const [cardNumbers, setCardNumbers] = useState(generateCardNumbers({ cols: 5, rows: 5, minNum: 1, maxNum: 35 }))
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const { data: walletClient } = useWalletClient()

  const [joinGame, setJoinGameState] = useRecoilState(joinGameState)
  const [, setGameRoom] = useRecoilState(gameRoomState)
  const setCurrentStep = useSetRecoilState(startGameStep)
  const dispatch = useAppDispatch()
  const handleReset = useCallback(() => {
    setCardNumbers(generateCardNumbers({ cols: 5, rows: 5, minNum: 1, maxNum: 35 }))
  }, [])

  const handleNumberChange = useCallback((n: CardNumbersType) => {
    setCardNumbers(n)
  }, [])

  const handleEncryptCard = useCallback(async () => {
    if (!chainId || !account || !walletClient) {
      return
    }
    setPending(true)
    const cardContract = bingoCard({
      chainId,
      env,
      bingoVersion,
      walletClient
    })
    try {
      const cardNums = cardNumbers.reduce(
        (prev, curr) => {
          prev[curr.row - 1].push(curr.num)
          return prev
        },
        [[], [], [], [], []] as number[][]
      )
      const encodedNumbers = await cardContract.read.encodeCardNumbers([cardNums])
      const hashedCardBytes = ethers.utils.hexConcat([
        '0x456e7472797074656420436172643a20', // 'Encrypted Card: '
        joinGame.signedLabel,
        encodedNumbers
      ])
      console.log({ hashedCardBytes })
      const signedCard = await getWeb3Sign(hashedCardBytes, account)
      console.log({ signedCard })
      if (typeof signedCard === 'string') {
        setJoinGameState(state => ({
          ...state,
          signedCard: signedCard
        }))
      }
      setGameRoom(room => ({
        ...room,
        cardNumbers
      }))
      setCurrentStep(2)
    } catch (e) {
      setErrorToast(dispatch, e, cardContract)
    } finally {
      setPending(false)
    }
  }, [chainId, account, walletClient, bingoVersion, JSON.stringify(cardNumbers), JSON.stringify(joinGame)])

  return (
    <div className={cx(css.encryptCard, { [css.disabled]: disabled })}>
      <ScrollableDiv isMobile={isMobile}>
        <Row justify={'center'} align={'middle'}>
          <Col>
            <BoxRight isMobile={isMobile}>
              <RenderBoard isMobile={isMobile}>
                <BingoBoardView cardNumbers={cardNumbers} onChange={handleNumberChange} editable={false} />
              </RenderBoard>
            </BoxRight>
          </Col>
          <Col>
            <div className={css.control}>
              {isMobile && (
                <>
                  <Tip isMobile={isMobile}>
                    <CustomIcon src={preStaticUrl + '/img/icon/note.svg'} />
                    {t('EncryptCardText1')}
                  </Tip>
                  <Title>
                    {t('EncryptCardText201')}
                    <br />
                    {t('EncryptCardText202')}
                  </Title>
                </>
              )}
              <SetUpSubText>{t('EncryptCardText3')}</SetUpSubText>
              {!isMobile && (
                <Tip isMobile={isMobile}>
                  <CustomIcon src={preStaticUrl + '/img/icon/note.svg'} />
                  {t('EncryptCardText4')}
                </Tip>
              )}
              {!isMobile && (
                <div className={css.btnWrap}>
                  <button className={css.change} onClick={handleReset} />
                  <div>
                    <Space size={10} align="center" direction="vertical">
                      <div>
                        <ButtonPrimary disabled={pending} width={isMobile ? '180px' : '258px'} onClick={handleEncryptCard}>
                          <Space size={10}>
                            <span style={{ fontFamily: 'lemon' }}>{t('Encrypt')}</span>
                            {pending && <LoadingOutlined />}
                          </Space>
                        </ButtonPrimary>
                      </div>
                      <Tip>{t('EncryptCardText5')}</Tip>
                    </Space>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </ScrollableDiv>
      {isMobile && (
        <>
          <FlexCenter>
            <Space align="center">
              <button className={css.changeM} onClick={handleReset} />
              <ButtonPrimary disabled={pending} height={isMobile && '50px'} width={isMobile ? '180px' : '258px'} onClick={handleEncryptCard}>
                <Space size={10}>
                  <span style={{ fontFamily: 'lemon' }}>{t('Encrypt')}</span>
                  {pending && <LoadingOutlined />}
                </Space>
              </ButtonPrimary>
            </Space>
          </FlexCenter>
          {/* <Tip>(No gas fee is required for this step)</Tip> */}
        </>
      )}
    </div>
  )
})

export default EncryptCard
