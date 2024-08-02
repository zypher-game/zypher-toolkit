import { preStaticUrl } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { LngNs } from '@ui/src'
import React from 'react'
import styled from 'styled-components'

const Warp = styled.div`
  text-align: center;
  padding-top: 172px;
  padding-bottom: 273px;
`
const Text = styled.div`
  color: #613c17;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
`
export default function NoDataPage() {
  const { t } = useCustomTranslation([LngNs.common])
  return (
    <>
      <Warp>
        <img src={preStaticUrl + `/img/bingo/NoDataIcon.svg`} alt="" />
        <Text>{t('NO Data')}</Text>
      </Warp>
    </>
  )
}
