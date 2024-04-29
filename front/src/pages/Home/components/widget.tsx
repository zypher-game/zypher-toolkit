import { useCustomTranslation } from '@UI/src/'
import { LngNs } from '@UI/src/'
import { preStaticUrl } from '@UI/src/'
import classnames from 'classnames'
import React, { FC, memo } from 'react'

import css from './widget.module.stylus'
type ITitleProps = {
  label: string
  label_icon: string
}
type IHomeListItemProps = {
  className?: string
  children: React.ReactNode
}
export const HomeTitle: FC<ITitleProps> = memo(({ label, label_icon }: ITitleProps) => {
  const { t } = useCustomTranslation([LngNs.home])
  return (
    <div className={css.title}>
      <img src={preStaticUrl + '/img/home/' + label_icon} loading="lazy" />
      <p>{t(`${label}`)}</p>
    </div>
  )
})
export const HomeListItem: FC<IHomeListItemProps> = memo(({ className, children }: IHomeListItemProps) => {
  return <div className={classnames(css.list, className)}>{children}</div>
})