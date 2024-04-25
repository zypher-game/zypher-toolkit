import { preStaticUrl, SvgComponent } from '@UI/src/'
import React, { memo } from 'react'

import classnames from '@/utils/classnames'

import css from './LoadingButton.module.styl'
const LoadingButton = memo(({ className, isLoading }: { className?: string; isLoading?: boolean }) => {
  if (isLoading) {
    return (
      <SvgComponent className={classnames(className ?? '', 'animation_rotate', css.loading)} src={preStaticUrl + '/img/icon/pixel_loading.svg'} />
    )
  }
  return <></>
})
export default LoadingButton
