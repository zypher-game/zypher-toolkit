import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import Skeleton from '@/components/Skeleton/Skeleton'

import css from './NoDataListLoading.module.stylus'

const NoDataListLoading = memo(() => {
  return (
    <ul>
      <li>
        <Skeleton className={classnames(css.headerSke, css.headerSke1)} />
        <Skeleton className={classnames(css.headerSke, css.headerSke2)} />
        <Skeleton className={classnames(css.headerSke, css.headerSke3)} />
        <Skeleton className={classnames(css.headerSke, css.headerSke4)} />
        <Skeleton className={classnames(css.headerSke, css.headerSke5)} />
        <Skeleton className={classnames(css.headerSke, css.headerSke6)} />
      </li>
    </ul>
  )
}, isEqual)
export default NoDataListLoading
