import React, { memo } from 'react'

import MeteorShower from '@/components/Meteor/Meteor'

import { useActiveRouter } from '../../hooks/useActiveRouter'
import { useInit } from '../../hooks/useInit'
import TVLFooter from '../TVLFooter/TVLFooter'
import css from './ActiveComp.module.styl'
interface IProps {
  children: React.ReactNode
}
const ActiveComp = memo(({ children }: IProps) => {
  useActiveRouter()
  useInit()
  return (
    <div className={css.ActiveComp}>
      <div className={css.active_comp_inner}>{children}</div>
      <TVLFooter />
      <MeteorShower />
    </div>
  )
})
export default ActiveComp
