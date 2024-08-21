import { LoadingOutlined } from '@ant-design/icons'
import {
  ChainRpcUrls,
  getProvider,
  GlobalVar,
  LngNs,
  preStaticUrl,
  refreshBalanceState,
  txStatus,
  useAccountInvitation,
  useCustomTranslation,
  useIsW768,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useSetRecoilState,
  useWalletHandler
} from '@ui/src'
import { Col, message, Row, Space } from 'antd'
import BigNumber from 'bignumber.js'
import { sample } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { TransactionReceipt } from 'viem'

import BingoBoardView from '@/components/BingoBoardView'
import { gasPrice } from '@/constants/constants'
import bingoLobby, { bingoLobbyFromRpc } from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { ButtonPrimary } from '@/pages/components/Button'
import { gameRoomState, joinGameState, startGameStep } from '@/pages/state/state'
import { useGeSubmitCard } from '@/pages/zBingoIndex/hooks/usePlay'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { ILocalPathUrl, localPathUrl } from '@/utils/localPathUrl'

import { SetUpSubText } from '../Text'
import css from './index.module.stylus'
import { BingoCardView, BoxWrap, CardBack, FlexCenter, SubmitCardEle, Tip, Title, ViewCard } from './SubmitCard.style'
interface ISubmitCard {
  disabled?: boolean
}

const SubmitCardBeta: React.FC<ISubmitCard> = ({ disabled }) => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const [pending, setPending] = useState(false)
  const isMobile = useIsW768()
  const [joinGame] = useRecoilState(joinGameState)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [gameRoom] = useRecoilState(gameRoomState)
  const setCurrentStep = useSetRecoilState(startGameStep)
  const { postAccountUpdate } = useAccountInvitation(env)
  const [isCard, setIsCard] = useState(false)
  const walletClient = useWalletHandler()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const { submitCardBeta } = useGeSubmitCard()
  // Cannot destructure property 'betSize' of 'activeLevels[level]' as it is undefined.
  const handleSubmitCard = useCallback(async () => {
    if (!chainId || !account || !walletClient || pending) {
      return
    }
    setPending(true)
    try {
      await submitCardBeta()
    } catch (e) {
      setErrorToast(e)
    } finally {
      setPending(false)
    }
  }, [account, chainId, walletClient, setErrorToast, JSON.stringify(joinGame), pending, JSON.stringify(gameRoom)])
  useEffect(() => {
    message.success({
      content: t('Encryption successful'),
      className: 'customMessage',
      duration: 1,
      style: {
        marginTop: '50vh'
      }
    })
  }, [t])

  return (
    <div id="submit-card" style={{ width: '100%' }}>
      {isCard ? (
        <>
          <Row>
            <Col flex={'200px'}>
              <CardBack isMobile={isMobile} onClick={() => setIsCard(false)}>
                {'<'} {t('Back')}
              </CardBack>
            </Col>
            <Col flex={'auto'}>
              <FlexCenter isMobile={isMobile}>
                <BingoCardView isMobile={isMobile}>
                  <BingoBoardView cardNumbers={gameRoom.cardNumbers} onChange={() => {}} />
                </BingoCardView>
              </FlexCenter>
            </Col>
          </Row>
        </>
      ) : (
        <SubmitCardEle>
          <BoxWrap>
            <img decoding="async" loading="lazy" src={`${preStaticUrl}/img/bingo/lock.png`} className={css.lockimg} />
          </BoxWrap>
          {isMobile ? (
            <Title>Submit the encrypted grid card and enter the matchmaking process.</Title>
          ) : (
            <SetUpSubText>Submit the encrypted grid card and enter the matchmaking process.</SetUpSubText>
          )}

          <ViewCard
            onClick={() => {
              setIsCard(true)
            }}
          >
            {t('View Card')}
          </ViewCard>
          <ButtonPrimary disabled={pending} width="250px" onClick={handleSubmitCard}>
            <Space>
              <span>{t('Submit')}</span>
              {pending && <LoadingOutlined />}
            </Space>
          </ButtonPrimary>
          {GlobalVar.IS_TELEGRAM ? <></> : <Tip>{t('SubmitCardText4')}</Tip>}
        </SubmitCardEle>
      )}
    </div>
  )
}

export default SubmitCardBeta
