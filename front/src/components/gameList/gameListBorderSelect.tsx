import './gameListBorderSelect.styl'

import { CaretDownOutlined } from '@ant-design/icons'
import { IGameName, PixelBorderCard, PixelBorderCardButton, PixelCube2, useCustomTranslation } from '@UI/src/'
import { LngNs } from '@UI/src/'
import { ChainId, ChainName, supportedChainIds } from '@UI/src/'
import { Select } from 'antd'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { z2048SupportedChainIds } from '@/pages/Home/hooks/useRecentZ2048FromContract'
import { env } from '@/utils/config'

import css from './gameListBorderSelect.module.stylus'

const { Option } = Select
type IChainOption = {
  value: ChainId | 'All'
  label: string
}
type IGameOption = { value: IGameName; label: IGameName }

const MySelect = styled(Select)`
  &.gameListBorder_select {
    background-color: transparent;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    width: 160px;
    height: 50px;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
      font-size: 14px;
      height: 38px;
    }
    .ant-select-selection-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .gameList_select_pop_item {
        .pixel_flat_btn_bg {
          display: none;
        }
      }
    }
    &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
      padding: 0 6px;
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
    const [finalOption, setFinalOption] = useState<IChainOption[]>()
    const options: IChainOption[] = useMemo(() => {
      const list: IChainOption[] = supportedChainIds(env)
        .filter(v => v !== ChainId.Arbitrum && v !== ChainId.MantaPacificMainnet)
        .map(v => ({
          value: v,
          label: ChainName[v]
        }))
      list.unshift({ value: 'All', label: t('All') })
      return list
    }, [t])
    const z2048options: IChainOption[] = useMemo(() => {
      const list: IChainOption[] = z2048SupportedChainIds({ env }).map(v => ({
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
    const gameNameOptions: IGameOption[] = useMemo(() => {
      return Object.values(IGameName).map(v => ({ value: v, label: v }))
    }, [t])
    const changeHandle = useCallback(e => {
      setSelectValue(e)
    }, [])
    const changeGameNameHandle = useCallback(e => {
      setSelectValue('All')
      setChooseGame(e)
    }, [])

    const Dropdown = useCallback(
      (menu: any) => (
        <PixelBorderCard className="selectDropdownBox" pixel_height={4} backgroundColor="#1D263B" borderColor="#3A4254">
          {menu}
        </PixelBorderCard>
      ),
      []
    )
    const OptionComp = useCallback(
      (option?: (IChainOption | IGameOption)[]) =>
        option ? (
          option.map(v => (
            <Option key={v.value}>
              <PixelCube2
                className={`address_wrap_pop_item gameList_select_pop_item`}
                pixel_height={3}
                backgroundColor="#1D263B"
                borderColor="#1D263B"
                width="100%"
                height="36px"
              >
                <p>{v.label}</p>
              </PixelCube2>
            </Option>
          ))
        ) : (
          <></>
        ),
      []
    )
    console.log({ finalOption })
    return (
      <div className={classnames(css.borderSelect, className)}>
        <PixelBorderCardButton pixel_height={4} backgroundColor="#343C4F" borderColor="#484F60" height="40px">
          <MySelect
            className="gameListBorder_select"
            bordered={false}
            value={chooseGame}
            dropdownRender={Dropdown}
            defaultValue={chooseGame}
            onChange={changeGameNameHandle}
            suffixIcon={<CaretDownOutlined style={{ color: '#fff' }} />}
          >
            {OptionComp(gameNameOptions)}
          </MySelect>
        </PixelBorderCardButton>
        {showFilter ? (
          <PixelBorderCardButton pixel_height={4} backgroundColor="#343C4F" borderColor="#484F60" height="40px">
            <MySelect
              className="gameListBorder_select"
              bordered={false}
              dropdownRender={Dropdown}
              defaultValue={selectValue}
              value={selectValue}
              onChange={changeHandle}
              suffixIcon={<CaretDownOutlined style={{ color: '#fff' }} />}
            >
              {OptionComp(finalOption)}
            </MySelect>
          </PixelBorderCardButton>
        ) : null}
      </div>
    )
  },
  isEqual
)

export default GameListBorderSelect
