import { CaretDownOutlined } from '@ant-design/icons'
import { IGameName, useCustomTranslation } from '@UI/src/'
import { LngNs } from '@UI/src/'
import { ChainId, ChainName, supportedChainIds } from '@UI/src/'
import { Select } from 'antd'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { env } from '@/utils/config'

import { z2048SupportedChainIds } from '../../hooks/useRecentZ2048FromContract'
import css from './gameListBorderSelect.module.stylus'
const MySelect = styled(Select)`
  &.div {
    border-radius: 8px;
    background-color: transparent;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 160px;
    height: 50px;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
      font-size: 14px;
      height: 38px;
    }
    &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
      padding: 0 16px;
    }
  }
`
const GameListBorderSelect = memo(
  ({
    className,
    selectValue,
    chooseGame,
    setSelectValue,
    setChooseGame,
    showFilter
  }: {
    className?: any
    selectValue: ChainId | 'All'
    chooseGame: IGameName
    setChooseGame: React.Dispatch<React.SetStateAction<IGameName>>
    setSelectValue: React.Dispatch<React.SetStateAction<ChainId | 'All'>>
    showFilter: boolean
  }) => {
    const { t } = useCustomTranslation([LngNs.home])
    const [finalOption, setFinalOption] = useState<any>()
    const options: { value: ChainId | 'All'; label: string }[] = useMemo(() => {
      const list: { value: ChainId | 'All'; label: string }[] = supportedChainIds(env)
        .filter(v => v !== ChainId.Arbitrum && v !== ChainId.MantaPacificMainnet)
        .map(v => ({
          value: v,
          label: ChainName[v]
        }))
      list.unshift({ value: 'All', label: t('All') })
      return list
    }, [t])
    const z2048options: { value: ChainId | 'All'; label: string }[] = useMemo(() => {
      const list: { value: ChainId | 'All'; label: string }[] = z2048SupportedChainIds({ env }).map(v => ({
        value: v,
        label: ChainName[v]
      }))
      list.unshift({ value: 'All', label: t('All') })
      return list
    }, [t])
    useEffect(() => {
      if (chooseGame === IGameName.z2048) {
        setFinalOption(z2048options)
      } else {
        setFinalOption(options)
      }
    }, [chooseGame, options, z2048options])
    const gameNameOptions: { value: IGameName; label: string }[] = useMemo(() => {
      return Object.values(IGameName).map(v => ({ value: v, label: v }))
    }, [t])
    const changeHandle = useCallback(e => {
      setSelectValue(e)
    }, [])
    const changeGameNameHandle = useCallback(e => {
      setSelectValue('All')
      setChooseGame(e)
    }, [])
    return (
      <div className={classnames(css.borderSelect, className)}>
        <MySelect
          className="div"
          bordered={false}
          value={chooseGame}
          dropdownRender={menu => <div className={'selectDropdownBox'}>{menu}</div>}
          defaultValue={chooseGame}
          onChange={changeGameNameHandle}
          suffixIcon={<CaretDownOutlined style={{ color: '#6673FF' }} />}
          options={gameNameOptions}
        />
        {showFilter ? (
          <MySelect
            className="div"
            bordered={false}
            dropdownRender={menu => <div className={'selectDropdownBox'}>{menu}</div>}
            defaultValue={selectValue}
            value={selectValue}
            onChange={changeHandle}
            suffixIcon={<CaretDownOutlined style={{ color: '#6673FF' }} />}
            options={finalOption}
          />
        ) : null}
      </div>
    )
  },
  isEqual
)

export default GameListBorderSelect
