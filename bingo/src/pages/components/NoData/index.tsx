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
const Text = styled.p`
  font-size: 14px;
  font-style: normal;
  line-height: 30px;
  color: #613c17;
  font-family: Lemon;
  font-weight: 400;
`
export default function NoDataPage() {
  const { t } = useCustomTranslation([LngNs.common])
  return (
    <>
      <Warp>
        <img decoding="async" loading="lazy" src={preStaticUrl + `/img/bingo/NoDataIcon.svg`} alt="" />
        <Text>{t('NO Data')}</Text>
      </Warp>
    </>
  )
}
