import { LoadingOutlined } from '@ant-design/icons'
import {
  bingoBetaSupportedChainId,
  ChainId,
  preStaticUrl,
  RefreshState,
  TelegramUserInfoState,
  useActiveWeb3React,
  useChainModal,
  useIsTelegram,
  useRecoilValue,
  useSetRecoilState,
  walletModalOpenState
} from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useChainIdParams } from '@/hooks/useChainIdParams'
import { getChainNameText, GetGameListBoxImg } from '@/hooks/useMText'
import { IGameListBeta } from '@/hooks/useRecentGames'
import { showModalState, showTipModalState, showTipOkModalState } from '@/pages/state/state'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import sleep from '@/utils/sleep'
import { toBingoPlayHref } from '@/utils/toBingoHref'

import { usePlay } from '../../hooks/usePlay'
import CarouselList from '../carouselList/carouselList'
import css from './InnerBeta.module.stylus'
const InnerBeta = memo(
  ({ listBetaMapList, bingoHasError }: { listBetaMapList: Map<ChainId, IGameListBeta[]> | undefined; bingoHasError: boolean }) => {
    const IS_TELEGRAM = useIsTelegram()
    const setShowModalState = useSetRecoilState(showModalState)
    const navigate = useNavigate()
    const { playInTg } = usePlay()
    const chainIdParams = useChainIdParams()
    const { account, chainId } = useActiveWeb3React()
    const setDialogOpen = useSetRecoilState(walletModalOpenState)
    const { openChainModal } = useChainModal()
    const [loading, setLoading] = useState(false)
    const showTipModal = useRecoilValue(showTipModalState)
    const showTipsOkModal = useRecoilValue(showTipOkModalState)
    const userInfo = useRecoilValue(TelegramUserInfoState)
    const setRefreshState = useSetRecoilState(RefreshState)
    useEffect(() => {
      setRefreshState(pre => pre + 1)
    }, [])
    const handleOnClick = useCallback(async () => {
      if (IS_TELEGRAM) {
        try {
          setLoading(true)
          if (showTipModal || showTipsOkModal) {
            setShowModalState(true)
          } else {
            await playInTg()
          }
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
    }, [chainIdParams, account, chainId, openChainModal, showTipModal, showTipsOkModal, userInfo])
    return (
      <div className={`${css.inner} ${IS_TELEGRAM ? css.tgInner : ''}`}>
        <CarouselList bingoMapList={listBetaMapList} bingoHasError={bingoHasError} />
        <div className={css.innerItemWrap}>
          <img decoding="async" loading="lazy" src={preStaticUrl + '/img/bingo/bingo_title.png'} alt="bingo" className={css.title} />
          <h3 className={css.textMM}>{IS_TELEGRAM ? 'Play to earn airdrop points!' : `Prize: ${getChainNameText(chainId)} zBox`}</h3>
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
