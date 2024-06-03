import { preStaticUrl } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'
import styled from 'styled-components'

import { IMonsterStatus } from '../hooks/monster.types'

const MonsterBgStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #030418;
  &.Fight,
  &.End {
    img {
      left: 30%;
      @media (max-width: 830px) {
        left: 0;
      }
    }
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: -10vw 0 100px #030418 inset;
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 1920px;
    height: 1080px;
    @media (max-width: 830px) {
      width: 100%;
      top: 0;
      left: 0;
      height: auto;
      transform: none;
    }
  }
`
type IProps = {
  monsterStatus: IMonsterStatus
}
const MonsterBg = memo(({ monsterStatus }: IProps) => {
  const isMobile = useIsW768()
  return (
    <MonsterBgStyled className={monsterStatus}>
      <img src={preStaticUrl + `/img/monster/bg${isMobile ? '_m' : ''}.jpg`} alt="" />
    </MonsterBgStyled>
  )
}, isEqual)
export default MonsterBg