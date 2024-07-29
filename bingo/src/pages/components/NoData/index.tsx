import { preStaticUrl } from '@zypher-game/toolkit/ui'
import { useCustomTranslation } from '@zypher-game/toolkit/ui'
import { LngNs } from '@zypher-game/toolkit/ui'
import React from 'react'
import styled from 'styled-components'

const Warp = styled.div`
  text-align: center;
  padding-top: 172px;
  padding-bottom: 273px;
`
const Text = styled.div`
  color: #613c17;
  font-family: Poppins;
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
