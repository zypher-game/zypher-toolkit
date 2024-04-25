import { LoadingOutlined } from '@ant-design/icons'
import { LngNs, preStaticUrl, useCustomTranslation } from '@UI/src/'
import { Input } from 'antd'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo } from 'react'
import { SetterOrUpdater } from 'recoil'

import css from './UIWidget.module.stylus'
type ITitleAndBorder = {
  label: string
  children: React.ReactNode
  bottom?: React.ReactNode
  showViewBtnClick?: any
}
export const TitleAndBorder = memo(({ label, children, bottom }: ITitleAndBorder) => {
  return (
    <div className={css.titleAndBorder}>
      <div className={css.titleAndBorderBg} />
      <div className={css.titleAndBorderInner}>
        <div className={css.title}>
          <h4>{label}</h4>
        </div>
        <div className={css.borderInner}>
          <div className={css.top}>{children}</div>
          {bottom ? <div className={css.bottom}>{bottom}</div> : null}
        </div>
      </div>
    </div>
  )
}, isEqual)
interface IActionBorder extends ITitleAndBorder {
  amountStr: string
  showViewBtn: boolean
}
export const ActionBorder = memo(({ label, amountStr, showViewBtn, children, showViewBtnClick }: IActionBorder) => {
  return (
    <div className={css.actionBorder}>
      <div className={css.fl}>
        <p className={css.grey}>{label}</p>
        <p className={css.amount}>{amountStr}</p>
        {showViewBtn ? (
          <p className={css.btn} onClick={showViewBtnClick}>
            View
          </p>
        ) : null}
      </div>
      <div className={css.fr}>{children}</div>
    </div>
  )
}, isEqual)
type IProp = { label: string; loading: boolean; disable: boolean; onClick: any; size?: 'large' | 'middle' }
export const PrimaryButton = memo(({ label, loading, disable, onClick, size }: IProp) => {
  return (
    <button onClick={onClick} className={classnames(css.primaryButton, css[size ?? 'middle'], disable ? css.disable : '')}>
      {label} {loading ? <LoadingOutlined /> : null}
    </button>
  )
}, isEqual)
export const OutlineButton = memo(({ label, loading, disable, onClick }: IProp) => {
  return (
    <button onClick={onClick} className={classnames(css.outlineButton, disable ? css.disable : '')}>
      {label}
      {loading ? <LoadingOutlined /> : null}
    </button>
  )
}, isEqual)
export const PlainButton = memo(({ label, loading, disable, onClick }: IProp) => {
  return (
    <button onClick={onClick} className={classnames(css.plainButton, disable ? css.disable : '')}>
      {label}
      {loading ? <LoadingOutlined /> : null}
    </button>
  )
}, isEqual)
type IPlainArrowButton = { label: string; show: boolean; onClick: any }

export const PlainArrowButton = memo(({ label, show, onClick }: IPlainArrowButton) => {
  return (
    <button onClick={onClick} className={classnames(css.plainButton, css.plainArrowButton)}>
      {label}
      <img src={preStaticUrl + `/img/layout/${show ? 'arrow-up' : 'arrow-down'}.svg`} />
    </button>
  )
}, isEqual)
type IDialogTab = {
  tabIndex: number
  setTabIndex: SetterOrUpdater<number>
}
export const DialogTab = memo(({ tabIndex, setTabIndex }: IDialogTab) => {
  const { t } = useCustomTranslation([LngNs.dp])
  const onClickHandle = useCallback(index => {
    setTabIndex(index)
  }, [])
  return (
    <ul className={css.dialogTab}>
      {[t('Lock'), t('Stake'), t('Unstake')].map((v: string, index: number) => (
        <li key={v} className={classnames(css.dialogTab_item, index === tabIndex ? css.on : '')} onClick={() => onClickHandle(index)}>
          {v}
          <div className={css.borderline} />
        </li>
      ))}
    </ul>
  )
}, isEqual)

type ICol = {
  flText: string
  frNode: React.ReactNode
}
export const Col = memo(({ flText, frNode }: ICol) => {
  return (
    <div className={css.col}>
      <p className={css.fl}>{flText}</p>
      {frNode}
    </div>
  )
}, isEqual)
export const DPAmountInputItem = memo(
  ({
    value,
    setValue,
    size,
    max
  }: {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    size: 'small' | 'middle'
    max: string
  }) => {
    const subHandle = useCallback(() => {
      if (parseInt(value) > 1) {
        const newValue = (parseInt(value) - 1).toString()
        setValue(newValue)
      }
    }, [value])

    const addHandle = useCallback(() => {
      if (value !== '') {
        const newValue = (parseInt(value) + 1).toString()
        if (parseInt(newValue) <= parseInt(max)) {
          setValue(newValue)
        }
      } else {
        setValue('1')
      }
    }, [value, max])

    const changeValue = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        if (/^[0-9]*$/.test(inputValue)) {
          if (parseInt(inputValue) <= parseInt(max)) {
            setValue(inputValue)
          } else {
            setValue(max)
          }
        }
      },
      [max]
    )

    const isValueDecreaseDisabled = useMemo(() => !value || parseInt(value) < 1, [value])
    const isValueIncreaseDisabled = useMemo(() => parseInt(value) >= parseInt(max), [value, max])
    const decreaseIconClass = useMemo(
      () => classnames(css.icon, css.subtraction, { [css.disable]: isValueDecreaseDisabled }),
      [isValueDecreaseDisabled]
    )
    const increaseIconClass = useMemo(() => classnames(css.icon, css.addition, { [css.disable]: isValueIncreaseDisabled }), [isValueIncreaseDisabled])

    return (
      <div className={classnames(css.numberBorder, css[size])}>
        <div className={decreaseIconClass} onClick={isValueDecreaseDisabled ? undefined : subHandle}>
          -
        </div>
        <Input onChange={changeValue} type="text" value={value} />
        <div className={increaseIconClass} onClick={isValueIncreaseDisabled ? undefined : addHandle}>
          +
        </div>
      </div>
    )
  },
  isEqual
)
