import { LoadingOutlined } from '@ant-design/icons'
import {
  bingoBetaSupportedChainId,
  ChainId,
  GlobalVar,
  preStaticUrl,
  useActiveWeb3React,
  useChainModal,
  useRecoilState,
  useSetRecoilState,
  walletModalOpenState
} from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useChainIdParams } from '@/hooks/useChainIdParams'
import { getChainNameText, GetGameListBoxImg } from '@/hooks/useMText'
import { IGameListBeta } from '@/hooks/useRecentGames'
import { startGameStep } from '@/pages/state/state'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import sleep from '@/utils/sleep'
import { toBingoPlayHref } from '@/utils/toBingoHref'

import { usePlay } from '../../hooks/usePlay'
import CarouselList from '../carouselList/carouselList'
import css from './InnerBeta.module.stylus'
const InnerBeta = memo(
  ({ listBetaMapList, bingoHasError }: { listBetaMapList: Map<ChainId, IGameListBeta[]> | undefined; bingoHasError: boolean }) => {
    const navigate = useNavigate()
    const { playInTg } = usePlay()
    const chainIdParams = useChainIdParams()
    const { account, chainId } = useActiveWeb3React()
    const setDialogOpen = useSetRecoilState(walletModalOpenState)
    const { openChainModal } = useChainModal()
    const [loading, setLoading] = useState(false)
    const handleOnClick = useCallback(async () => {
      if (GlobalVar.IS_TELEGRAM) {
        try {
          setLoading(true)
          await playInTg()
        } catch (e) {
          setErrorToast(e)
        } finally {
          setLoading(false)
        }
        // 签名啥的
        return
      }
      if (!account) {
        setDialogOpen(false)
        await sleep(1)
        setDialogOpen(true)
        return
      }
      if (!bingoBetaSupportedChainId.includes(chainId)) {
        if (openChainModal) {
          openChainModal()
        }
        return
      }
      toBingoPlayHref({
        chainIdParams,
        navigate
      })
    }, [chainIdParams, account, chainId, openChainModal])
    return (
      <div className={`${css.inner} ${GlobalVar.IS_TELEGRAM ? css.tgInner : ''}`}>
        <CarouselList bingoMapList={listBetaMapList} bingoHasError={bingoHasError} />
        <div className={css.innerItemWrap}>
          <img decoding="async" loading="lazy" src={preStaticUrl + '/img/bingo/bingo_title.png'} alt="bingo" className={css.title} />
          <h3 className={css.textMM}>{window.IS_TELEGRAM ? 'Play to earn airdrop points!' : `Prize: ${getChainNameText(chainId)} zBox`}</h3>
          <div className={css.border}>
            <GetGameListBoxImg />
          </div>
          <p className={`${css.button} ${loading ? css.disable : css.buttonAnim}`} onClick={handleOnClick}>
            Play
            {loading && <LoadingOutlined />}
          </p>
        </div>
      </div>
    )
  },
  isEqual
)

export default InnerBeta
