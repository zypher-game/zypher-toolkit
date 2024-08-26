import { LoadingOutlined } from '@ant-design/icons'
import {
  GlobalVar,
  LngNs,
  preStaticUrl,
  useCustomTranslation,
  useIsW768,
  useResetRecoilState,
  useSetRecoilState,
  useWalletHandler,
  walletModalOpenState
} from '@ui/src'
import { getWeb3Sign } from '@ui/src'
import { Space } from 'antd'
import cx from 'classnames'
import React, { useState } from 'react'

import bingoLobby from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { gameRoomState, joinGameState, JoinGameStateType, startGameStep } from '@/pages/state/state'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'

import { ButtonPrimary } from '../Button'
import { SetUpSubText } from '../Text'
import css from './index.module.stylus'

interface IGenerateKey {
  disabled?: boolean
}

const GenerateKey: React.FC<IGenerateKey> = ({ disabled }) => {
  const isMobile = useIsW768()
  const [pending, setPending] = useState(false)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  const setJoinGameState = useSetRecoilState(joinGameState)
  const setCurrentStep = useSetRecoilState(startGameStep)
  const resetGameRoom = useResetRecoilState(gameRoomState)
  const resetJoinGame = useResetRecoilState(joinGameState)
  const walletClient = useWalletHandler()
  const handleGenerateKey = async () => {
    if (!chainId || !account) {
      return
    }
    setPending(true)
    resetJoinGame()
    resetGameRoom()
    const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), 10000)
      })
      await Promise.race([
        (async () => {
          const label = await lobbyContract.read.getNextKeyLabel([account])
          const signedLabel = await getWeb3Sign(label, account, false, walletClient)
          if (typeof signedLabel === 'string') {
            setJoinGameState((state: JoinGameStateType) => ({
              ...state,
              signedLabel
            }))
          }
          setCurrentStep(1)
        })(),
        timeoutPromise
      ])
    } catch (e) {
      setErrorToast(e, lobbyContract)
    } finally {
      setPending(false)
    }
  }
  const { t } = useCustomTranslation([LngNs.zBingo])
  return (
    <div className={cx(css.generateKey, { [css.disabled]: disabled })}>
      {isMobile && <h3 className={css.mTitle}>{t('Encryption Key Generation')}</h3>}
      <img decoding="async" loading="lazy" src={preStaticUrl + '/img/bingo/key.svg'} alt="" />
      <SetUpSubText>{t('GenerateKeyText1')}</SetUpSubText>
      <div className={css.btnWrap}>
        {account ? (
          <ButtonPrimary disabled={pending} width="258px" onClick={handleGenerateKey}>
            <Space size={10}>
              <span>{t('Generate key')}</span>
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
            <span>{t('Connect wallet')}</span>
          </ButtonPrimary>
        )}
      </div>
      {GlobalVar.IS_TELEGRAM ? <></> : <div className={css.tip}>{t('EncryptCardText5')}</div>}
    </div>
  )
}

export default GenerateKey
