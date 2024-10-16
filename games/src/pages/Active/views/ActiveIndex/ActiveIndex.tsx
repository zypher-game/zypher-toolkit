import { isEqual } from 'lodash'
import React, { memo, useEffect } from 'react'

import useScrollPosition from '@/hooks/useScrollPosition'

import TVLFooter from '../../components/TVLFooter/TVLFooter'
import css from './ActiveIndex.module.styl'
import Banner from './components/Banner/Banner'
import Get from './components/Get/Get'
import Legal from './components/Legal/Legal'
import LRT from './components/LRT/LRT'
import Partners from './components/Partners/Partners'
import Start from './components/Start/Start'
import Timeline from './components/Timeline/Timeline'
import Why from './components/Why/Why'
import X6 from './components/X6/X6'
const ActiveIndex = memo(() => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }, [])
  return (
    <div className={css.main}>
      <Banner />
      <Start />
      <X6 />
      <LRT />
      <Get />
      {/* <FAQ />  */}
      <Partners />
      <Timeline />
      <Why />
      <Legal />
      <TVLFooter />
    </div>
  )
}, isEqual)
export default ActiveIndex
