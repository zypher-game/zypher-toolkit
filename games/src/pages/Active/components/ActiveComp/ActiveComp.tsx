import { motion } from '@ui/src'
import React, { memo } from 'react'

import MeteorShower from '@/components/Meteor/Meteor'

import TVLFooter from '../TVLFooter/TVLFooter'
import css from './ActiveComp.module.styl'
interface IProps {
  children: React.ReactNode
}
const ActiveComp = memo(({ children }: IProps) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={css.ActiveComp}
    >
      <div className={css.active_comp_inner}>{children}</div>
      <TVLFooter />
      <MeteorShower />
    </motion.div>
  )
})
export default ActiveComp
