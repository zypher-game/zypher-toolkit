import { LoadingOutlined } from '@ant-design/icons'
import {
  LngNs,
  preStaticUrl,
  SvgComponent,
  useAaWallet,
  useCustomTranslation,
  useIsTelegram,
  useIsW768,
  useRecoilState,
  useSetRecoilState,
  useWalletHandler
} from '@ui/src'
import { getWeb3Sign } from '@ui/src'
import { useGetWalletClient } from '@ui/src'
import { Col, Row, Space } from 'antd'
import cn from 'classnames'
import { ethers } from 'ethers'
import React, { memo, useCallback, useState } from 'react'
import styled from 'styled-components'

import BingoBoardView from '@/components/BingoBoardView'
import bingoCard from '@/contract/bingoCard'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { gameRoomState, joinGameState, startGameStep } from '@/pages/state/state'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import generateCardNumbers, { CardNumbersType } from '@/utils/generateCardNumbers'

import { ButtonPrimary } from '../Button'
import { SetUpSubText } from '../Text'
import css from './index.module.stylus'

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
const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

interface IEncryptCard {
  disabled?: boolean
}

const EncryptCard: React.FC<IEncryptCard> = memo(({ disabled }: IEncryptCard) => {
  const IS_TELEGRAM = useIsTelegram()
  const { t } = useCustomTranslation([LngNs.zBingo])
  const [pending, setPending] = useState(false)
  const isMobile = useIsW768()
  const [cardNumbers, setCardNumbers] = useState(generateCardNumbers({ cols: 5, rows: 5, minNum: 1, maxNum: 35 }))
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const { aaWalletClient: walletClient } = useAaWallet()
  const [joinGame, setJoinGameState] = useRecoilState(joinGameState)
  const [, setGameRoom] = useRecoilState(gameRoomState)
  const setCurrentStep = useSetRecoilState(startGameStep)
  const { getWalletClient } = useGetWalletClient()

  const handleReset = useCallback(() => {
    setCardNumbers(generateCardNumbers({ cols: 5, rows: 5, minNum: 1, maxNum: 35 }))
  }, [])

  const handleNumberChange = useCallback((n: CardNumbersType) => {
    setCardNumbers(n)
  }, [])

  const handleEncryptCard = async () => {
    if (!chainId || !account || !walletClient) {
      getWalletClient()
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
      const signedCard = await getWeb3Sign(hashedCardBytes, account, true, walletClient)
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
      setErrorToast(e, cardContract)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className={cn(css.encryptCard, { [css.disabled]: disabled })}>
      <div className={cn(css.ScrollableDiv, { [css.tgScrollableDiv]: IS_TELEGRAM })}>
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
                  <div className={`${css.tip} ${IS_TELEGRAM ? css.tgTip : ''}`}>
                    <CustomIcon src={preStaticUrl + '/img/icon/note.svg'} />
                    {t('EncryptCardText1')}
                  </div>
                  <div className={css.title}>
                    {t('EncryptCardText201')}
                    <br />
                    {t('EncryptCardText202')}
                  </div>
                </>
              )}
              <SetUpSubText>{t('EncryptCardText3')}</SetUpSubText>
              {!isMobile && (
                <div className={css.tip}>
                  <CustomIcon src={preStaticUrl + '/img/icon/note.svg'} />
                  {t('EncryptCardText4')}
                </div>
              )}
              {!isMobile && (
                <div className={css.btnWrap}>
                  <button className={css.change} onClick={handleReset} />
                  <div>
                    <Space size={10} align="center" direction="vertical">
                      <div>
                        <ButtonPrimary disabled={pending} width={isMobile ? '180px' : '258px'} onClick={handleEncryptCard}>
                          <Space size={10}>
                            <span>{t('Encrypt')}</span>
                            {pending && <LoadingOutlined />}
                          </Space>
                        </ButtonPrimary>
                      </div>
                      {IS_TELEGRAM ? <></> : <div className={css.tip}>{t('EncryptCardText5')}</div>}
                    </Space>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
      {isMobile && (
        <>
          <FlexCenter>
            <Space align="center">
              <button className={css.changeM} onClick={handleReset} />
              <ButtonPrimary disabled={pending} height={isMobile && '50px'} width={isMobile ? '180px' : '258px'} onClick={handleEncryptCard}>
                <Space size={10}>
                  <span>{t('Encrypt')}</span>
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
