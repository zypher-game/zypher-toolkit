import { LoadingOutlined } from '@ant-design/icons'
import { LngNs, preStaticUrl, useCustomTranslation, useIsW768, useResetRecoilState, useSetRecoilState, walletModalOpenState } from '@ui/src'
import { Space } from 'antd'
import cx from 'classnames'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import bingoLobby from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { gameRoomState, joinGameState, JoinGameStateType, startGameStep } from '@/pages/state/state'
import { useAppDispatch } from '@/store/hooks'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { getWeb3Sign } from '@/utils/getSign'

import { ButtonPrimary } from '../Button'
import { SetUpSubText } from '../Text'
import css from './index.module.stylus'

interface IGenerateKey {
  disabled?: boolean
}

const Title = styled.div`
  color: #62380c;
  text-align: center;
  font-family: Lemon;
  font-size: 16px;
  /* padding-top: 38px; */
`

const GenerateKey: React.FC<IGenerateKey> = ({ disabled }) => {
  const isMobile = useIsW768()
  const [pending, setPending] = useState(false)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  const setJoinGameState = useSetRecoilState(joinGameState)
  const setCurrentStep = useSetRecoilState(startGameStep)
  const resetGameRoom = useResetRecoilState(gameRoomState)
  const resetJoinGame = useResetRecoilState(joinGameState)
  const dispatch = useAppDispatch()

  const handleGenerateKey = useCallback(async () => {
    if (!chainId || !account) {
      return
    }
    setPending(true)
    resetJoinGame()
    resetGameRoom()
    const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
    try {
      const label = await lobbyContract.read.getNextKeyLabel([account])
      const signedLabel = await getWeb3Sign(label, account, false)
      if (typeof signedLabel === 'string') {
        setJoinGameState((state: JoinGameStateType) => ({
          ...state,
          signedLabel
        }))
      }
      setCurrentStep(1)
    } catch (e) {
      setErrorToast(dispatch, e, lobbyContract)
    } finally {
      setPending(false)
    }
  }, [chainId, account])
  const { t } = useCustomTranslation([LngNs.zBingo])
  return (
    <div className={cx(css.generateKey, { [css.disabled]: disabled })}>
      {isMobile && <Title>{t('Encryption Key Generation')}</Title>}
      <img src={preStaticUrl + '/img/bingo/key.svg'} alt="" />
      <SetUpSubText>{t('GenerateKeyText1')}</SetUpSubText>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '24px'
        }}
      >
        {account ? (
          <ButtonPrimary disabled={pending} width="258px" onClick={handleGenerateKey}>
            <Space size={10}>
              <span style={{ fontFamily: 'lemon' }}>{t('Generate key')}</span>
              {pending && <LoadingOutlined />}
            </Space>
          </ButtonPrimary>
        ) : (
          <ButtonPrimary
            width="258px"
            onClick={() => {
              setDialogOpen(true)
              setPending(false)
            }}
          >
            <span style={{ fontFamily: 'lemon' }}>{t('Connect wallet')}</span>
          </ButtonPrimary>
        )}
      </div>
      <div className={css.tip}>{t('EncryptCardText5')}</div>
    </div>
  )
}

export default GenerateKey
