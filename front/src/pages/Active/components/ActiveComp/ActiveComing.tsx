import React, { memo } from 'react'

import MeteorShower from '@/components/Meteor/Meteor'

import { useActiveRouter } from '../../hooks/useActiveRouter'
import { useInit } from '../../hooks/useInit'
import TVLFooter from '../TVLFooter/TVLFooter'
import css from './ActiveComp.module.styl'
interface IProps {
  children: React.ReactNode
}
const ActiveComing = memo(({ children }: IProps) => {
  return (
    <div className={css.ActiveComp}>
      <div className={css.active_comp_inner}>{children}</div>
      <TVLFooter />
      <MeteorShower />
    </div>
  )
})
export default ActiveComing
