import { LngNs, preStaticUrl, useCustomTranslation } from '@UI/src/'
import { Spin } from 'antd'
import { isEqual } from 'lodash'
import React, { memo } from 'react'
import styled from 'styled-components'

import css from './NoData.module.stylus'
import NoDataListLoading from './NoDataListLoading/NoDataListLoading'

const Warp = styled.div`
  text-align: center;
  padding-top: 100px;
  padding-bottom: 100px;
`
const Text = styled.p`
  color: #b1b5be;
  font-size: 12px;
  margin-top: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 214.286% */
`
export const NotDataWithLoading = memo(
  ({
    hasError,
    loading,
    showNoDataListLoading,
    errorCss,
    loadMoreCss
  }: {
    hasError?: boolean
    showNoDataListLoading?: boolean
    loading?: boolean
    errorCss?: string
    loadMoreCss?: string
  }) => {
    if (hasError) {
      return (
        <div className={errorCss}>
          <p>Error</p>
        </div>
      )
    }
    if (loading) {
      if (showNoDataListLoading) {
        return <NoDataListLoading />
      }
      return (
        <div className={loadMoreCss ?? css.loadMore}>
          <Spin size="large" tip="Loading..." />
        </div>
      )
    }
    return <NoDataPage />
  },
  isEqual
)

const NoDataPage = memo(({ style }: { style?: any }) => {
  const { t } = useCustomTranslation([LngNs.common])
  return (
    <>
      <Warp style={style}>
        <img src={preStaticUrl + `/img/icon/pixel_no_data_white.svg`} alt="" />
        <Text>{t('NO Data')}</Text>
      </Warp>
    </>
  )
})
export default NoDataPage
