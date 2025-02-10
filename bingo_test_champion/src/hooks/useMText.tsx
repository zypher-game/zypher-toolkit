import { ChainId, getChainNameText, ILocalPathUrl, localPathUrl, preStaticUrl, useIsTelegram } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { useChainIdParamsAsChainId } from './useChainIdParams'
const ImgStyled = styled.img`
  width: 100%;
  border-radius: 7px;
`

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
    (chainId &&
      [ILocalPathUrl.MANTA, ILocalPathUrl.COMBO, ILocalPathUrl.MANTLE, ILocalPathUrl.Hypr, ILocalPathUrl.B3, ILocalPathUrl.EXP].includes(localpath))
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
