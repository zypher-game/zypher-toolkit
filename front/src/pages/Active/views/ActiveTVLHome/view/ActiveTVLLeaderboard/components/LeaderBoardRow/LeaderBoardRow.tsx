import './LeaderBoardRow.styl'

import { preStaticUrl, useIsW768, useSetRecoilState } from '@ui/src'
import { ActivePixelCard, ActivePixelColorCard } from '@ui/src'
import React, { memo, useCallback, useMemo } from 'react'

import { IRankBoard } from '@/pages/Active/hooks/useLeaderboard'
import { changeNameDialogState } from '@/pages/Active/state/activeState'
import { getNicknameStr } from '@/pages/Active/utils/getNicknameStr'

import Avatar from '../../../../components/Avatar/Avatar'

interface IProps extends IRankBoard {
  isMy?: boolean
}
const colorArr = [
  {
    borderBottomColor: '#E1820C',
    borderTopColor: '#FFE299',
    backgroundColor: '#FEBE1E',
    iconBackgroundColor: '#1649FF'
  },
  {
    borderBottomColor: '#8DA4B4',
    borderTopColor: '#C9EDED',
    backgroundColor: '#AED3D3',
    iconBackgroundColor: '#1649FF'
  },
  {
    borderBottomColor: '#B04B39',
    borderTopColor: '#FFCDB9',
    backgroundColor: '#D88261',
    iconBackgroundColor: '#1649FF'
  },
  {
    borderBottomColor: '#1D263B',
    borderTopColor: '#1D263B',
    backgroundColor: '#1D263B',
    iconBackgroundColor: '#1649FF'
  },
  {
    borderBottomColor: '#1649FF',
    borderTopColor: '#1649FF',
    backgroundColor: '#1649FF',
    iconBackgroundColor: '#fff'
  }
]
const LeaderBoardRow = memo((props: IProps) => {
  const { rank, scoreStr, headImg, nickname, fromNickname, isMy } = props
  const setIsModalOpen = useSetRecoilState(changeNameDialogState)
  const isW768 = useIsW768()
  const { height, borderBottomColor, borderTopColor, backgroundColor, iconBackgroundColor } = useMemo(() => {
    if (isMy) {
      return {
        height: isW768 ? '68px' : '88px',
        ...colorArr[4]
      }
    }
    if (rank < 4) {
      return {
        height: isW768 ? '60px' : '72px',
        ...colorArr[rank - 1]
      }
    }
    return {
      height: isW768 ? '60px' : '72px',
      ...colorArr[3]
    }
  }, [rank, isMy, isW768])
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
          <ActivePixelCard
            pixel_height={3}
            className={`leader_board_row_fl_div`}
            width={isW768 ? '24px' : '36px'}
            height={isW768 ? '24px' : '36px'}
            backgroundColor={iconBackgroundColor}
          >
            <p>{rank}</p>
          </ActivePixelCard>
        )}
      </div>
      <div className="leader_board_row_inner">
        <Avatar src={headImg} nickname={getNicknameStr(nickname)} width={isW768 ? '32px' : '48px'} />
        <div className="leader_board_row_inner_fl">
          <div className="leader_board_row_inner_fl_avatar">
            <h3>
              {getNicknameStr(nickname)}
              {isMy ? '(YOU)' : ''}
            </h3>
            {isMy ? <img src={preStaticUrl + '/img/icon/pixel_edit.svg'} className={'pixel_edit'} onClick={editNicknameHandle} /> : null}
          </div>
          {!fromNickname || fromNickname !== '' ? <p>Invited by {getNicknameStr(fromNickname)}</p> : null}
        </div>
      </div>
      <p className={`leader_board_row_fr`}>{scoreStr}</p>
    </ActivePixelColorCard>
  )
})
export default LeaderBoardRow
