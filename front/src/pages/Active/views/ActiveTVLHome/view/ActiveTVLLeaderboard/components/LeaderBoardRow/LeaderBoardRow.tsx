import './LeaderBoardRow.styl'

import { preStaticUrl, useSetRecoilState } from '@ui/src'
import { ActivePixelCard, ActivePixelColorCard } from '@ui/src'
import React, { memo, useCallback, useMemo } from 'react'

import { IRankBoard } from '@/pages/Active/hooks/useLeaderboard'
import { changeNameDialogState } from '@/pages/Active/state/activeState'

import Avatar from '../../../../components/Avatar/Avatar'

interface IProps extends IRankBoard {
  isMy?: boolean
}
const colorArr = [
  {
    height: '72px',
    borderBottomColor: '#E1820C',
    borderTopColor: '#FFE299',
    backgroundColor: '#FEBE1E',
    iconBackgroundColor: '#1649FF'
  },
  {
    height: '72px',
    borderBottomColor: '#8DA4B4',
    borderTopColor: '#C9EDED',
    backgroundColor: '#AED3D3',
    iconBackgroundColor: '#1649FF'
  },
  {
    height: '72px',
    borderBottomColor: '#B04B39',
    borderTopColor: '#FFCDB9',
    backgroundColor: '#D88261',
    iconBackgroundColor: '#1649FF'
  },
  {
    height: '72px',
    borderBottomColor: '#1D263B',
    borderTopColor: '#1D263B',
    backgroundColor: '#1D263B',
    iconBackgroundColor: '#1649FF'
  },
  {
    height: '88px',
    borderBottomColor: '#1649FF',
    borderTopColor: '#1649FF',
    backgroundColor: '#1649FF',
    iconBackgroundColor: '#fff'
  }
]
const LeaderBoardRow = memo((props: IProps) => {
  const { rank, score, headImg, nickname, fromNickname, isMy } = props
  const setIsModalOpen = useSetRecoilState(changeNameDialogState)
  const { height, borderBottomColor, borderTopColor, backgroundColor, iconBackgroundColor } = useMemo(() => {
    if (isMy) {
      return colorArr[4]
    }
    if (rank < 4) {
      return colorArr[rank - 1]
    }
    return colorArr[3]
  }, [rank, isMy])
  const editNicknameHandle = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  return (
    <ActivePixelColorCard
      width="100%"
      height={height}
      pixel_height={4}
      borderBottomColor={borderBottomColor}
      borderTopColor={borderTopColor}
      backgroundColor={backgroundColor}
      className={`leader_board_row ${rank < 4 ? 'leader_board_row_text' : ''} ${isMy ? 'leader_board_row_my' : ''}`}
    >
      <div className="leader_board_row_fl">
        {rank < 4 ? (
          <img src={`${preStaticUrl}/img/tvl/label_0${rank}.png`} className="leader_board_row_fl_img" />
        ) : (
          <ActivePixelCard pixel_height={3} className={`leader_board_row_fl_div`} width="36px" height="36px" backgroundColor={iconBackgroundColor}>
            <p>{rank}</p>
          </ActivePixelCard>
        )}
      </div>
      <div className="leader_board_row_inner">
        <Avatar src={headImg} nickname={nickname} width="48px" />
        <div className="leader_board_row_inner_fl">
          <div className="leader_board_row_inner_fl_avatar">
            <h3>
              @{nickname}
              {isMy ? '(YOU)' : ''}
            </h3>
            {isMy ? <img src={preStaticUrl + '/img/icon/pixel_edit.svg'} className={'pixel_edit'} onClick={editNicknameHandle} /> : null}
          </div>
          {!fromNickname || fromNickname !== '' ? <p>Invited by @{fromNickname}</p> : null}
        </div>
      </div>
      <p className={`leader_board_row_fr`}>{score}</p>
    </ActivePixelColorCard>
  )
})
export default LeaderBoardRow
