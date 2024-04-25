import { ChainId, ChainImage, Currency, CurrencyLogo } from '@UI/src/'
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'

import { defaultActiveChainId, IToken } from '@/pages/Active/constants/activeConstants'

import css from './TokenWithChain.module.styl'
const Wrap = styled.div<{ width?: number }>`
  width: ${({ width }) => width ?? 22}px;
  height: ${({ width }) => width ?? 22}px;
`
const TokenWithChain = memo(({ token, chainId, width }: { token: IToken; chainId: ChainId; width?: number }) => {
  const { cLogo, cChainId } = useMemo((): {
    cLogo: string
    cChainId: ChainId
  } => {
    const _c = (chainId ?? defaultActiveChainId) as unknown as ChainId
    return {
      cChainId: _c,
      cLogo: token.logoPath ? token.logoPath : CurrencyLogo[_c]
    }
  }, [JSON.stringify(token), chainId])
  return (
    <Wrap className={css.token_with_chain} width={width}>
      <img className={css.token} src={cLogo} alt={token.symbol} />
      <img className={css.chain_id} src={ChainImage[cChainId]} alt={Currency[cChainId]} />
    </Wrap>
  )
})
export default TokenWithChain
