import { ChainId, CopiedIcon, CopyIcon, getShortenAddress, Icon, LRTSymbol, PixelTableBorder, TVLChainId, tvlTokenAddress, tvlTokens } from '@ui/src'
import { ProfileDetailsAction } from '@ui/src/rainbowkit/src/components/ProfileDetails/ProfileDetailsAction'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo, useState } from 'react'

import copy from '@/utils/copy'

import { lrtPath } from '../../config/config'
import Title from '../comp/Title'
import css from './LRT.module.styl'
const LRT = memo(() => {
  return (
    <div className={css.lrt}>
      <div className={css.inner}>
        <Title label="lRt Partners" />
        <div className={css.in}>
          <div className={css.fl}>
            <img src={lrtPath + '/line_top.png'} />
            <div className={css.list}>
              {['lido', 'renz0', 'stakestone', 'ether_fi'].map(v => (
                <div key={v}>
                  <img src={lrtPath + `/${v}.png`} />
                </div>
              ))}
            </div>
            <img src={lrtPath + '/line_bottom.png'} />
            <p className={`${css.text} ${css.bottom}`}>
              We have formed strategic partnerships with RENZO, Eth.Fi and other LRT providers, offering enhanced staking opportunities for token
              holders. This makes LRT a more versatile asset, thanks to Zypher’s groundbreaking approach to gaming.
            </p>
            <p className={css.text}>
              {
                "As an official partner in Linea's Surge event, users can stake their LRT tokens ($ezETH) using our staking protocol to earn extra Linea LXP rewards and unlock additional benefits."
              }
            </p>
          </div>
          <PixelTableBorder
            className={css.fr}
            headerBackgroundColor="#293457"
            backgroundColor="#1D263B"
            pixel_height={7}
            header_children={<p className={css.header}>{"Tokens' Address on Linea"}</p>}
            body_children={
              <>
                {LRTSymbol.map(symbol => (
                  <Item key={symbol} symbol={symbol} chainId={ChainId.LineaMainnet} />
                ))}
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}, isEqual)
const Item = memo(({ symbol, chainId }: { symbol: string; chainId: ChainId }) => {
  const token = useMemo(() => {
    return tvlTokens[chainId][symbol]
  }, [symbol, chainId])

  const copyAddressHandle = useCallback(() => {
    if (token.address) {
      copy(token.address)
    }
  }, [token.address])

  return (
    <div className={css.item}>
      <div className={css.fl}>
        <img src={token.logoPath} />
        <p className={css.symbol}>{token.symbol}</p>
      </div>
      <div className={css.fr}>
        <p> {getShortenAddress(token.address)}</p>
        <div className={css.icon} onClick={copyAddressHandle}>
          <Icon name="pixel_copy" />
        </div>
      </div>
    </div>
  )
}, isEqual)
export default LRT
