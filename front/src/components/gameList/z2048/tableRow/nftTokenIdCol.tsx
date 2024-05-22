import { ChainId, ChainImage } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'
import styled from 'styled-components'
const NftTokenIdColStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  p {
    color: #1649ff;
    white-space: nowrap;
    @media screen and (max-width: 768px) {
      font-size: 13px;
    }
  }
  img {
    width: 30px;
    border: 1px solid #4d4a4a;
    border-radius: 50%;
    margin-left: 8px;
    @media screen and (max-width: 768px) {
      margin-left: 4px;
      width: 24px;
    }
  }
`
const NftTokenIdColItem = memo(({ chainId, tokenId, showFilter }: { chainId: ChainId; tokenId: string; showFilter: boolean }) => {
  return (
    <NftTokenIdColStyled>
      <p>Z2048 #{tokenId}</p>
      {showFilter ? <img src={ChainImage[chainId]} /> : null}
    </NftTokenIdColStyled>
  )
}, isEqual)

const NftTokenIdCol = memo(
  ({ tokenIdLink, chainId, tokenId, showFilter }: { tokenIdLink: string; chainId: ChainId; tokenId: string; showFilter: boolean }) => {
    return tokenIdLink.startsWith('http') ? (
      <a href={tokenIdLink} target="_blank" rel="noreferrer">
        <NftTokenIdColItem chainId={chainId} tokenId={tokenId} showFilter={showFilter} />
      </a>
    ) : (
      <NftTokenIdColItem chainId={chainId} tokenId={tokenId} showFilter={showFilter} />
    )
  },
  isEqual
)

export default NftTokenIdCol
