import { preStaticUrl } from '@ui/src'
import { Dropdown, Menu } from 'antd'
import classnames from 'classnames'
import React, { useEffect, useState } from 'react'

import Icon from '@/assets/iconsLocal'
import useToken, { IToken } from '@/hooks/useToken'

import style from './selectToken.module.stylus'

interface IProps {
  className?: string
  onSelect(token: IToken): void
}

export type ISelectToken = IToken

export default (props: IProps): React.ReactElement | null => {
  const [symbol, setSymbol] = useState('')
  const { tokens } = useToken()
  const onSelect = (item: IToken): void => {
    props.onSelect(item)
    setSymbol(item.symbol)
  }
  const menu = (
    <Menu>
      {tokens.map(item => {
        return (
          <Menu.Item key={item.address} onClick={() => onSelect(item)}>
            {/*  <img decoding="async" loading="lazy" src={`/img/${item.symbol.toLowerCase()}.svg`} alt={item.symbol} /> */}
            {item.symbol}
          </Menu.Item>
        )
      })}
    </Menu>
  )

  useEffect(() => {
    if (tokens.length) {
      setSymbol(tokens[0].symbol)
    }
  }, [tokens])

  return symbol ? (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className={classnames(style.symbol, props.className)}>
        <img decoding="async" loading="lazy" src={preStaticUrl + `/img/${symbol.toLowerCase()}.svg`} alt={symbol} />
        <div>{symbol}</div>
        <Icon name="down" />
      </div>
    </Dropdown>
  ) : null
}
