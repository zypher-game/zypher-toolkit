import { ChainId, preStaticUrl, useIsTelegram } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { ILocalPathUrl, localPathUrl } from '@/utils/localPathUrl'

import { useChainIdParamsAsChainId } from './useChainIdParams'
const ImgStyled = styled.img`
  width: 100%;
  border-radius: 7px;
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
  } else if (localpath === ILocalPathUrl.B3) {
    text = 'B3'
  }
  return isLowcase ? text.toLowerCase() : text
}
export const GetGameListBoxImg = memo(({ chainIdParams }: { chainIdParams?: ChainId }) => {
  const [localpath, setLocalpath] = useState(ILocalPathUrl.BATE)
  const chainIdHook = useChainIdParamsAsChainId()
  const chainId = useMemo(() => {
    return chainIdParams ?? chainIdHook
  }, [chainIdHook, chainIdParams])
  const IS_TELEGRAM = useIsTelegram()
  useEffect(() => {
    if (chainId) {
      setLocalpath(localPathUrl(chainId))
    }
  }, [chainId])
  if (
    IS_TELEGRAM ||
    (chainId && [ILocalPathUrl.MANTA, ILocalPathUrl.COMBO, ILocalPathUrl.MANTLE, ILocalPathUrl.Hypr, ILocalPathUrl.B3].includes(localpath))
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
