import { Col } from 'antd'
import React from 'react'

import BingoController from '@/components/BingoController'
import { IPlayer } from '@/hooks/useGetGameInfoV1.types'

import css from '../index.module.stylus'
import BingoButton from './BingoButton'
import AvatarGroup from './MAvatarGroup'

interface IGameBoardProps {
  isMobile: boolean
  cardNumbers: any[]
  isControllerEnabled: boolean
  round: number
  selectedNumbers: number[]
  onMarkNumber: (num: number) => Promise<void>
  matchLines: number[][]
  pending: boolean
  onBingo: () => Promise<void>
  players: IPlayer[]
  player: string
}

const GameBoard: React.FC<IGameBoardProps> = ({
  isMobile,
  cardNumbers,
  isControllerEnabled,
  round,
  selectedNumbers,
  onMarkNumber,
  matchLines,
  pending,
  onBingo,
  players,
  player
}) => (
  <Col span={isMobile ? 24 : 10}>
    <div className={`${css.gameCheckerBoard} ${isMobile ? css.mobile : ''}`}>
      <div className={`${css.gamePadding} ${isMobile ? css.mobile : ''}`}>
        <div className={css.gameBackground}>
          <BingoController
            cardNumbers={cardNumbers}
            isMyTurn={isControllerEnabled}
            round={round}
            selectedNumbers={selectedNumbers}
            onClick={onMarkNumber}
            matchLines={matchLines}
          />
          <div className={css.bingoControllerButtonWrapper}>
            {isMobile ? (
              <>
                <AvatarGroup players={players} targetUser={player} border />
                {matchLines.length < 2 ? (
                  <div className={css.matchLinesWrapper}>{matchLines.length} / 2</div>
                ) : (
                  <BingoButton isMobile={isMobile} pending={pending} disabled={matchLines.length < 2 || pending} onClick={onBingo} />
                )}
              </>
            ) : (
              <>
                <div className={css.matchLinesWrapper}>{matchLines.length} / 2</div>
                <BingoButton isMobile={isMobile} pending={pending} disabled={matchLines.length < 2 || pending} onClick={onBingo} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </Col>
)

export default GameBoard
