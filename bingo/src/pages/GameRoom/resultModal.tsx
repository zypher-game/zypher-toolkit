import { DialogContent, DialogOverlay } from '@reach/dialog'
import { addressIsEqual, preStaticUrl, useAaWallet, useCurrentLanguage } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { LngNs } from '@ui/src'
import { Space } from 'antd'
import { isEqual } from 'lodash'
import React, { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { useChainIdParams } from '@/hooks/useChainIdParams'
import { IPlayer } from '@/hooks/useGetGameInfoV1.types'

import { ButtonHover, ButtonPrimary } from '../components/Button'
import PlayerList from '../components/PlayerList'
import { usePostResult } from '../zBingoIndex/components/dialog/RankingB3Dialog/RankingB3/hooks/RankingB3Hooks'

const Wrapper = styled.div<{ isMobile: boolean }>`
  position: relative;
  max-width: 565px;
  width: 80vw;
  ${({ isMobile }) =>
    isMobile
      ? css`
          width: 80vw;
        `
      : null}
`

const ResultM = styled.div<{ isMobile: boolean }>`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  img {
    position: absolute;
    top: -40%;
    transform: translateY(-64%);
  }
  .loseImg {
    width: ${({ isMobile }) => (isMobile ? '90%' : '100%')};
  }
  .winnerImg {
    max-width: 355px;
    width: 80%;
  }
`

const Footer = styled.div`
  height: 58px;
  position: absolute;
  bottom: -29px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

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
  const lang = useCurrentLanguage()
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
  return (
    <DialogOverlay isOpen={open}>
      <DialogContent
        style={{
          background: 'transparent',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Wrapper isMobile={isMobile}>
          <ResultM isMobile={isMobile}>
            {addressIsEqual(winner, account) || addressIsEqual(winner, aa_mm_address) ? (
              <img decoding="async" loading="lazy" className="winnerImg" src={preStaticUrl + `/img/bingo/winerBingo.png`} />
            ) : (
              <img decoding="async" loading="lazy" className="loseImg" src={preStaticUrl + `/img/bingo/your-lose_${lang}.png`} />
            )}
          </ResultM>
          <PlayerList data={players} winner={winner} isWinner={winner === account} winAmount={winAmount} loseAmount={loseAmount} />
          <Footer>
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
          </Footer>
        </Wrapper>
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default ResultModal
