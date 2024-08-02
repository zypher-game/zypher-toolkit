import { LngNs, preStaticUrl, useCustomTranslation, useRecoilState } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { Space } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'

import RulesModal from '@/components/RulesModal'
import SoundEffectSwitch from '@/components/Sound/SoundEffectSwitch'
import bingoLobby from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { gameRoomState, IBingoVersion, joinGameState } from '@/pages/state/state'
import { env } from '@/utils/config'

import GameExit from '../../components/GameExit'

const CountDownWrapper = styled.div`
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.5);
  display: block;
  width: 57px;
  height: 38px;
  color: #fff;
  text-align: center;

  font-size: 16px;
  line-height: 38px;
  @media screen and (max-width: 830px) {
    font-size: 12px;
    height: 26px;
    line-height: 26px;
  }
`
const CountDown = styled(CountDownWrapper)`
  width: 226px;
  .label {
    opacity: 0.69;
  }
`
const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`
const Box = styled.div``

const ControllerMenu: React.FC = memo(() => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const isMobile = useIsW768()
  const [resetGameRoom] = useRecoilState(gameRoomState)
  const [joinGame] = useRecoilState(joinGameState)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [rulesModalOpen, setRulesModalOpen] = useState(false)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(true)
  let intervalId: NodeJS.Timeout | null = null

  useEffect(() => {
    ;(async () => {
      if (!chainId) {
        return
      }
      const lobbyContract = await bingoLobby({ chainId, env, bingoVersion })
      const cardNums = resetGameRoom.cardNumbers.reduce(
        (prev, curr) => {
          prev[curr.row - 1].push(curr.num)
          return prev
        },
        [[], [], [], [], []] as number[][]
      )
      const txn = await lobbyContract.read.restoreGame([account, cardNums, joinGame.signedLabel])
      const [playingGameId, autoEndTime, isCardContentMatched] = txn
      const currentTimestamp = Math.floor(Date.now() / 1000)
      const difference = autoEndTime - currentTimestamp > 0 ? autoEndTime - currentTimestamp : 0
      const m = Math.floor((difference % (60 * 60)) / 60)
      setMinutes(m)
      const s = difference % 60
      setSeconds(s)
      if (m !== 0 || s !== 0) {
        setIsRunning(true)
      }
      if (intervalId) {
        clearInterval(intervalId)
      }
    })()
  }, [account, chainId])

  useEffect(() => {
    const handleInterval = () => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else if (minutes > 0) {
        setMinutes(minutes - 1)
        setSeconds(59)
      } else {
        if (intervalId) {
          clearInterval(intervalId)
        }
        setIsRunning(false)
      }
    }

    if (isRunning) {
      intervalId = setInterval(handleInterval, 1000)
    } else {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, minutes, seconds])

  return (
    <>
      <RulesModal open={rulesModalOpen} onDismiss={() => setRulesModalOpen(false)} />
      {isMobile ? (
        <FlexBetween>
          <Space align="center" size={12}>
            <Box>
              <SoundEffectSwitch />
            </Box>
            <Box>
              <img src={preStaticUrl + `/img/bingo/question.svg`} alt="" onClick={() => setRulesModalOpen(true)} />
            </Box>
          </Space>
          <Space>
            <CountDownWrapper>
              <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
            </CountDownWrapper>
            <Box>
              <GameExit />
            </Box>
          </Space>
        </FlexBetween>
      ) : (
        <div style={{ paddingTop: '18px' }}>
          <Space size={20}>
            <GameExit />
            <CountDown>
              <Space>
                <div className="label">{t('Game Countdown')}</div>
                <div className="value">
                  <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                </div>
              </Space>
            </CountDown>
            <SoundEffectSwitch />
          </Space>
        </div>
      )}
    </>
  )
})

export default ControllerMenu
