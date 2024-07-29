import { DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, useCurrentLanguage } from '@zypher-game/toolkit/ui'
import { useCustomTranslation } from '@zypher-game/toolkit/ui'
import { useIsMobile } from '@zypher-game/toolkit/ui'
import { LngNs } from '@zypher-game/toolkit/ui'
import { Space } from 'antd'
import { isEqual } from 'lodash'
import React, { memo } from 'react'
import styled, { css } from 'styled-components'

import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { IPlayersProps } from '@/hooks/useGetGameInfo'

import { ButtonHover, ButtonPrimary } from '../components/Button'
import PlayerList from '../components/PlayerList'

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
  players: IPlayersProps[]
  winner: string
  open: boolean
  onCancel: () => void
  onSubmit: () => void
  winAmount: number | string
  loseAmount: number | string
}

const ResultModal: React.FC<IResultModalProps> = memo(({ players, winner, onCancel, onSubmit, open, winAmount, loseAmount }: IResultModalProps) => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const { account } = useActiveWeb3ReactForBingo()
  const lang = useCurrentLanguage()
  const isMobile = useIsMobile()
  return (
    <DialogOverlay isOpen={open}>
      <DialogContent style={{ background: 'transparent', width: '100vw', display: 'flex', justifyContent: 'center' }}>
        <Wrapper isMobile={isMobile}>
          <ResultM isMobile={isMobile}>
            {winner.toLowerCase() === `${account}`.toLowerCase() ? (
              <img className="winnerImg" src={preStaticUrl + `/img/bingo/winerBingo.png`} />
            ) : (
              <img className="loseImg" src={preStaticUrl + `/img/bingo/your-lose_${lang}.png`} />
            )}
          </ResultM>
          <PlayerList data={players} winner={winner} isWinner={winner === account} winAmount={winAmount} loseAmount={loseAmount} />
          <Footer>
            <Space size={30}>
              <ButtonHover
                width={isMobile ? '140px' : '186px'}
                height={isMobile ? '48px' : '58px'}
                size={isMobile ? '16px' : '22px'}
                onClick={onCancel}
              >
                {t('Back')}
              </ButtonHover>
              <ButtonPrimary
                width={isMobile ? '140px' : '186px'}
                height={isMobile ? '48px' : '58px'}
                size={isMobile ? '16px' : '22px'}
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
