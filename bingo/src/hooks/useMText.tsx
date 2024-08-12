import { ChainId, preStaticUrl } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'

import { ILocalPathUrl, localPathUrl } from '@/utils/localPathUrl'

import { useChainIdParamsAsChainId } from './useChainIdParams'
const ImgStyled = styled.img`
  width: 100%;
`
export const getChainNameText = (chainId: ChainId, params?: { isLowcase: boolean }): string => {
  const { isLowcase = false } = params || {}
  const localpath = localPathUrl(chainId)
  let text = 'Beta'
  if (localpath === ILocalPathUrl.COMBO) {
    text = 'Combo'
  } else if (localpath === ILocalPathUrl.MANTA) {
    text = 'Manta'
  } else if (localpath === ILocalPathUrl.MANTLE) {
    text = 'Mantle'
  } else if (localpath === ILocalPathUrl.Hypr) {
    text = 'Hypr'
  } else if (localpath === ILocalPathUrl.TaikoHeklaTestnet9) {
    text = 'TaikoHeklaTestnet'
  } else if (localpath === ILocalPathUrl.Saga) {
    text = 'Diamond Points'
  }
  return isLowcase ? text.toLowerCase() : text
}
export const GetGameListBoxImg = memo(() => {
  const [localpath, setLocalpath] = useState(ILocalPathUrl.BATE)
  const chainId = useChainIdParamsAsChainId()
  useEffect(() => {
    if (chainId) {
      setLocalpath(localPathUrl(chainId))
    }
  }, [chainId])
  if (
    window.IS_TELEGRAM ||
    (chainId &&
      (localpath === ILocalPathUrl.MANTA ||
        localpath === ILocalPathUrl.COMBO ||
        localpath === ILocalPathUrl.MANTLE ||
        localpath === ILocalPathUrl.Hypr))
  ) {
    return (
      <ImgStyled
        src={
          preStaticUrl +
          `/img/bingo/beta/box_${getChainNameText(chainId ?? ChainId.SagaMainnet, {
            isLowcase: true
          })}.png`
        }
      />
    )
  }
  return <ImgStyled src={preStaticUrl + `/img/bingo/beta/box.png`} />
}, isEqual)
