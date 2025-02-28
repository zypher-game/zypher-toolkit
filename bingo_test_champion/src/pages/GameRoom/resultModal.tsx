import { DialogContent, DialogOverlay } from '@reach/dialog'
import { addressIsEqual, preStaticUrl, useAaWallet } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { LngNs } from '@ui/src'
import { Space } from 'antd'
import { isEqual } from 'lodash'
import React, { memo, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { IPlayer } from '@/hooks/useGetGameInfoV1.types'

import { ButtonHover, ButtonPrimary } from '../components/Button'
import PlayerList from '../components/PlayerList'
import { usePostResult } from '../zBingoIndex/components/dialog/RankingB3Dialog/RankingB3/hooks/RankingB3Hooks'
import styles from './resultModal.module.styl'

interface IResultModalProps {
  players: IPlayer[]
  winner: string
  open: boolean
  onCancel: () => void
  onSubmit: () => void
  winAmount: number | string
  loseAmount: number | string
}

const ResultModal: React.FC<IResultModalProps> = memo(({ players, winner, onCancel, onSubmit, open, winAmount, loseAmount }: IResultModalProps) => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const { account, chainId } = useActiveWeb3ReactForBingo()
  const { id: gameId } = useParams()
  const { aa_mm_address } = useAaWallet()
  const isMobile = useIsW768()
  const updateResult = usePostResult()
  useEffect(() => {
    if (chainId && gameId && winner && account && updateResult) {
      updateResult({
        chainId,
        gameId,
        isWin: addressIsEqual(winner, account),
        address: account
      })
    }
  }, [updateResult, chainId, gameId, winner, account])
  const isWinner = useMemo(() => {
    return addressIsEqual(winner, account) || addressIsEqual(winner, aa_mm_address)
  }, [winner, account, aa_mm_address])
  return (
    <DialogOverlay isOpen={open}>
      <DialogContent className={styles.dialogContent}>
        <div className={isMobile ? styles.wrapperMobile : styles.wrapper}>
          <div className={styles.resultM}>
            {isWinner ? (
              <img decoding="async" loading="lazy" className={styles.winnerImg} src={preStaticUrl + `/img/bingo/winerBingo.webp`} />
            ) : (
              <img
                decoding="async"
                loading="lazy"
                className={isMobile ? styles.loseImgMobile : styles.loseImg}
                src={preStaticUrl + `/img/bingo/your-lose_en_US.webp`}
              />
            )}
          </div>
          <PlayerList data={players} winner={winner} isWinner={isWinner} winAmount={winAmount} loseAmount={loseAmount} />
          <div className={styles.footer}>
            <Space size={30}>
              <ButtonHover
                width={isMobile ? '140px' : '186px'}
                height={isMobile ? '40px' : '58px'}
                size={isMobile ? '14px' : '22px'}
                onClick={onCancel}
              >
                {t('Back')}
              </ButtonHover>
              <ButtonPrimary
                width={isMobile ? '140px' : '186px'}
                height={isMobile ? '40px' : '58px'}
                size={isMobile ? '14px' : '22px'}
                onClick={onSubmit}
              >
                {t('Play again')}
              </ButtonPrimary>
            </Space>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default ResultModal
