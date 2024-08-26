import { LoadingOutlined } from '@ant-design/icons'
import { preStaticUrl, txStatus, useGlobalVar, useResetRecoilState, useSetRecoilState } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { LngNs } from '@ui/src'
import { useAccountInvitation } from '@ui/src'
import { usePublicNodeWaitForTransaction } from '@ui/src'
import { useWalletHandler } from '@ui/src'
import { Modal, Space } from 'antd'
import React, { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TransactionReceipt } from 'viem'

import { gasPrice } from '@/constants/constants'
import bingoLobby from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { useChainIdParams } from '@/hooks/useChainIdParams'
import { gameRoomState, IBingoVersion, startGameStep } from '@/pages/state/state'
import { useAppDispatch } from '@/store/hooks'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { toBingoHref } from '@/utils/toBingoHref'

import { ButtonHover, ButtonPrimary } from '../Button'
import { GameModal } from '../Modal'

const GameExit: React.FC = () => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const navigate = useNavigate()
  const chainIdParams = useChainIdParams()
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const isMobile = useIsW768()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { id: gameId } = useParams()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const { walletClient } = useGlobalVar()
  const { postAccountUpdate } = useAccountInvitation(env)
  const resetGameRoom = useResetRecoilState(gameRoomState)
  const handleClick = async () => {
    if (!chainId || Number(gameId) < 0 || !walletClient) {
      return
    }
    setConfirmLoading(true)
    const lobbyContract = bingoLobby({
      bingoVersion,
      chainId,
      env,
      walletClient: walletClient
    })
    try {
      if (bingoVersion === IBingoVersion.v1) {
        const txnReceipt = await lobbyContract.write.abandon([gameId], {
          account: account,
          maxFeePerGas: gasPrice[chainId],
          maxPriorityFeePerGas: gasPrice[chainId]
        })
        const hash = typeof txnReceipt === 'string' ? txnReceipt : txnReceipt.hash
        const tx: TransactionReceipt | undefined = await waitForTransaction({
          confirmations: 1,
          hash
        })

        if (tx && tx.status === txStatus) {
          postAccountUpdate({ tx: tx })
          return toBingoPage()
        } else {
          throw Object.assign(new Error('Abandon Transaction Failed'), {
            name: 'Abandon'
          })
        }
      } else {
        return toBingoPage()
      }
    } catch (error) {
      setErrorToast(error, lobbyContract)
    } finally {
      setConfirmLoading(false)
    }
  }
  const setCurrentStep = useSetRecoilState(startGameStep)
  const toBingoPage = useCallback(() => {
    resetGameRoom()
    setCurrentStep(0)
    return toBingoHref({ chainIdParams, navigate })
  }, [navigate, chainIdParams])
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openModal = () => {
    setIsModalOpen(true)
  }
  if (bingoVersion === IBingoVersion.beta) {
    return <></>
  }
  return (
    <>
      <a onClick={openModal}>
        <img decoding="async" loading="lazy" src={preStaticUrl + `/img/bingo/exit.svg`} alt="" />
      </a>
      <Modal />
      <GameModal
        open={isModalOpen}
        onCancel={closeModal}
        title={t('Confirm Exit?')}
        // loading={confirmLoading}
        footer={
          <Space>
            <ButtonHover width={isMobile ? '140px' : '164px'} onClick={handleClick} loa>
              <Space size={10}>
                <span>{t('Exit')}</span>
                {confirmLoading && <LoadingOutlined />}
              </Space>
            </ButtonHover>
            <ButtonPrimary width={isMobile ? '140px' : '164px'} onClick={closeModal}>
              {t('Cancel')}
            </ButtonPrimary>
          </Space>
        }
      >
        {t('GameExitText1')}
      </GameModal>
    </>
  )
}

export default GameExit
